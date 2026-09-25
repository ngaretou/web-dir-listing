# Architecture Evaluation: Resources Directory Listing (res.sng.al)

**Target Site:** http://res.sng.al/  
**Evaluation Date:** 2026-09-25  

---

## 1. Executive Summary

**Verdict: Better to restart the architecture using Apache Native Theming (`HeaderName` / `ReadmeName`), while salvaging the visual styling from `list.html`.**

The current implementation in `list.html` and `htaccess` attempts a **client-side fetch loop** (loading a web page that fetches its own directory listing via `fetch(pathname + '?autoindex')`). This approach suffers from fundamental architectural flaws in how Apache `mod_dir` and `mod_rewrite` interact, alongside several JavaScript parsing bugs.

Rather than fighting Apache's request pipeline with rewrite hacks that break subdirectories, switching to **Native Apache Autoindex Theming** solves all routing, fetching, and subdirectory problems natively while retaining the modern UI styling (dark mode, search, card view, file icons).

---

## 2. Why the Current Implementation Does Not Work

### Issue 1: The Catch-22 with Apache `DirectoryIndex` and `?autoindex`
In `htaccess`:
```apache
DirectoryIndex index.html
...
RewriteCond %{QUERY_STRING} autoindex
RewriteRule ^index\.html$ - [L]

RewriteCond %{QUERY_STRING} autoindex
RewriteRule ^$ - [L]
```
- In Apache, `DirectoryIndex` is handled by `mod_dir`. If `index.html` exists in the directory, `mod_dir` automatically serves `index.html`.
- Setting `RewriteRule ^$ - [L]` simply tells `mod_rewrite` not to alter the URI; it does **not** stop `mod_dir` from resolving `/` to `index.html`.
- If named `index.html`, fetching `/?autoindex` still serves `index.html` (the page fetches itself).
- Because of this conflict, the file was renamed to `list.html`. But visiting `http://res.sng.al/list.html` means `window.location.pathname` is `/list.html`. The fetch request becomes `fetch('/list.html?autoindex')`. Because `list.html` is a physical file, Apache serves `list.html` instead of a directory listing.

### Issue 2: DOM Parsing Bugs in `list.html`
Even when Apache returns a raw directory listing (`Index of /`), `list.html`’s DOM parser fails in multiple ways:
1. **Header Links as Files:** Apache generates sorting links in the table header:
   `<a href="?C=N;O=D">Name</a>`, `Last modified`, `Size`, `Description`.
   The current filter:
   ```javascript
   .filter(a => !["Parent Directory", "/"].includes(a.textContent.trim()))
   ```
   does not filter out column headers. "Name", "Size", and "Description" show up as downloadable files.
2. **Subdirectories Broken:** Subdirectories like `jay/`, `muc/`, and `sbs/` have `<a href="..." download>` attached, causing browsers to try downloading directory URLs instead of navigating into them.
3. **Internal Files Exposed:** Files like `htaccess`, `list.html`, and `tinyindex.html` appear in the download list.
4. **Metadata Discarded:** Apache provides file sizes (`1.2M`, `4.0M`) and modification timestamps (`2021-03-30 09:21`). The current script discards this data and hardcodes the text `"Download"` into the size column.

### Issue 3: Subdirectories (`/jay/`, `/muc/`, `/sbs/`) Do Not Inherit the UI
- In a multi-folder repository like `res.sng.al` (which has subfolders like `/jay/` with 25+ `.webm` files), `list.html` only exists at the root.
- Navigating to `/jay/` drops the user back to the unstyled raw Apache directory listing.

---

## 3. Comparison of Architectural Approaches

| Feature / Criteria | Current Approach (SPA / Fetch autoindex) | Apache Native Theming (`HeaderName`/`ReadmeName`) |
| :--- | :--- | :--- |
| **Subdirectory Support** | ❌ Fails (requires duplicating files or building a router) |  Automatic (applies recursively to `/jay/`, `/muc/`, etc.) |
| **Apache Compatibility** | ❌ Fragile (`mod_dir` conflicts with `mod_rewrite`) |  Native Apache feature (`mod_autoindex`) |
| **Performance** | Slower (2 round trips: load HTML -> fetch listing) | Instant (listing rendered in first response) |
| **SEO & Direct URLs** | ⚠️ Hash/query routing issues |  Clean URLs for every folder and file |
| **Search & Dark Mode** | Supported | Supported (enhanced via client JS) |
| **Maintenance** | High (custom scraper breaks if Apache format changes) | Low (Apache handles file data; JS formats UI) |

---

## 4. Recommended Solution: Native Apache Theming with UI Salvage

Rather than throwing away the design effort:
1. **Keep the aesthetic**: Retain the dark mode palette, card styling, search input, and icon mappings from `list.html`.
2. **Restructure files**:
   - `.htaccess`: Configure `IndexOptions`, `HeaderName /header.html`, `ReadmeName /footer.html`, `IndexIgnore`.
   - `header.html`: Open HTML, CSS styling, top navigation/header, theme toggle, search bar.
   - `footer.html`: Client-side enhancement script (turns Apache's HTML table into modern cards, powers instant search and theme toggle) and closing HTML tags.
3. **Remove redundant files**: Delete `tinyindex.html` and `list.html`.
