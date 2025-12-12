/**
 * Also and Partners - Law Firm Management System
 * Main Application Module
 */

const App = {
    // Initialize application
    init() {
        DataManager.init();
        this.initTheme();
        this.initSidebar();
        this.initHeader();
        this.initDropdowns();
        this.initMobileMenu();
    },

    // Initialize theme
    initTheme() {
        const theme = DataManager.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
    },

    // Toggle theme
    toggleTheme() {
        const currentTheme = DataManager.getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        DataManager.setTheme(newTheme);
        this.updateThemeIcon();
    },

    // Update theme icon
    updateThemeIcon() {
        const theme = DataManager.getTheme();
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    },

    // Initialize sidebar
    initSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        const user = Auth.getCurrentUser();

        // Update sidebar based on user role
        this.renderSidebar(user);

        // Highlight active menu item
        document.querySelectorAll('.nav-item').forEach(item => {
            const href = item.getAttribute('data-href');
            if (href === currentPage) {
                item.classList.add('active');
            }
            item.addEventListener('click', () => {
                if (href) window.location.href = href;
            });
        });
    },

    // Render sidebar navigation
    renderSidebar(user) {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (!sidebarNav || !user) return;

        const firm = DataManager.getFirmProfile();

        // Update logo and brand
        const logoImg = document.querySelector('.sidebar-logo');
        if (logoImg && firm.logo) {
            logoImg.src = firm.logo;
        }

        const brandName = document.querySelector('.sidebar-brand h2');
        if (brandName) {
            brandName.textContent = firm.firmName;
        }

        // Define menu items based on role
        const menuItems = this.getMenuItems(user.role);

        sidebarNav.innerHTML = menuItems.map(section => `
            <div class="nav-section">
                <div class="nav-section-title">${section.title}</div>
                ${section.items.map(item => `
                    <div class="nav-item" data-href="${item.href}">
                        <i class="${item.icon}"></i>
                        <span>${item.label}</span>
                    </div>
                `).join('')}
            </div>
        `).join('');

        // Re-highlight active and add click handlers
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        document.querySelectorAll('.nav-item').forEach(item => {
            const href = item.getAttribute('data-href');
            if (href === currentPage) {
                item.classList.add('active');
            }
            item.addEventListener('click', () => {
                if (href) window.location.href = href;
            });
        });
    },

    // Get menu items based on role
    getMenuItems(role) {
        const allMenus = {
            main: {
                title: 'Menu Utama',
                items: [
                    { icon: 'fas fa-th-large', label: 'Dashboard', href: 'dashboard.html' },
                    { icon: 'fas fa-briefcase', label: 'Cases', href: 'cases.html' },
                    { icon: 'fas fa-users', label: 'Clients', href: 'clients.html' },
                    { icon: 'fas fa-calendar-alt', label: 'Schedule', href: 'schedule.html' },
                ]
            },
            documents: {
                title: 'Dokumen',
                items: [
                    { icon: 'fas fa-folder-open', label: 'Documents', href: 'documents.html' },
                    { icon: 'fas fa-file-invoice-dollar', label: 'Invoices', href: 'invoices.html' },
                ]
            },
            tools: {
                title: 'Tools',
                items: [
                    { icon: 'fas fa-robot', label: 'AI Legal Search', href: 'legal-search.html' },
                ]
            },
            admin: {
                title: 'Administrasi',
                items: [
                    { icon: 'fas fa-user-cog', label: 'User Management', href: 'users.html' },
                    { icon: 'fas fa-cog', label: 'Firm Settings', href: 'firm-settings.html' },
                ]
            },
            account: {
                title: 'Akun',
                items: [
                    { icon: 'fas fa-user-circle', label: 'Profile', href: 'profile.html' },
                    { icon: 'fas fa-sign-out-alt', label: 'Logout', href: '#logout' },
                ]
            }
        };

        let menus = [];

        // Main menu - all users
        menus.push(allMenus.main);

        // Documents - based on role
        if (['superadmin', 'owner', 'partner'].includes(role)) {
            menus.push(allMenus.documents);
        } else {
            menus.push({
                title: 'Dokumen',
                items: [{ icon: 'fas fa-folder-open', label: 'Documents', href: 'documents.html' }]
            });
        }

        // Tools - all users
        menus.push(allMenus.tools);

        // Admin - superadmin only
        if (role === 'superadmin') {
            menus.push(allMenus.admin);
        }

        // Account - all users
        menus.push(allMenus.account);

        return menus;
    },

    // Initialize header
    initHeader() {
        const user = Auth.getCurrentUser();
        if (!user) return;

        // Update user info in header
        const userAvatar = document.querySelector('.header .user-avatar');
        const userName = document.querySelector('.header .user-info h4');
        const userRole = document.querySelector('.header .user-info p');

        if (userAvatar) {
            userAvatar.textContent = Utils.getInitials(user.fullName);
            userAvatar.style.background = Utils.stringToColor(user.fullName);
        }

        if (userName) {
            userName.textContent = user.fullName;
        }

        if (userRole) {
            userRole.textContent = Auth.getRoleLabel(user.role);
        }

        // Update page title
        this.updatePageTitle();
    },

    // Update page title
    updatePageTitle() {
        const pageTitles = {
            'dashboard.html': 'Dashboard',
            'users.html': 'User Management',
            'clients.html': 'Clients',
            'cases.html': 'Cases',
            'case-detail.html': 'Case Detail',
            'schedule.html': 'Schedule',
            'documents.html': 'Documents',
            'invoices.html': 'Invoices',
            'invoice-create.html': 'Create Invoice',
            'invoice-print.html': 'Invoice Preview',
            'legal-search.html': 'AI Legal Search',
            'firm-settings.html': 'Firm Settings',
            'profile.html': 'My Profile'
        };

        const currentPage = window.location.pathname.split('/').pop();
        const title = pageTitles[currentPage] || 'Dashboard';

        const headerTitle = document.querySelector('.header-left h1');
        if (headerTitle) {
            headerTitle.textContent = title;
        }

        document.title = `${title} - Also and Partners`;
    },

    // Initialize dropdowns
    initDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown.active').forEach(d => {
                d.classList.remove('active');
            });
        });

        // Handle logout
        document.querySelectorAll('[data-href="#logout"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logout();
            });
        });
    },

    // Initialize mobile menu
    initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024 &&
                    sidebar.classList.contains('active') &&
                    !sidebar.contains(e.target) &&
                    !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    },

    // Render user avatar
    renderUserAvatar(user, size = 'md') {
        const initials = Utils.getInitials(user?.fullName);
        const color = Utils.stringToColor(user?.fullName);
        return `<div class="user-avatar avatar-${size}" style="background: ${color}">${initials}</div>`;
    },

    // Get header HTML for pages
    getHeaderHTML(pageTitle) {
        const user = Auth.getCurrentUser();
        return `
            <header class="header">
                <div class="header-left">
                    <button id="mobile-menu-toggle" class="btn-icon d-none-lg">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h1>${pageTitle}</h1>
                </div>
                <div class="header-right">
                    <div class="header-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Cari...">
                    </div>
                    <div class="header-actions">
                        <button class="notification-btn" onclick="App.toggleTheme()">
                            <i id="theme-icon" class="fas fa-moon"></i>
                        </button>
                        <button class="notification-btn">
                            <i class="fas fa-bell"></i>
                            <span class="notification-badge">3</span>
                        </button>
                        <div class="dropdown">
                            <div class="user-menu dropdown-trigger">
                                <div class="user-avatar" style="background: ${Utils.stringToColor(user?.fullName)}">
                                    ${Utils.getInitials(user?.fullName)}
                                </div>
                                <div class="user-info">
                                    <h4>${user?.fullName || 'User'}</h4>
                                    <p>${Auth.getRoleLabel(user?.role)}</p>
                                </div>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-item" onclick="window.location.href='profile.html'">
                                    <i class="fas fa-user"></i>
                                    <span>Profile</span>
                                </div>
                                <div class="dropdown-divider"></div>
                                <div class="dropdown-item" onclick="Auth.logout()">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    },

    // Get sidebar HTML
    getSidebarHTML() {
        const firm = DataManager.getFirmProfile();
        return `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <img src="${firm.logo}" alt="Logo" class="sidebar-logo">
                    <div class="sidebar-brand">
                        <h2>${firm.firmName}</h2>
                        <p>${firm.tagline}</p>
                    </div>
                </div>
                <nav class="sidebar-nav">
                    <!-- Will be populated by initSidebar -->
                </nav>
            </aside>
        `;
    },

    // Get empty state HTML
    getEmptyStateHTML(icon, title, description, actionButton = null) {
        return `
            <div class="empty-state">
                <i class="${icon}"></i>
                <h3>${title}</h3>
                <p>${description}</p>
                ${actionButton ? actionButton : ''}
            </div>
        `;
    },

    // Loading overlay
    showLoading() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
    },

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.remove();
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
