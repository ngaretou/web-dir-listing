
# Modern Web Directory Listing for Apache 📂✨

Welcome! If you've ever hosted public downloads, datasets, or software releases directly from an Apache web server, you know how indispensable Apache's built-in directory indexing (`mod_autoindex`) can be. It is rock-solid, lightning-fast, and doesn't require a database or heavy server-side framework.

However, out of the box, Apache's default directory listings look like they were frozen in 1995: plain unstyled tables, poor mobile ergonomics, no search, no dark mode, and zero localization.

This project transforms standard Apache directory listings into a **sleek, modern, and accessible file browser** using pure client-side HTML, CSS, and Vanilla JavaScript—without altering your server-side files.

## 👀 Examples in use: 

http://res.sng.al

http://kaddugyalla.com/ojo


---

## 💡 The Problem It Solves

- **Dated User Experience:** Raw Apache auto-indexes present users with dense HTML tables that are cumbersome to navigate, especially on mobile devices.
- **No Search or Filtering:** Finding a specific release or document in a crowded directory usually forces visitors to use `Ctrl+F`.
- **Heavyweight Alternatives:** Other directory tools often require full PHP stacks, Node.js, Python runtimes, or databases that add complexity and maintenance overhead.
- **Missing Modern Essentials:** System-aware Dark Mode, localized interfaces, clean SVG file icons, and dynamic breadcrumbs are missing by default.

This project provides a **zero-dependency, drop-in replacement** that upgrades your Apache file listings into a polished, delightful web experience.

---

## 🚀 What It Does

- **⚡ Real-Time Live Search:** Instantly filter files and folders by title or description as you type.
- **🌓 Dark & Light Mode:** Seamless toggle between themes with persistent user preference via `localStorage`.
- **🌍 Multi-Language Support (i18n):** Includes English and French out of the box, an animated language selector, and an easy way to add new locales in `translations.js`.
- **📱 Fully Responsive:** Mobile-first layout with clean cards and typography that look great on desktop, tablet, and mobile.
- **🧭 Dynamic Breadcrumb Navigation:** Generates intuitive breadcrumbs whether hosted at root or inside subfolders.
- **🎨 Crisp SVG File Icons:** Recognizes common formats (PDF, audio, video, images, archives, data, folders) with clean vector icons.
- **📝 Apache `AddDescription` Support:** Seamlessly displays descriptive metadata configured in your `.htaccess`.
- **📦 Zero Build Steps:** 100% Vanilla JS, HTML, and CSS. No bundlers, no Node.js, no external CDNs required.

---

## 📁 Repository Structure

- **`htaccess`**: Apache rules (`FancyIndexing`, headers/footers, HTTPS redirect, file exclusions).
- **`header.html`**: Page styling, responsive container, breadcrumb bar, and search header.
- **`footer.html`**: Client-side parser turning Apache tables into modern cards, search filtering, and theme engine.
- **`translations.js`**: i18n dictionaries and directory base path configuration.
- **`favicon.svg`**: Lightweight vector folder icon.

---

## 🛠️ How to Deploy

Deploying takes just a couple of minutes. Choose the setup that matches your server environment:

### A. Root Deployment (e.g., `https://res.sng.al/`)

1. **`translations.js`**:
   Set `DIR_SUBFOLDER` to an empty string:
   ```javascript
   rootScope.DIR_SUBFOLDER = "";
   ```

2. **`htaccess`** (or your `.htaccess` file):
   Point headers and footers to the root paths:
   ```apache
   HeaderName /header.html
   ReadmeName /footer.html
   ```

3. **`header.html` & `footer.html`**: No edits required.

---

### B. Subfolder Deployment (e.g., `https://kaddugyalla.com/ojo`)

1. **`translations.js`**:
   Set `DIR_SUBFOLDER` to your subfolder path (leading slash, no trailing slash):
   ```javascript
   rootScope.DIR_SUBFOLDER = "/downloads";
   ```

2. **`htaccess`** (or your `.htaccess` file):
   Prefix directives with your subfolder path:
   ```apache
   HeaderName /downloads/header.html
   ReadmeName /downloads/footer.html
   ```

3. **`header.html` & `footer.html`**: No edits required.

4. ***`htaccess` : rename to `.htaccess`. If you already have an .htaccess file, paste this htaccess file's contents below your current file's contents, and remove duplicate sections. 

---

## 🎨 Tips & Customization

- **Add Descriptions:** Use Apache's native `AddDescription` directive in `.htaccess` to add metadata that shows up in search:
  ```apache
  AddDescription "Wolof Language Audio Collection" audio
  AddDescription "Annual Report 2026 (PDF)" report-2026.pdf
  ```
- **Add a Language:** Add a new key (e.g., `es`, `de`) to `DIR_TRANSLATIONS` inside `translations.js`—the dropdown automatically populates it!

---

## 🤖 Built With Gemini 3.8 Flash

This project was built with the assistance of **Gemini 3.8 Flash**, combining modern frontend patterns with lightweight, reliable Apache server conventions.

