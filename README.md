
# How to Deploy

### A. Root Deployment (e.g., `https://res.sng.al/`)
* **`translations.js`**: `rootScope.DIR_SUBFOLDER = "";`
* **`htaccess`**:
  ```apache
  HeaderName /header.html
  ReadmeName /footer.html
  ```
* **`header.html` & `footer.html`**: No edits required.

### B. Subfolder Deployment (e.g., `https://example.com/downloads/`)
* **`translations.js`**: Set `rootScope.DIR_SUBFOLDER = "/downloads";`
* **`htaccess`**:
  ```apache
  HeaderName /downloads/header.html
  ReadmeName /downloads/footer.html
  ```
* **`header.html` & `footer.html`**: No edits required.
