/**
 * Also and Partners - Law Firm Management System
 * Authentication Module
 */

const Auth = {
    // Role hierarchy and permissions
    ROLES: {
        superadmin: {
            label: 'Super Admin',
            level: 6,
            color: '#8B5CF6',
            permissions: ['all']
        },
        owner: {
            label: 'Partners Owner',
            level: 5,
            color: '#D4AF37',
            permissions: ['manage_clients', 'manage_cases', 'manage_invoices', 'view_all', 'manage_documents']
        },
        partner: {
            label: 'Partners',
            level: 4,
            color: '#1E3A5F',
            permissions: ['manage_clients', 'manage_cases', 'manage_invoices', 'view_team', 'manage_documents']
        },
        senior: {
            label: 'Senior Associate',
            level: 3,
            color: '#10B981',
            permissions: ['view_assigned', 'update_cases', 'manage_documents', 'view_schedule']
        },
        associate: {
            label: 'Associate',
            level: 2,
            color: '#3B82F6',
            permissions: ['view_assigned', 'update_cases', 'manage_documents']
        },
        paralegal: {
            label: 'Paralegal',
            level: 1,
            color: '#6B7280',
            permissions: ['view_assigned', 'upload_documents']
        }
    },

    // Login
    login(username, password) {
        const users = DataManager.getUsers();
        const user = users.find(u => u.username === username && u.password === password && u.isActive);

        if (user) {
            const userData = { ...user };
            delete userData.password;
            DataManager.setCurrentUser(userData);
            return { success: true, user: userData };
        }

        return { success: false, message: 'Username atau password salah' };
    },

    // Logout
    logout() {
        DataManager.setCurrentUser(null);
        window.location.href = 'index.html';
    },

    // Check if logged in
    isLoggedIn() {
        return DataManager.getCurrentUser() !== null;
    },

    // Get current user
    getCurrentUser() {
        return DataManager.getCurrentUser();
    },

    // Check permission
    hasPermission(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;

        const role = this.ROLES[user.role];
        if (!role) return false;

        return role.permissions.includes('all') || role.permissions.includes(permission);
    },

    // Check if user has specific role
    hasRole(roles) {
        const user = this.getCurrentUser();
        if (!user) return false;

        if (typeof roles === 'string') {
            return user.role === roles;
        }

        return roles.includes(user.role);
    },

    // Check if user can manage clients
    canManageClients() {
        return this.hasRole(['superadmin', 'owner', 'partner']);
    },

    // Check if user can manage users
    canManageUsers() {
        return this.hasRole(['superadmin']);
    },

    // Check if user can manage firm settings
    canManageFirmSettings() {
        return this.hasRole(['superadmin']);
    },

    // Check if user can manage invoices
    canManageInvoices() {
        return this.hasRole(['superadmin', 'owner', 'partner']);
    },

    // Check if user can view all cases
    canViewAllCases() {
        return this.hasRole(['superadmin', 'owner', 'partner']);
    },

    // Get role info
    getRoleInfo(role) {
        return this.ROLES[role] || null;
    },

    // Get role label
    getRoleLabel(role) {
        return this.ROLES[role]?.label || role;
    },

    // Protect page - redirect if not logged in
    protectPage() {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    },

    // Protect page with role check
    protectPageWithRole(allowedRoles) {
        if (!this.protectPage()) return false;

        if (!this.hasRole(allowedRoles)) {
            window.location.href = 'dashboard.html';
            return false;
        }
        return true;
    },

    // Update current user password
    changePassword(currentPassword, newPassword) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'User tidak ditemukan' };

        const users = DataManager.getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);

        if (userIndex === -1) return { success: false, message: 'User tidak ditemukan' };
        if (users[userIndex].password !== currentPassword) {
            return { success: false, message: 'Password lama tidak sesuai' };
        }

        users[userIndex].password = newPassword;
        DataManager.setUsers(users);

        return { success: true, message: 'Password berhasil diubah' };
    },

    // Update current user profile
    updateProfile(updates) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'User tidak ditemukan' };

        const updatedUser = DataManager.updateUser(user.id, updates);
        if (updatedUser) {
            const userData = { ...updatedUser };
            delete userData.password;
            DataManager.setCurrentUser(userData);
            return { success: true, user: userData };
        }

        return { success: false, message: 'Gagal memperbarui profil' };
    }
};

// Check auth on page load (except login page)
document.addEventListener('DOMContentLoaded', () => {
    const isLoginPage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');

    if (!isLoginPage) {
        Auth.protectPage();
    }
});
