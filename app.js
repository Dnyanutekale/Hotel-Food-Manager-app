class DataManager {
    constructor() {
        this.STORAGE_KEY_FOOD = 'gourmet_hub_food_items';
        this.STORAGE_KEY_ORDERS = 'gourmet_hub_orders';
        this.STORAGE_KEY_SETTINGS = 'gourmet_hub_settings';
        this.STORAGE_KEY_VISITORS = 'gourmet_hub_visitors';
        this.STORAGE_KEY_FEEDBACK = 'gourmet_hub_feedback';
        this.STORAGE_KEY_AGENTS = 'gourmet_hub_agents';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.STORAGE_KEY_FOOD)) {
            this.initSampleData();
        } else {
            const items = this.getFoodItems();
            // migration: if empty or missing new categories, re-init
            if (!items || items.length === 0 || !items.some(item => ['Main Food', 'Fast Food', 'Juices'].includes(item.category))) {
                console.log('No items or old data detected, re-initializing');
                this.initSampleData();
            }
        }
        if (!localStorage.getItem(this.STORAGE_KEY_ORDERS)) {
            localStorage.setItem(this.STORAGE_KEY_ORDERS, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_SETTINGS)) {
            const defaultSettings = {
                hotelName: 'Food Hub',
                adminName: 'Admin',
                contact: '+91 9876543210',
                address: '123 Food Street, City',
                pin: '1234'
            };
            localStorage.setItem(this.STORAGE_KEY_SETTINGS, JSON.stringify(defaultSettings));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_VISITORS)) {
            localStorage.setItem(this.STORAGE_KEY_VISITORS, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_FEEDBACK)) {
            localStorage.setItem(this.STORAGE_KEY_FEEDBACK, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_AGENTS)) {
            const defaultAgents = [
                { id: 'agt-1', name: 'John Delivery', contact: '123-456-7890', status: 'Available' },
                { id: 'agt-2', name: 'Mike Express', contact: '098-765-4321', status: 'Offline' }
            ];
            localStorage.setItem(this.STORAGE_KEY_AGENTS, JSON.stringify(defaultAgents));
        }
    }

    initSampleData() {
        const samples = [
            // Beverages
            { id: 'B001', name: 'Tea', category: 'Beverages', price: 20, description: 'Classic Indian tea', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1594631252845-29fc4586d52c?w=500&q=80' },
            { id: 'B002', name: 'Coffee', category: 'Beverages', price: 30, description: 'Rich roasted coffee', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=500&q=80' },
            { id: 'B003', name: 'Black Coffee', category: 'Beverages', price: 25, description: 'Strong black coffee', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80' },
            { id: 'B004', name: 'Cold Coffee', category: 'Beverages', price: 60, description: 'Chilled creamy coffee', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1517701604599-bb28b581f427?w=500&q=80' },
            { id: 'B005', name: 'Green Tea', category: 'Beverages', price: 40, description: 'Healthy green tea', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&q=80' },

            // Juices
            { id: 'J001', name: 'Orange Juice', category: 'Juices', price: 50, description: 'Freshly squeezed oranges', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80' },
            { id: 'J002', name: 'Mango Juice', category: 'Juices', price: 60, description: 'Seasonal mango nectar', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1591033594798-33227a05780d?w=500&q=80' },
            { id: 'J003', name: 'Pineapple Juice', category: 'Juices', price: 50, description: 'Tangy pineapple juice', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=500&q=80' },
            { id: 'J004', name: 'Apple Juice', category: 'Juices', price: 60, description: 'Sweet apple juice', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&q=80' },
            { id: 'J005', name: 'Mixed Fruit Juice', category: 'Juices', price: 70, description: 'Blend of seasonal fruits', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1621506289937-a8ede629b23c?w=500&q=80' },

            // Desserts
            { id: 'D001', name: 'Ice Cream', category: 'Desserts', price: 80, description: 'Vanilla / Chocolate scoop', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=80' },
            { id: 'D002', name: 'Chocolate Cake', category: 'Desserts', price: 120, description: 'Moist chocolate delight', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80' },
            { id: 'D003', name: 'Gulab Jamun', category: 'Desserts', price: 60, description: 'Traditional milk dumplings', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?w=500&q=80' },
            { id: 'D004', name: 'Rasgulla', category: 'Desserts', price: 60, description: 'Spongy syrupy balls', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?w=500&q=80' },
            { id: 'D005', name: 'Brownie', category: 'Desserts', price: 100, description: 'Fudgy chocolate brownie', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80' },

            // Main Food
            { id: 'M001', name: 'Veg Thali', category: 'Main Food', price: 250, description: 'Complete balanced meal', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80' },
            { id: 'M002', name: 'Paneer Butter Masala', category: 'Main Food', price: 220, description: 'Classic paneer curry', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80' },
            { id: 'M003', name: 'Dal Tadka', category: 'Main Food', price: 150, description: 'Yellow lentils tempered', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&q=80' },
            { id: 'M004', name: 'Veg Biryani', category: 'Main Food', price: 180, description: 'Fragrant veg rice', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500&q=80' },
            { id: 'M005', name: 'Chicken Biryani', category: 'Main Food', price: 260, description: 'Hyderabadi style chicken', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80' },
            { id: 'M006', name: 'Butter Naan', category: 'Main Food', price: 40, description: 'Soft leavened bread', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1601050633729-195085873996?w=500&q=80' },
            { id: 'M007', name: 'Roti', category: 'Main Food', price: 15, description: 'Whole wheat bread', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1547138833-286a9f074d28?w=500&q=80' },
            { id: 'M008', name: 'Fried Rice', category: 'Main Food', price: 160, description: 'Wok tossed veg rice', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80' },
            { id: 'M009', name: 'Noodles', category: 'Main Food', price: 150, description: 'Spicy veg noodles', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80' },

            // Fast Food
            { id: 'F001', name: 'Burger', category: 'Fast Food', price: 90, description: 'Crispy veg burger', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80' },
            { id: 'F002', name: 'Pizza', category: 'Fast Food', price: 250, description: 'Classic Margherita', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80' },
            { id: 'F003', name: 'Sandwich', category: 'Fast Food', price: 80, description: 'Grilled cheese veg sandwich', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80' },
            { id: 'F004', name: 'French Fries', category: 'Fast Food', price: 100, description: 'Salted potato fries', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80' },
            { id: 'F005', name: 'Momos', category: 'Fast Food', price: 120, description: 'Steamed veg momos', availability: 'In Stock', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?w=500&q=80' }
        ];
        localStorage.setItem(this.STORAGE_KEY_FOOD, JSON.stringify(samples));
    }

    getSettings() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_SETTINGS));
    }

    saveSettings(settings) {
        localStorage.setItem(this.STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    }

    getFoodItems() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_FOOD));
    }

    saveFoodItem(item) {
        const items = this.getFoodItems();
        if (item.id) {
            const index = items.findIndex(i => i.id === item.id);
            items[index] = item;
        } else {
            item.id = 'F' + Date.now().toString().slice(-4); // Generate a simple ID
            items.push(item);
        }
        localStorage.setItem(this.STORAGE_KEY_FOOD, JSON.stringify(items));
        return items;
    }

    deleteFoodItem(id) {
        const items = this.getFoodItems().filter(i => i.id !== id);
        localStorage.setItem(this.STORAGE_KEY_FOOD, JSON.stringify(items));
        return items;
    }

    getOrders() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_ORDERS));
    }

    saveOrder(order) {
        const orders = this.getOrders();
        order.id = 'ORD-' + Date.now().toString().slice(-6);
        order.date = new Date().toISOString();
        order.source = order.source || 'Walk-in'; // Walk-in or Online
        order.deliveryStatus = order.source === 'Online' ? 'Pending' : 'N/A';
        order.assignedAgent = null;
        orders.push(order);
        localStorage.setItem(this.STORAGE_KEY_ORDERS, JSON.stringify(orders));
        return order;
    }

    // Visitors Tracking
    getVisitors() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_VISITORS));
    }

    saveVisitorLog(count) {
        const visitors = this.getVisitors();
        const date = new Date().toISOString().split('T')[0];
        const existingIndex = visitors.findIndex(v => v.date === date);
        if (existingIndex > -1) {
            visitors[existingIndex].count += parseInt(count);
        } else {
            visitors.push({ date, count: parseInt(count) });
        }
        localStorage.setItem(this.STORAGE_KEY_VISITORS, JSON.stringify(visitors));
        return visitors;
    }

    // Feedback
    getFeedback() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_FEEDBACK));
    }

    saveFeedback(feedback) {
        const list = this.getFeedback();
        feedback.id = Date.now().toString();
        feedback.date = new Date().toISOString();
        list.push(feedback);
        localStorage.setItem(this.STORAGE_KEY_FEEDBACK, JSON.stringify(list));
        return feedback;
    }

    // Agents
    getAgents() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_AGENTS));
    }

    saveAgent(agent) {
        const agents = this.getAgents();
        if (agent.id) {
            const index = agents.findIndex(a => a.id === agent.id);
            agents[index] = agent;
        } else {
            agent.id = 'agt-' + Date.now().toString().slice(-4);
            agents.push(agent);
        }
        localStorage.setItem(this.STORAGE_KEY_AGENTS, JSON.stringify(agents));
        return agents;
    }
}

// --- Router ---
class Router {
    constructor() {
        this.sections = document.querySelectorAll('.page-section');
        this.navItems = document.querySelectorAll('.nav-item');
        this.pageTitle = document.getElementById('page-title');
    }

    navigate(sectionId) {
        // Update Sections
        this.sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        // Update Nav
        this.navItems.forEach(item => {
            const href = item.getAttribute('href').replace('#', '');
            item.classList.toggle('active', href === sectionId);
        });

        // Update Title and Navigation
        const activeNav = document.querySelector(`.nav-item[href="#${sectionId}"]`);
        if (activeNav) {
            const span = activeNav.querySelector('span');
            if (span) this.pageTitle.textContent = span.textContent;
        }

        // Trigger module specific refresh if needed
        if (sectionId === 'dashboard') ui.renderDashboard();
        if (sectionId === 'food-items') ui.renderFoodList();
        if (sectionId === 'orders') ui.renderOrderInterface();
        if (sectionId === 'reports') ui.renderReports();
        if (sectionId === 'tracking') ui.renderTracking();
        if (sectionId === 'feedback') ui.renderFeedback();
        if (sectionId === 'online-orders') ui.renderOnlineOrders();
        if (sectionId === 'order-history') ui.renderOrderHistory();
        if (sectionId === 'admin-panel') ui.updateAdminUI();
        if (sectionId === 'about' || sectionId === 'contact') {
            const settings = data.getSettings();
            if (sectionId === 'contact') {
                document.getElementById('contact-hotel-address').textContent = settings.address;
                document.getElementById('contact-hotel-phone').textContent = settings.contact;
            }
        }
    }
}

// --- UI Controller ---
class UIController {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.registerThemeToggle();
        this.updateDate();
        this.checkAdminSession();
        this.renderDashboard(); // Initial load
        lucide.createIcons();
    }

    checkAdminSession() {
        this.isAdmin = sessionStorage.getItem('admin_logged_in') === 'true';
        this.updateAdminUI();
    }

    updateAdminUI() {
        const loginView = document.getElementById('admin-login-view');
        const settingsView = document.getElementById('admin-settings-view');
        const headerName = document.querySelector('.profile-chip span');
        const settings = data.getSettings();

        headerName.textContent = this.isAdmin ? settings.adminName : 'Guest';

        if (this.isAdmin) {
            loginView.classList.add('hidden');
            settingsView.classList.remove('hidden');
            this.loadSettings();
        } else {
            loginView.classList.remove('hidden');
            settingsView.classList.add('hidden');
        }

        // Hide/Show admin-only items if they exist
        this.renderFoodList(); // Refresh to show/hide edit buttons
        this.renderAgents();
    }

    loadSettings() {
        const settings = data.getSettings();
        document.getElementById('setting-hotel-name').value = settings.hotelName;
        document.getElementById('setting-admin-name').value = settings.adminName;
        document.getElementById('setting-hotel-contact').value = settings.contact;
        document.getElementById('setting-hotel-address').value = settings.address;
    }

    handleAdminLogin(e) {
        e.preventDefault();
        const pin = document.getElementById('admin-password').value;
        const settings = data.getSettings();

        if (pin === settings.pin) {
            this.isAdmin = true;
            sessionStorage.setItem('admin_logged_in', 'true');
            document.getElementById('login-error').classList.add('hidden');
            document.getElementById('admin-password').value = '';
            this.updateAdminUI();
            this.showToast('Admin access granted');
        } else {
            document.getElementById('login-error').classList.remove('hidden');
        }
    }

    handleAdminLogout() {
        this.isAdmin = false;
        sessionStorage.removeItem('admin_logged_in');
        this.updateAdminUI();
        this.showToast('Logged out successfully', 'error');
    }

    handleSettingsUpdate(e) {
        e.preventDefault();
        const current = data.getSettings();
        const updated = {
            ...current,
            hotelName: document.getElementById('setting-hotel-name').value,
            adminName: document.getElementById('setting-admin-name').value,
            contact: document.getElementById('setting-hotel-contact').value,
            address: document.getElementById('setting-hotel-address').value
        };
        data.saveSettings(updated);
        this.showToast('Hotel details updated');
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const moon = document.getElementById('moon-icon');
        const sun = document.getElementById('sun-icon');
        const themeBtnText = document.querySelector('.theme-btn span');

        if (this.currentTheme === 'dark') {
            moon.classList.add('hidden');
            sun.classList.remove('hidden');
            themeBtnText.textContent = 'Light Mode';
        } else {
            sun.classList.add('hidden');
            moon.classList.remove('hidden');
            themeBtnText.textContent = 'Dark Mode';
        }
        lucide.createIcons();
    }

    registerThemeToggle() {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', this.currentTheme);
            this.applyTheme();
        });
    }

    updateDate() {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container') || this.createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? 'check-circle' : 'alert-circle';
        toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;

        container.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = '0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    showModal(id) {
        document.getElementById(id).style.display = 'flex';
    }

    hideModal(id) {
        document.getElementById(id).style.display = 'none';
        if (id === 'food-modal') {
            document.getElementById('food-form').reset();
            document.getElementById('food-id').value = '';
            document.getElementById('modal-title').textContent = 'Add Food Item';
            document.getElementById('image-preview').classList.add('hidden');
            document.getElementById('image-preview').innerHTML = '';
        }
    }

    // --- Dashboard logic ---
    renderDashboard() {
        const items = data.getFoodItems();
        const orders = data.getOrders();

        document.getElementById('stat-total-items').textContent = items.length;
        document.getElementById('stat-total-orders').textContent = orders.length;

        const weeklyRevenue = orders
            .filter(o => {
                const orderDate = new Date(o.date);
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return orderDate >= sevenDaysAgo;
            })
            .reduce((sum, order) => sum + order.total, 0);
        document.getElementById('stat-weekly-revenue').textContent = `₹${weeklyRevenue.toLocaleString()}`;

        const today = new Date().toISOString().split('T')[0];
        const todaySales = orders
            .filter(o => o.date.startsWith(today))
            .reduce((sum, order) => sum + order.total, 0);
        document.getElementById('stat-today-sales').textContent = `₹${todaySales.toLocaleString()}`;

        // Most Sold Item
        const itemSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                itemSales[item.name] = (itemSales[item.name] || 0) + item.quantity;
            });
        });
        const mostSold = Object.entries(itemSales).sort((a, b) => b[1] - a[1])[0];
        document.getElementById('stat-most-sold').textContent = mostSold ? `${mostSold[0]} (${mostSold[1]})` : '-';

        // Recent Orders Table
        const recentBody = document.getElementById('recent-orders-body');
        recentBody.innerHTML = orders.slice(-5).reverse().map(o => `
            <tr>
                <td>${o.id}</td>
                <td>${o.customer}</td>
                <td>₹${o.total}</td>
                <td><span class="badge ${o.status === 'Completed' ? 'badge-stock' : 'badge-out'}">${o.status}</span></td>
            </tr>
        `).join('') || '<tr><td colspan="4" style="text-align:center">No orders yet</td></tr>';

        lucide.createIcons();
    }

    // --- Food Management logic ---
    renderFoodList() {
        const items = data.getFoodItems();
        const searchQuery = document.getElementById('food-search').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;

        const filteredItems = items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery);
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });

        const foodGrid = document.getElementById('food-list-grid');
        foodGrid.innerHTML = filteredItems.map(item => this.renderFoodCard(item).outerHTML).join('') || '<div class="empty-state" style="grid-column: 1/-1;"><i data-lucide="search-x"></i><p>No food items found matching your filters.</p></div>';

        lucide.createIcons();
    }

    renderFoodCard(item) {
        const card = document.createElement('div');
        card.className = 'food-card glass-card';
        card.innerHTML = `
            <div class="food-card-img">
                <img src="${item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'}" alt="${item.name}">
                <div class="price-tag">₹${item.price}</div>
            </div>
            <div class="food-card-content">
                <div class="food-card-header">
                    <h3>${item.name}</h3>
                    <span class="badge ${item.category.toLowerCase().replace(' ', '-')}">${item.category}</span>
                </div>
                <p class="food-desc" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px; flex-grow: 1;">${item.description || 'Delicious home-style cooking with fresh ingredients.'}</p>
                <div class="food-card-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--glass-border); padding-top: 15px;">
                    <span class="stock-status" style="font-size: 0.8rem; font-weight: 600; color: ${item.availability === 'In Stock' ? '#10b981' : '#ef4444'};">
                        ${item.availability}
                    </span>
                    ${this.isAdmin ? `
                        <div class="admin-actions" style="display: flex; gap: 8px;">
                            <button class="action-btn edit-btn" onclick="ui.editFoodItem('${item.id}')" title="Edit"><i data-lucide="edit-3" style="width: 16px;"></i></button>
                            <button class="action-btn delete-btn" onclick="ui.deleteFoodItem('${item.id}')" title="Delete"><i data-lucide="trash-2" style="width: 16px;"></i></button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        return card;
    }

    handleFoodSubmit(e) {
        e.preventDefault();
        const id = document.getElementById('food-id').value;
        const name = document.getElementById('food-name').value;
        const category = document.getElementById('food-category').value;
        const price = parseFloat(document.getElementById('food-price').value);
        const description = document.getElementById('food-desc').value;
        const availability = document.getElementById('food-stock').value;
        const imageFile = document.getElementById('food-image').files[0];

        const saveItem = (imageData) => {
            const item = { id, name, category, price, description, availability, image: imageData };
            data.saveFoodItem(item);
            this.hideModal('food-modal');
            this.renderFoodList();
            this.showToast(`Item ${id ? 'updated' : 'added'} successfully!`);
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => saveItem(e.target.result);
            reader.readAsDataURL(imageFile);
        } else {
            // Keep existing image if editing
            const existingItem = id ? data.getFoodItems().find(i => i.id === id) : null;
            saveItem(existingItem ? existingItem.image : null);
        }
    }

    editFoodItem(id) {
        const items = data.getFoodItems();
        const item = items.find(i => i.id === id);
        if (!item) return;

        document.getElementById('food-id').value = item.id;
        document.getElementById('food-name').value = item.name;
        document.getElementById('food-category').value = item.category;
        document.getElementById('food-price').value = item.price;
        document.getElementById('food-desc').value = item.description;
        document.getElementById('food-stock').value = item.availability;
        document.getElementById('modal-title').textContent = 'Edit Food Item';

        if (item.image) {
            const preview = document.getElementById('image-preview');
            preview.innerHTML = `<img src="${item.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 12px; margin-top: 10px; border: 1px solid var(--glass-border);">`;
            preview.classList.remove('hidden');
        }

        this.showModal('food-modal');
    }

    deleteFoodItem(id) {
        if (confirm('Are you sure you want to delete this item?')) {
            data.deleteFoodItem(id);
            this.renderFoodList();
            this.showToast('Item deleted', 'error');
        }
    }

    // --- Order Management logic ---
    renderOrderInterface() {
        const items = data.getFoodItems().filter(i => i.availability === 'In Stock');
        const searchQuery = document.getElementById('order-food-search').value.toLowerCase();

        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery));

        const container = document.getElementById('order-food-list');
        container.innerHTML = filteredItems.map(item => `
            <div class="food-item-card" onclick="ui.addToCart('${item.id}')">
                <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}">
                <div class="food-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                    <span class="badge ${item.category.toLowerCase().replace(' ', '-')}">${item.category}</span>
                </div>
            </div>
        `).join('') || '<p style="grid-column: 1/-1; text-align: center;">No items available</p>';

        this.cart = this.cart || [];
        this.renderCart();
    }

    addToCart(id) {
        const items = data.getFoodItems();
        const item = items.find(i => i.id === id);
        if (!item) return;

        const cartItem = this.cart.find(i => i.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        this.renderCart();
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(i => i.id !== id);
        this.renderCart();
    }

    updateQuantity(id, delta) {
        const item = this.cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) this.removeFromCart(id);
        }
        this.renderCart();
    }

    renderCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span style="font-weight: 600;">${item.name}</span><br>
                    <small style="color: var(--text-muted);">₹${item.price} x ${item.quantity}</small>
                </div>
                <div class="qty-ctrl">
                    <button class="action-btn" onclick="ui.updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="action-btn" onclick="ui.updateQuantity('${item.id}', 1)">+</button>
                    <button class="action-btn delete-btn" onclick="ui.removeFromCart('${item.id}')"><i data-lucide="x"></i></button>
                </div>
            </div>
        `).join('') || '<p style="text-align: center; color: var(--text-muted);">Cart is empty</p>';

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const gstPercent = parseFloat(document.getElementById('gst-input').value) || 0;
        const discountAmount = parseFloat(document.getElementById('discount-input').value) || 0;
        
        const gstAmount = (subtotal * gstPercent) / 100;
        const grandTotal = Math.max(0, subtotal + gstAmount - discountAmount);

        document.getElementById('subtotal').textContent = `₹${subtotal}`;
        document.getElementById('grand-total').textContent = `₹${Math.round(grandTotal)}`;

        lucide.createIcons();
    }

    handleOrderConfirm() {
        const customer = document.getElementById('customer-name').value.trim();
        const table = document.getElementById('table-number').value.trim();
        if (!customer) {
            alert('Please enter customer name');
            return;
        }
        if (this.cart.length === 0) {
            alert('Cart is empty');
            return;
        }

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const gstPercent = parseFloat(document.getElementById('gst-input').value) || 0;
        const discountAmount = parseFloat(document.getElementById('discount-input').value) || 0;
        const gstAmount = (subtotal * gstPercent) / 100;
        const total = Math.max(0, subtotal + gstAmount - discountAmount);

        const order = {
            customer,
            table: table || 'N/A',
            items: [...this.cart],
            subtotal,
            gst: gstAmount,
            discount: discountAmount,
            total: Math.round(total),
            status: 'Preparing'
        };

        const savedOrder = data.saveOrder(order);
        this.generateBillView(savedOrder);
        this.showToast('Order confirmed! Status: Preparing');

        // Refresh dynamic components
        this.renderDashboard();
        if (document.getElementById('reports').classList.contains('active')) this.renderReports();
        if (document.getElementById('order-history').classList.contains('active')) this.renderOrderHistory();

        // Reset cart and inputs
        this.cart = [];
        document.getElementById('customer-name').value = '';
        document.getElementById('table-number').value = '';
        document.getElementById('discount-input').value = '0';
        this.renderCart();
    }

    generateBillView(order) {
        const settings = data.getSettings();
        const billContent = document.getElementById('bill-content');
        billContent.innerHTML = `
            <div class="bill-header" style="text-align: center; border-bottom: 2px dashed #ccc; padding-bottom: 15px; margin-bottom: 20px;">
                <h1 style="color: var(--primary-red); font-size: 2rem;">${settings.hotelName}</h1>
                <p style="font-size: 0.9rem; color: var(--text-muted);">${settings.address}</p>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Contact: ${settings.contact}</p>
                <div style="margin-top: 15px; display: flex; justify-content: space-between; font-size: 0.85rem;">
                    <span>Order: ${order.id}</span>
                    <span>Date: ${new Date(order.date).toLocaleString()}</span>
                </div>
            </div>
            <div class="bill-to" style="margin-bottom: 15px; display: flex; justify-content: space-between;">
                <span><strong>Customer:</strong> ${order.customer}</span>
                <span><strong>Table:</strong> ${order.table}</span>
            </div>
            <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
                <thead style="border-bottom: 1px solid #eee;">
                    <tr style="text-align: left;"><th style="padding: 8px 0;">Item</th><th>Qty</th><th>Price</th><th style="text-align: right;">Total</th></tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td style="padding: 8px 0;">${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>₹${item.price}</td>
                            <td style="text-align: right;">₹${item.price * item.quantity}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="bill-footer" style="border-top: 1px solid #eee; padding-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Subtotal:</span>
                    <span>₹${order.subtotal}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>GST:</span>
                    <span>₹${Math.round(order.gst)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px; color: #16a34a;">
                    <span>Discount:</span>
                    <span>-₹${order.discount}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-weight: 700; font-size: 1.2rem; color: var(--primary-red);">
                    <span>Total Payable:</span>
                    <span>₹${order.total}</span>
                </div>
            </div>
            <p style="text-align: center; margin-top: 30px; font-style: italic; color: var(--text-muted);">Thank you for dining with us!</p>
            <div style="text-align: center; margin-top: 10px;">
                <button class="btn btn-outline" style="padding: 5px 15px; font-size: 0.8rem;" onclick="window.print()">Print Receipt</button>
            </div>
        `;

        this.currentOrder = order;
        this.showModal('bill-modal');
    }

    downloadPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const order = this.currentOrder;

        doc.setFontSize(22);
        doc.setTextColor(0, 97, 255); // Blue
        doc.text("FOOD HUB", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Order ID: ${order.id} `, 20, 40);
        doc.text(`Date: ${new Date(order.date).toLocaleString()} `, 20, 47);
        doc.text(`Customer: ${order.customer} `, 20, 54);

        doc.setDrawColor(0, 97, 255);
        doc.line(20, 60, 190, 60);

        let y = 70;
        doc.setFont("helvetica", "bold");
        doc.text("Item", 20, y);
        doc.text("Qty", 120, y);
        doc.text("Price", 145, y);
        doc.text("Total", 175, y);
        doc.setFont("helvetica", "normal");

        y += 10;
        order.items.forEach(item => {
            doc.text(item.name, 20, y);
            doc.text(item.quantity.toString(), 125, y, { align: "center" });
            doc.text(`Rs.${item.price} `, 145, y);
            doc.text(`Rs.${item.price * item.quantity} `, 175, y);
            y += 10;
        });

        doc.setDrawColor(255, 107, 0); // Orange
        doc.line(20, y + 5, 190, y + 5);

        doc.setFontSize(16);
        doc.setTextColor(255, 107, 0);
        doc.text(`Grand Total: Rs.${order.total} `, 190, y + 15, { align: "right" });

        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Thank you for your business!", 105, y + 30, { align: "center" });

        doc.save(`Bill_${order.id}.pdf`);
    }

    // --- Reports logic ---
    renderReports() {
        const orders = data.getOrders();

        // Report Stats
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const totalQty = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

        // Monthly Revenue (Current Month)
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const monthlyRevenue = orders
            .filter(o => o.date.startsWith(currentMonth))
            .reduce((sum, o) => sum + o.total, 0);

        document.getElementById('report-total-orders').textContent = orders.length;
        document.getElementById('report-total-revenue').textContent = `₹${totalRevenue.toLocaleString()}`;
        document.getElementById('report-monthly-revenue').textContent = `₹${monthlyRevenue.toLocaleString()}`;
        document.getElementById('report-total-qty').textContent = totalQty;

        // Daily Report (Last 7 Days)
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const revenueData = last7Days.map(date => {
            return orders
                .filter(o => o.date.startsWith(date))
                .reduce((sum, o) => sum + o.total, 0);
        });

        this.initRevenueChart(last7Days, revenueData);

        // Weekly Report (By Category)
        const categorySales = { 'Main Food': 0, 'Fast Food': 0, 'Beverages': 0, 'Juices': 0, 'Desserts': 0 };
        orders.forEach(order => {
            order.items.forEach(item => {
                if (categorySales[item.category] !== undefined) {
                    categorySales[item.category] += item.quantity;
                }
            });
        });

        this.initTopItemsChart(Object.keys(categorySales), Object.values(categorySales));

        // Sales Trend (Last 7 Days)
        this.initSalesTrendChart(last7Days, revenueData);
    }

    initSalesTrendChart(labels, data) {
        const ctx = document.getElementById('sales-trend-chart').getContext('2d');
        if (this.trendChart) this.trendChart.destroy();

        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels.map(l => new Date(l).toLocaleDateString('en-US', { weekday: 'short' })),
                datasets: [{
                    label: 'Sales (₹)',
                    data: data,
                    borderColor: '#d32f2f',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#d32f2f'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    exportSalesReport() {
        const orders = data.getOrders();
        let csv = 'Date,Order ID,Customer,Table,Amount,Status\n';
        orders.forEach(o => {
            csv += `${new Date(o.date).toLocaleDateString()},${o.id},"${o.customer}",${o.table},${o.total},${o.status}\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.showToast('Sales report exported to CSV');
    }

    updateOrderStatus(orderId, newStatus) {
        const orders = data.getOrders();
        const index = orders.findIndex(o => o.id === orderId);
        if (index > -1) {
            orders[index].status = newStatus;
            localStorage.setItem(data.STORAGE_KEY_ORDERS, JSON.stringify(orders));
            this.renderOrderHistory();
            this.renderDashboard();
            this.showToast(`Order ${orderId} marked as ${newStatus}`);
        }
    }

    initRevenueChart(labels, data) {
        const ctx = document.getElementById('revenue-chart').getContext('2d');
        if (this.revChart) this.revChart.destroy();

        this.revChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map(l => new Date(l).toLocaleDateString('en-US', { weekday: 'short' })),
                datasets: [{
                    label: 'Revenue (₹)',
                    data: data,
                    backgroundColor: ['#0061ff', '#ff6b00', '#10b981', '#f59e0b', '#d32f2f', '#7c3aed', '#ec4899'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    initTopItemsChart(labels, data) {
        const ctx = document.getElementById('top-items-chart').getContext('2d');
        if (this.topChart) this.topChart.destroy();

        this.topChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#d32f2f', '#ff6b00', '#10b981', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // --- Order History logic ---
    renderOrderHistory() {
        const orders = data.getOrders();
        const searchQuery = document.getElementById('history-search').value.toLowerCase();

        const filtered = orders.filter(o =>
            o.id.toLowerCase().includes(searchQuery) ||
            o.customer.toLowerCase().includes(searchQuery)
        ).reverse();

        const body = document.getElementById('history-body');
        body.innerHTML = filtered.map(o => `
            < tr >
                <td>${new Date(o.date).toLocaleDateString()}</td>
                <td>${o.id}</td>
                <td>${o.customer}</td>
                <td>${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</td>
                <td>${o.table || 'N/A'}</td>
                <td>₹${o.total}</td>
                <td>
                    <select onchange="ui.updateOrderStatus('${o.id}', this.value)" style="padding: 2px; font-size: 0.75rem; border-radius: 4px;">
                        <option value="Preparing" ${o.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                        <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td><button class="btn btn-outline" style="padding: 4px 8px; font-size: 0.8rem;" onclick="ui.generateBillView(${JSON.stringify(o).replace(/"/g, '&quot;')})">View Bill</button></td>
            </tr >
            `).join('') || '<tr><td colspan="7" style="text-align:center">No orders found</td></tr>';
    }

    // --- Tracking Logic ---
    renderTracking() {
        const visitors = data.getVisitors();
        const orders = data.getOrders();
        const today = new Date().toISOString().split('T')[0];

        const todayVisitors = visitors.find(v => v.date === today)?.count || 0;
        const todayOrders = orders.filter(o => o.date.startsWith(today)).length;
        const conversion = todayVisitors > 0 ? ((todayOrders / todayVisitors) * 100).toFixed(1) : 0;

        document.getElementById('track-visitors-count').textContent = todayVisitors;
        document.getElementById('track-conversion-rate').textContent = `${conversion}% `;

        const body = document.getElementById('visitor-history-body');
        body.innerHTML = visitors.slice(-10).reverse().map(v => {
            const vOrders = orders.filter(o => o.date.startsWith(v.date)).length;
            const vConv = v.count > 0 ? ((vOrders / v.count) * 100).toFixed(1) : 0;
            return `< tr ><td>${v.date}</td><td>${v.count}</td><td>${vOrders}</td><td>${vConv}%</td></tr > `;
        }).join('') || '<tr><td colspan="4" style="text-align:center">No logs yet</td></tr>';
    }

    handleVisitorSubmit(e) {
        e.preventDefault();
        const count = document.getElementById('visitor-input').value;
        data.saveVisitorLog(count);
        document.getElementById('visitor-form').reset();
        this.renderTracking();
        this.showToast('Visitors logged');
    }

    // --- Feedback Logic ---
    renderFeedback() {
        const feedbacks = data.getFeedback();
        const container = document.getElementById('feedback-list');
        container.innerHTML = feedbacks.slice(-10).reverse().map(f => `
            < div class="glass-card mb-10" style = "padding: 15px;" >
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>${f.name}</strong>
                    <span style="color: var(--primary-orange);">${'⭐'.repeat(f.rating)}</span>
                </div>
                <p style="font-size: 0.9rem; margin-top: 10px;">${f.comment}</p>
                <small style="color: var(--text-muted);">${new Date(f.date).toLocaleDateString()}</small>
            </div >
            `).join('') || '<p>No feedback yet.</p>';
    }

    handleFeedbackSubmit(e) {
        e.preventDefault();
        const feedback = {
            name: document.getElementById('fb-name').value,
            rating: parseInt(document.querySelector('input[name="rating"]:checked').value),
            comment: document.getElementById('fb-comment').value
        };
        data.saveFeedback(feedback);
        document.getElementById('feedback-form').reset();
        this.renderFeedback();
        this.showToast('Thank you for your feedback!');
    }

    // --- Online Orders & Agent Management ---
    renderAgents() {
        const agents = data.getAgents();
        const body = document.getElementById('agent-body');
        body.innerHTML = agents.map(a => `
            < tr >
                <td>${a.id}</td>
                <td>${a.name}</td>
                <td>${a.contact}</td>
                <td><span class="badge ${a.status === 'Available' ? 'badge-stock' : 'badge-out'}">${a.status}</span></td>
                <td>
                    <button class="action-btn delete-btn" onclick="ui.deleteAgent('${a.id}')"><i data-lucide="trash-2"></i></button>
                </td>
            </tr >
            `).join('');
        lucide.createIcons();
    }

    handleAgentSubmit(e) {
        e.preventDefault();
        const agent = {
            name: document.getElementById('agent-name').value,
            contact: document.getElementById('agent-contact').value,
            status: 'Available'
        };
        data.saveAgent(agent);
        document.getElementById('agent-form').reset();
        this.renderAgents();
        this.showToast('Agent added');
    }

    deleteAgent(id) {
        if (confirm('Delete this agent?')) {
            const agents = data.getAgents().filter(a => a.id !== id);
            localStorage.setItem(data.STORAGE_KEY_AGENTS, JSON.stringify(agents));
            this.renderAgents();
        }
    }

    simulateOnlineOrder() {
        const items = data.getFoodItems();
        const randomItems = [items[Math.floor(Math.random() * items.length)]];
        const order = {
            customer: "Online Guest " + Math.floor(Math.random() * 100),
            items: randomItems.map(i => ({ ...i, quantity: 1 })),
            total: randomItems[0].price,
            source: 'Online',
            status: 'New'
        };
        data.saveOrder(order);
        this.renderOnlineOrders();
        this.showToast('New online order received!', 'success');
    }

    renderOnlineOrders() {
        const orders = data.getOrders().filter(o => o.source === 'Online' && o.status !== 'Completed');
        const agents = data.getAgents().filter(a => a.status === 'Available');
        const container = document.getElementById('online-orders-list');

        container.innerHTML = orders.map(o => `
            < div class="glass-card mb-20" style = "border-left: 4px solid var(--primary-orange);" >
                <div style="display: flex; justify-content: space-between;">
                    <h4>${o.id} - ${o.customer}</h4>
                    <span class="badge badge-non-veg">ONLINE</span>
                </div>
                <p class="mt-10">${o.items.map(i => i.name).join(', ')}</p>
                <p><strong>Total: ₹${o.total}</strong></p>
                <div class="mt-10" style="display: flex; gap: 10px; align-items: center;">
                    <select id="agent-select-${o.id}">
                        <option value="">Assign Agent</option>
                        ${agents.map(a => `<option value="${a.name}">${a.name}</option>`).join('')}
                    </select>
                    <button class="btn btn-primary" style="padding: 5px 15px;" onclick="ui.assignOrder('${o.id}')">Assign & Ship</button>
                </div>
            </div >
            `).join('') || '<p>No active online orders.</p>';
    }

    assignOrder(orderId) {
        const agentName = document.getElementById(`agent - select - ${orderId} `).value;
        if (!agentName) return alert('Select an agent');

        const orders = data.getOrders();
        const orderIndex = orders.findIndex(o => o.id === orderId);
        orders[orderIndex].assignedAgent = agentName;
        orders[orderIndex].status = 'Completed';
        orders[orderIndex].deliveryStatus = 'Shipped';
        localStorage.setItem(data.STORAGE_KEY_ORDERS, JSON.stringify(orders));

        this.renderOnlineOrders();
        this.showToast(`Order ${orderId} assigned to ${agentName} `);
    }
}

// --- Initialize App ---
const data = new DataManager();
const router = new Router();
const ui = new UIController();

// Event Listeners
document.getElementById('food-form').addEventListener('submit', (e) => ui.handleFoodSubmit(e));
document.getElementById('food-search').addEventListener('input', () => ui.renderFoodList());
document.getElementById('category-filter').addEventListener('change', () => ui.renderFoodList());
document.getElementById('order-food-search').addEventListener('input', () => ui.renderOrderInterface());
document.getElementById('confirm-order-btn').addEventListener('click', () => ui.handleOrderConfirm());
document.getElementById('download-bill-btn').addEventListener('click', () => ui.downloadPDF());
document.getElementById('visitor-form').addEventListener('submit', (e) => ui.handleVisitorSubmit(e));
document.getElementById('feedback-form').addEventListener('submit', (e) => ui.handleFeedbackSubmit(e));
document.getElementById('agent-form').addEventListener('submit', (e) => ui.handleAgentSubmit(e));

// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

// Close sidebar on nav click (mobile)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
    });
});

// Reset Data
function resetApp() {
    if (confirm('Are you sure you want to clear all data? This will delete all food items and orders.')) {
        localStorage.clear();
        ui.showToast('All data cleared', 'error');
        setTimeout(() => location.reload(), 1000);
    }
}

document.getElementById('food-image').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('image-preview');
            preview.innerHTML = `< img src = "${e.target.result}" style = "width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-top: 10px;" > `;
            preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

// Boot to dashboard
window.addEventListener('DOMContentLoaded', () => {
    router.navigate('dashboard');
});
