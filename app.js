const App = (() => {
  const STORAGE_KEY = 'qr_digital_menu_v1';

  function defaultMenu() {
    return {
      version: 1,
      restaurant: { name: 'Your Restaurant', description: 'Fresh • Local • Delicious' },
      categories: [
        {
          id: generateId('cat'),
          name: 'Breakfast',
          items: [
            { id: generateId('item'), name: 'Pancakes', description: 'Buttermilk, maple syrup', price: '$7.50' },
            { id: generateId('item'), name: 'Omelette', description: '3 eggs, cheddar, herbs', price: '$8.00' }
          ]
        },
        {
          id: generateId('cat'),
          name: 'Drinks',
          items: [
            { id: generateId('item'), name: 'Coffee', description: 'Hot or iced', price: '$2.50' },
            { id: generateId('item'), name: 'Orange Juice', description: 'Fresh squeezed', price: '$3.50' }
          ]
        }
      ]
    };
  }

  function hasMenu() {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
  }

  function getMenu() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v ? JSON.parse(v) : defaultMenu();
    } catch (e) {
      return defaultMenu();
    }
  }

  function setMenu(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }

  function removeCategory(categoryId) {
    const data = getMenu();
    data.categories = data.categories.filter(c => c.id !== categoryId);
    setMenu(data);
  }

  function downloadJson(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  function getParam(key) {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  }

  function buildShareUrl(data) {
    const json = JSON.stringify(data);
    const compressed = (window.LZString ? LZString.compressToEncodedURIComponent(json) : encodeURIComponent(json));
    const base = location.origin + location.pathname.replace(/admin\.html$/, 'menu.html');
    return `${base}?data=${compressed}`;
  }

  function escape(html) {
    return String(html ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function generateId(prefix) {
    const rand = Math.random().toString(36).slice(2, 8);
    const time = Date.now().toString(36).slice(-4);
    return `${prefix}_${time}${rand}`;
  }

  function toast(message) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1800);
  }

  function alertBox(message) {
    window.alert(message);
  }

  function confirmBox(message) {
    return window.confirm(message);
  }

  return {
    defaultMenu,
    hasMenu,
    getMenu,
    setMenu,
    removeCategory,
    downloadJson,
    getParam,
    buildShareUrl,
    escape,
    generateId,
    toast,
    alert: alertBox,
    confirm: confirmBox
  };
})();


