## QR Digital Restaurant Menu

Static website to build, share, and view a restaurant menu via QR code.

### Files
- `index.html`: Landing page
- `admin.html`: Menu Builder (create/edit, import/export, share with QR)
- `menu.html`: Public Menu viewer (loads from link or JSON upload)
- `app.js`: Shared utilities and localStorage persistence
- `styles.css`: Responsive styling and print view

### How to use
1. Open `admin.html` in a browser.
2. Add categories/items, set restaurant name/description.
3. Click Save to persist in your browser.
4. Export JSON for backup (optional).
5. Click Share / QR to get a link and QR code. Print the QR.
6. Guests open `menu.html` (via the link/QR) to view your menu.

Notes:
- The share link contains compressed JSON in the URL. For very large menus, prefer exporting the JSON and hosting it, or splitting categories.
- Everything runs client-side; no server required.


