# Single-Edit-Point Architecture & Subfolder Deployment Guide

This guide documents the centralized architecture where **`translations.js` is the single source of truth for all configuration and text**, with zero edits needed in `header.html` or `footer.html`.

---

## 1. Why `webm` Failed While `zip` Appeared to Work

When testing on `https://kaddugyalla.com/ojo/`, navigating to `/ojo/webm/` lost button text and dropdown items, while `/ojo/zip/` appeared normal.

### The Underlying Causes:
1. **Nginx Reverse Proxy Bypasses Apache for `.js`:**  
   The server runs Nginx in front of Apache (`server: nginx`). Nginx directly handles static files (`.js`, `.css`, `.svg`, etc.) from disk. When `/ojo/webm/` requested `translations.js`, the browser resolved it to `/ojo/webm/translations.js`. Nginx looked for that file on disk, didn't find it, and returned **HTTP 404** before Apache's `.htaccess` rewrite rules could ever run.
2. **Why `/ojo/zip/` Appeared to Work:**  
   The `/ojo/zip/` directory was still serving the **cached older version** of `footer.html`. That older version contained a hardcoded `defaultDict` fallback in English. Even though `translations.js` 404'd in `zip` as well, the hardcoded fallback silently masked the failure. In `/ojo/webm/`, the new `footer.html` (without duplicate dictionaries) was served, revealing that `translations.js` had never loaded.

---

## 2. The Solution: Dynamic Upward Path Resolution

To guarantee that `translations.js` loads regardless of directory depth or reverse proxies (Nginx/cPanel/Plesk):
1. **Upward Path Walking:** `header.html` dynamically tries candidates starting from the current directory and walking up (`translations.js`, `../translations.js`, `../../translations.js`, `/translations.js`).
2. **Auto-Detected Base Path:** When `translations.js` is successfully loaded, `header.html` extracts the base folder from its URL and sets `window.DIR_AUTO_BASE`.
3. **Safety Fallback:** `footer.html` includes a safety dictionary so that even before `translations.js` finishes loading, buttons and text are never blank. When `translations.js` arrives, `dir-translations-ready` fires and updates the language dropdown and UI immediately.

---

## 3. The Single-Edit-Point Workflow

All configuration and text are isolated to **`translations.js`** (and when deploying to a subfolder, **`htaccess`**).

```
┌────────────────────────────────────────────────────────┐
│                   translations.js                      │
│       ★ THE ONLY FILE EDITED FOR CONFIG & TEXT ★       │
│  - rootScope.DIR_SUBFOLDER = "" (or "/ojo")            │
│  - rootScope.DIR_TRANSLATIONS (en, fr, etc.)           │
│  - getDirectoryLanguage(), getDirectoryBase()          │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
    ┌──────────────────┐            ┌──────────────────┐
    │   header.html    │            │   footer.html    │
    │  (0 edits needed)│            │  (0 edits needed)│
    │  - Auto-resolves │            │  - Reads dict &  │
    │    path & base   │            │    base from JS  │
    │                  │            │  - Renders UI    │
    └──────────────────┘            └──────────────────┘
```

---

## 4. How to Deploy

### A. Root Deployment (e.g., `https://res.sng.al/`)
* **`translations.js`**: `rootScope.DIR_SUBFOLDER = "";`
* **`htaccess`**:
  ```apache
  HeaderName /header.html
  ReadmeName /footer.html
  ```
* **`header.html` & `footer.html`**: No edits required.

### B. Subfolder Deployment (e.g., `https://kaddugyalla.com/ojo/`)
* **`translations.js`**: Set `rootScope.DIR_SUBFOLDER = "/ojo";`
* **`htaccess`**:
  ```apache
  HeaderName /ojo/header.html
  ReadmeName /ojo/footer.html
  ```
* **`header.html` & `footer.html`**: No edits required.
