# Apache Directory Listing: Metadata & Descriptions Guide

This guide explains how to add metadata/descriptions directly to files and folders using Apache's native `AddDescription` directive in `.htaccess`, and how the directory theme renders them.

---

## 1. Does `AddDescription` Work for Both Files and Folders?

**Yes!** In Apache `mod_autoindex`, `AddDescription` works identically for:
- **Folders:** e.g., `jay/` or `jay`
- **Specific Files:** e.g., `acc.zip`, `Daniel.zip`
- **File Extensions & Wildcards:** e.g., `*.zip`, `*.pdf`, `lesson*`

```apache
# Folder descriptions
AddDescription "Jigeen yi ak Yàlla (Women and God - Wolof)" jay/
AddDescription "Mooré Bible Studies" muc/
AddDescription "Senegal Bible Society" sbs/

# Specific file descriptions
AddDescription "Complete Wolof Audio Collection" acc.zip
AddDescription "Daniel Bible Study Series" Daniel.zip
AddDescription "Disciple Croissant Training" DiscipleCroissant.zip

# Wildcard / extension descriptions (fallback for any file matching pattern)
AddDescription "Audio Recording" *.mp3
AddDescription "Compressed Archive" *.zip
```

---

## 2. Where to Place Descriptions on the Filesystem

You can define descriptions in either of two places:

### Option A: In the Root `.htaccess` (Centralized)
Add them directly inside the main `htaccess` file at the root of your resources repository. This keeps all metadata in one place:
```apache
# Root .htaccess
AddDescription "Jigeen yi ak Yàlla" jay/
AddDescription "Complete Wolof Audio" acc.zip
```

### Option B: In Subfolder `.htaccess` (Decentralized)
If you have a subfolder like `/jay/`, you can place a `.htaccess` file directly inside `/jay/` with descriptions for its internal files:
```apache
# /jay/.htaccess
AddDescription "Lesson 1: Introduction" 01_intro.webm
AddDescription "Lesson 2: Mary and Elizabeth" 02_mary.webm
```
Apache inherits directives recursively from parent directories down to subdirectories.

---

## 3. How the UI Renders Metadata on Cards

The card layout accommodates:
1. **File/Folder Title (`.file-title`):** The primary name of the item (`jay`, `acc.zip`).
2. **Friendly Description (`.file-desc`):** The description string defined via `AddDescription` (e.g. `Jigeen yi ak Yàlla`). Rendered in clear, readable text directly beneath the title.
3. **Metadata (`.file-meta`):**
   - For **files**: `Size • Date` (e.g. `1.2M • 2020-09-26 07:42`).
   - For **folders**: `Date` (e.g. `2020-09-26 07:42`).
4. **Action Element (`.file-action`):**
   - For **folders**: A `Folder` badge (or `Up` badge for parent directory).
   - For **files**: A `Download` button.

### Visual Representation

```
[ 📁 ]  jay                                         [ Folder ]
        Jigeen yi ak Yàlla
        2020-09-26 07:42

[ 🗜️ ]  acc.zip                                     [ Download ]
        Complete Wolof Audio Collection
        2020-09-26 07:42 • 1.2M

[ 📁 ]  muc                                         [ Folder ]
        2021-03-30 09:21
```

*Note: If an item does not have a description, the `.file-desc` line is omitted cleanly, displaying just the title and metadata without any empty space.*

---

## 4. Live Search & Filter Integration

The instant filter automatically searches across **both**:
- The file/folder name (`jay`, `acc.zip`)
- The description text (`Jigeen`, `Yàlla`, `Wolof`, `Audio`)

Typing any part of either string in the search input will immediately filter down to matching cards.

---

## 5. Apache Autoindex Scraper Fix (`footer.html`)

Previously, `footer.html` used `tds[tds.length - 3]` and `tds[tds.length - 2]` to read the date and size. In a 4-column Apache table (`[Icon, Name, Date, Size]`), this offset caused:
- The item name to be parsed as the `date` (resulting in `jay/` or `acc.zip` in the metadata line).
- The date to be parsed as the `size`.
- The actual size to be ignored.

The parser was updated to locate the anchor's cell (`nameTd`) dynamically:
```javascript
var nameTd = a.closest("td");
var nameIdx = tds.indexOf(nameTd);

// Relative column indexing:
// nameIdx + 1: Last modified date
// nameIdx + 2: File size
// nameIdx + 3: Description (enabled via DescriptionWidth=* in IndexOptions)
```
This correctly extracts `date`, `size`, and `description` across both 4-column (descriptions suppressed) and 5-column (descriptions active) Apache listings.
