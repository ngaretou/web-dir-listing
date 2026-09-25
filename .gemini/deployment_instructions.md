# Deployment Instructions for res.sng.al Directory Theme

## Summary of Changes Made
1. **Custom Glassmorphic Language Dropdown**:
   - Replaced the OS-native `<select>` with a **custom floating dropdown menu**.
   - Custom features:
     - Glassmorphism background matching the dark/light theme tokens.
     - Smooth fade-and-slide entry animation.
     - Active item checkmark indicator.
     - Hover highlight and focus rings.
     - Interactive click-outside and Escape key dismiss behavior.
     - Automatically populated from [`translations.js`](file:///Users/corey/Downloads/dir/translations.js).

2. **Multi-lingual Translation Dictionary ([`translations.js`](file:///Users/corey/Downloads/dir/translations.js))**:
   - Includes English (`en`) and French (`fr`).
   - Centralizes all text: header titles, home breadcrumb, search placeholder, loading states, folder badges, parent directory links, download buttons, and footer copyright.
   - Unicode escape sequences (`\u00E9` for `é`, etc.) are used for 100% server charset safety.

3. **Coded SVG Favicon ([`favicon.svg`](file:///Users/corey/Downloads/dir/favicon.svg))**:
   - Embedded inline data URI in [`header.html`](file:///Users/corey/Downloads/dir/header.html) and saved as a standalone file.

4. **Apache Configuration ([`htaccess`](file:///Users/corey/Downloads/dir/htaccess))**:
   - `IndexIgnore` updated to hide `translations.js` and `favicon.svg`.

---

## Files to Upload

Upload the updated files to the web root (`public_html` / root of `res.sng.al`):
1. [`header.html`](file:///Users/corey/Downloads/dir/header.html)
2. [`footer.html`](file:///Users/corey/Downloads/dir/footer.html)
3. [`translations.js`](file:///Users/corey/Downloads/dir/translations.js)
4. [`favicon.svg`](file:///Users/corey/Downloads/dir/favicon.svg)
5. [`htaccess`](file:///Users/corey/Downloads/dir/htaccess) &rarr; upload as **`.htaccess`**
