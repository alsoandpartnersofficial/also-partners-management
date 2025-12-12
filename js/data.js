/**
 * Also and Partners - Law Firm Management System
 * Data Management Module
 * Handles all data operations with localStorage
 */

const DataManager = {
    // Storage Keys
    KEYS: {
        FIRM_PROFILE: 'alsopartners_firm_profile',
        USERS: 'alsopartners_users',
        CLIENTS: 'alsopartners_clients',
        CASES: 'alsopartners_cases',
        SCHEDULES: 'alsopartners_schedules',
        DOCUMENTS: 'alsopartners_documents',
        INVOICES: 'alsopartners_invoices',
        PAYMENTS: 'alsopartners_payments',
        CURRENT_USER: 'alsopartners_current_user',
        THEME: 'alsopartners_theme'
    },

    // Initialize default data
    init() {
        if (!localStorage.getItem(this.KEYS.FIRM_PROFILE)) {
            this.setFirmProfile(this.getDefaultFirmProfile());
        }
        if (!localStorage.getItem(this.KEYS.USERS)) {
            this.setUsers(this.getDefaultUsers());
        }
        if (!localStorage.getItem(this.KEYS.CLIENTS)) {
            this.setClients(this.getDefaultClients());
        }
        if (!localStorage.getItem(this.KEYS.CASES)) {
            this.setCases(this.getDefaultCases());
        }
        if (!localStorage.getItem(this.KEYS.SCHEDULES)) {
            this.setSchedules(this.getDefaultSchedules());
        }
        if (!localStorage.getItem(this.KEYS.DOCUMENTS)) {
            this.setDocuments([]);
        }
        if (!localStorage.getItem(this.KEYS.INVOICES)) {
            this.setInvoices(this.getDefaultInvoices());
        }
        if (!localStorage.getItem(this.KEYS.PAYMENTS)) {
            this.setPayments([]);
        }
    },

    // Session Management
    getCurrentUser() {
        const data = localStorage.getItem(this.KEYS.CURRENT_USER);
        return data ? JSON.parse(data) : null;
    },

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.KEYS.CURRENT_USER);
        }
    },

    // ==================== FIRM PROFILE ====================
    getDefaultFirmProfile() {
        return {
            id: 'firm_001',
            firmName: 'Also and Partners',
            tagline: 'Advocates & Legal Consultants',
            logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTIiIGZpbGw9IiMxRTNBNUYiLz4KPHBhdGggZD0iTTI1IDc1VjMwTDUwIDIwTDc1IDMwVjc1IiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik01MCAyMFY1NSIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjQiLz4KPGNpcmNsZSBjeD0iNTAiIGN5PSI2NSIgcj0iOCIgZmlsbD0iI0Q0QUYzNyIvPgo8L3N2Zz4K',
            address: 'Gedung Hukum Lantai 15, Jl. Sudirman No. 123, Jakarta Pusat 10220',
            phone: '+62 21 5555 1234',
            email: 'contact@alsopartners.com',
            website: 'https://alsopartners.com',
            socialMedia: {
                linkedin: 'https://linkedin.com/company/alsopartners',
                instagram: 'https://instagram.com/alsopartners',
                facebook: 'https://facebook.com/alsopartners'
            },
            foundedYear: 2015,
            description: 'Also and Partners adalah firma hukum terkemuka yang menyediakan layanan hukum komprehensif dengan standar profesionalisme tinggi.',
            bankName: 'Bank Central Asia (BCA)',
            bankAccount: '123 456 7890',
            bankHolder: 'Also and Partners',
            updatedAt: new Date().toISOString()
        };
    },

    getFirmProfile() {
        const data = localStorage.getItem(this.KEYS.FIRM_PROFILE);
        return data ? JSON.parse(data) : this.getDefaultFirmProfile();
    },

    setFirmProfile(profile) {
        profile.updatedAt = new Date().toISOString();
        localStorage.setItem(this.KEYS.FIRM_PROFILE, JSON.stringify(profile));
    },

    // ==================== USERS ====================
    getDefaultUsers() {
        return [
            {
                id: 'user_001',
                username: 'superadmin',
                password: 'admin123',
                fullName: 'Administrator',
                email: 'admin@alsopartners.com',
                role: 'superadmin',
                phone: '+62 812 0000 0001',
                avatar: null,
                createdAt: '2024-01-01T00:00:00.000Z',
                isActive: true
            },
            {
                id: 'user_002',
                username: 'owner',
                password: 'owner123',
                fullName: 'Budi Santoso, S.H., M.H.',
                email: 'budi@alsopartners.com',
                role: 'owner',
                phone: '+62 812 0000 0002',
                avatar: null,
                createdAt: '2024-01-01T00:00:00.000Z',
                isActive: true
            },
            {
                id: 'user_003',
                username: 'partner',
                password: 'partner123',
                fullName: 'Siti Rahayu, S.H., LL.M.',
                email: 'siti@alsopartners.com',
                role: 'partner',
                phone: '+62 812 0000 0003',
                avatar: null,
                createdAt: '2024-01-02T00:00:00.000Z',
                isActive: true
            },
            {
                id: 'user_004',
                username: 'senior',
                password: 'senior123',
                fullName: 'Agus Wijaya, S.H.',
                email: 'agus@alsopartners.com',
                role: 'senior',
                phone: '+62 812 0000 0004',
                avatar: null,
                createdAt: '2024-01-03T00:00:00.000Z',
                isActive: true
            },
            {
                id: 'user_005',
                username: 'associate',
                password: 'associate123',
                fullName: 'Dewi Lestari, S.H.',
                email: 'dewi@alsopartners.com',
                role: 'associate',
                phone: '+62 812 0000 0005',
                avatar: null,
                createdAt: '2024-01-04T00:00:00.000Z',
                isActive: true
            },
            {
                id: 'user_006',
                username: 'paralegal',
                password: 'paralegal123',
                fullName: 'Rina Permata',
                email: 'rina@alsopartners.com',
                role: 'paralegal',
                phone: '+62 812 0000 0006',
                avatar: null,
                createdAt: '2024-01-05T00:00:00.000Z',
                isActive: true
            }
        ];
    },

    getUsers() {
        const data = localStorage.getItem(this.KEYS.USERS);
        return data ? JSON.parse(data) : [];
    },

    setUsers(users) {
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    getUserById(id) {
        return this.getUsers().find(u => u.id === id);
    },

    addUser(user) {
        const users = this.getUsers();
        user.id = 'user_' + Date.now();
        user.createdAt = new Date().toISOString();
        users.push(user);
        this.setUsers(users);
        return user;
    },

    updateUser(id, updates) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            this.setUsers(users);
            return users[index];
        }
        return null;
    },

    deleteUser(id) {
        const users = this.getUsers().filter(u => u.id !== id);
        this.setUsers(users);
    },

    // ==================== CLIENTS ====================
    getDefaultClients() {
        return [
            {
                id: 'client_001',
                name: 'PT. Maju Bersama',
                email: 'legal@majubersama.com',
                phone: '+62 21 1234 5678',
                address: 'Jl. Gatot Subroto No. 45, Jakarta Selatan',
                companyType: 'corporate',
                contactPerson: 'Ahmad Fauzi',
                createdBy: 'user_002',
                createdAt: '2024-01-15T00:00:00.000Z'
            },
            {
                id: 'client_002',
                name: 'CV. Teknologi Nusantara',
                email: 'info@teknusa.com',
                phone: '+62 21 9876 5432',
                address: 'Jl. Kuningan No. 88, Jakarta Selatan',
                companyType: 'corporate',
                contactPerson: 'Diana Putri',
                createdBy: 'user_003',
                createdAt: '2024-02-10T00:00:00.000Z'
            },
            {
                id: 'client_003',
                name: 'Robert Hartono',
                email: 'robert.h@email.com',
                phone: '+62 811 2233 4455',
                address: 'Jl. Menteng Raya No. 10, Jakarta Pusat',
                companyType: 'individual',
                contactPerson: 'Robert Hartono',
                createdBy: 'user_002',
                createdAt: '2024-03-05T00:00:00.000Z'
            }
        ];
    },

    getClients() {
        const data = localStorage.getItem(this.KEYS.CLIENTS);
        return data ? JSON.parse(data) : [];
    },

    setClients(clients) {
        localStorage.setItem(this.KEYS.CLIENTS, JSON.stringify(clients));
    },

    getClientById(id) {
        return this.getClients().find(c => c.id === id);
    },

    addClient(client) {
        const clients = this.getClients();
        client.id = 'client_' + Date.now();
        client.createdAt = new Date().toISOString();
        clients.push(client);
        this.setClients(clients);
        return client;
    },

    updateClient(id, updates) {
        const clients = this.getClients();
        const index = clients.findIndex(c => c.id === id);
        if (index !== -1) {
            clients[index] = { ...clients[index], ...updates };
            this.setClients(clients);
            return clients[index];
        }
        return null;
    },

    deleteClient(id) {
        const clients = this.getClients().filter(c => c.id !== id);
        this.setClients(clients);
    },

    // ==================== CASES ====================
    getDefaultCases() {
        return [
            {
                id: 'case_001',
                caseNumber: 'CASE-2024-001',
                title: 'Sengketa Kontrak Kerja Sama',
                description: 'Penanganan sengketa kontrak kerja sama antara klien dengan pihak ketiga terkait wanprestasi.',
                clientId: 'client_001',
                assignedLawyers: ['user_003', 'user_004'],
                status: 'in_progress',
                priority: 'high',
                caseType: 'corporate',
                startDate: '2024-06-01',
                deadline: '2024-12-31',
                progress: 45,
                notes: 'Sedang dalam proses mediasi',
                createdBy: 'user_002',
                createdAt: '2024-06-01T00:00:00.000Z',
                updatedAt: '2024-12-10T00:00:00.000Z'
            },
            {
                id: 'case_002',
                caseNumber: 'CASE-2024-002',
                title: 'Pembuatan Perjanjian Investasi',
                description: 'Penyusunan dan review perjanjian investasi untuk proyek pengembangan teknologi.',
                clientId: 'client_002',
                assignedLawyers: ['user_003'],
                status: 'open',
                priority: 'medium',
                caseType: 'corporate',
                startDate: '2024-08-15',
                deadline: '2024-12-20',
                progress: 70,
                notes: 'Draft final sedang direview',
                createdBy: 'user_003',
                createdAt: '2024-08-15T00:00:00.000Z',
                updatedAt: '2024-12-08T00:00:00.000Z'
            },
            {
                id: 'case_003',
                caseNumber: 'CASE-2024-003',
                title: 'Konsultasi Hukum Keluarga',
                description: 'Konsultasi dan pendampingan hukum terkait pembagian harta warisan.',
                clientId: 'client_003',
                assignedLawyers: ['user_004', 'user_005'],
                status: 'pending',
                priority: 'low',
                caseType: 'family',
                startDate: '2024-09-01',
                deadline: '2025-03-01',
                progress: 25,
                notes: 'Menunggu kelengkapan dokumen dari klien',
                createdBy: 'user_002',
                createdAt: '2024-09-01T00:00:00.000Z',
                updatedAt: '2024-11-20T00:00:00.000Z'
            }
        ];
    },

    getCases() {
        const data = localStorage.getItem(this.KEYS.CASES);
        return data ? JSON.parse(data) : [];
    },

    setCases(cases) {
        localStorage.setItem(this.KEYS.CASES, JSON.stringify(cases));
    },

    getCaseById(id) {
        return this.getCases().find(c => c.id === id);
    },

    addCase(caseData) {
        const cases = this.getCases();
        caseData.id = 'case_' + Date.now();
        caseData.caseNumber = this.generateCaseNumber();
        caseData.createdAt = new Date().toISOString();
        caseData.updatedAt = new Date().toISOString();
        cases.push(caseData);
        this.setCases(cases);
        return caseData;
    },

    updateCase(id, updates) {
        const cases = this.getCases();
        const index = cases.findIndex(c => c.id === id);
        if (index !== -1) {
            cases[index] = { ...cases[index], ...updates, updatedAt: new Date().toISOString() };
            this.setCases(cases);
            return cases[index];
        }
        return null;
    },

    deleteCase(id) {
        const cases = this.getCases().filter(c => c.id !== id);
        this.setCases(cases);
    },

    generateCaseNumber() {
        const year = new Date().getFullYear();
        const cases = this.getCases();
        const yearCases = cases.filter(c => c.caseNumber && c.caseNumber.includes(year.toString()));
        const nextNum = yearCases.length + 1;
        return `CASE-${year}-${String(nextNum).padStart(3, '0')}`;
    },

    // ==================== SCHEDULES ====================
    getDefaultSchedules() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return [
            {
                id: 'schedule_001',
                title: 'Sidang Perdana - Sengketa Kontrak',
                description: 'Sidang perdana untuk kasus CASE-2024-001',
                caseId: 'case_001',
                userId: 'user_003',
                eventType: 'hearing',
                startTime: tomorrow.toISOString(),
                endTime: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000).toISOString(),
                location: 'Pengadilan Negeri Jakarta Pusat',
                isCompleted: false
            },
            {
                id: 'schedule_002',
                title: 'Meeting dengan Klien',
                description: 'Pembahasan progress kasus dengan PT Maju Bersama',
                caseId: 'case_001',
                userId: 'user_003',
                eventType: 'meeting',
                startTime: nextWeek.toISOString(),
                endTime: new Date(nextWeek.getTime() + 1 * 60 * 60 * 1000).toISOString(),
                location: 'Kantor Also and Partners',
                isCompleted: false
            },
            {
                id: 'schedule_003',
                title: 'Deadline Pengumpulan Dokumen',
                description: 'Batas akhir pengumpulan dokumen pendukung',
                caseId: 'case_003',
                userId: 'user_004',
                eventType: 'deadline',
                startTime: nextWeek.toISOString(),
                endTime: nextWeek.toISOString(),
                location: '',
                isCompleted: false
            }
        ];
    },

    getSchedules() {
        const data = localStorage.getItem(this.KEYS.SCHEDULES);
        return data ? JSON.parse(data) : [];
    },

    setSchedules(schedules) {
        localStorage.setItem(this.KEYS.SCHEDULES, JSON.stringify(schedules));
    },

    getScheduleById(id) {
        return this.getSchedules().find(s => s.id === id);
    },

    addSchedule(schedule) {
        const schedules = this.getSchedules();
        schedule.id = 'schedule_' + Date.now();
        schedules.push(schedule);
        this.setSchedules(schedules);
        return schedule;
    },

    updateSchedule(id, updates) {
        const schedules = this.getSchedules();
        const index = schedules.findIndex(s => s.id === id);
        if (index !== -1) {
            schedules[index] = { ...schedules[index], ...updates };
            this.setSchedules(schedules);
            return schedules[index];
        }
        return null;
    },

    deleteSchedule(id) {
        const schedules = this.getSchedules().filter(s => s.id !== id);
        this.setSchedules(schedules);
    },

    // ==================== DOCUMENTS ====================
    getDocuments() {
        const data = localStorage.getItem(this.KEYS.DOCUMENTS);
        return data ? JSON.parse(data) : [];
    },

    setDocuments(documents) {
        localStorage.setItem(this.KEYS.DOCUMENTS, JSON.stringify(documents));
    },

    addDocument(document) {
        const documents = this.getDocuments();
        document.id = 'doc_' + Date.now();
        document.uploadedAt = new Date().toISOString();
        documents.push(document);
        this.setDocuments(documents);
        return document;
    },

    deleteDocument(id) {
        const documents = this.getDocuments().filter(d => d.id !== id);
        this.setDocuments(documents);
    },

    // ==================== INVOICES ====================
    getDefaultInvoices() {
        return [
            {
                id: 'inv_001',
                invoiceNumber: 'INV-2024-001',
                clientId: 'client_001',
                caseId: 'case_001',
                issueDate: '2024-12-01',
                dueDate: '2024-12-31',
                items: [
                    { description: 'Konsultasi Hukum', quantity: 5, unit: 'jam', unitPrice: 1500000, amount: 7500000 },
                    { description: 'Pembuatan Dokumen Legal', quantity: 2, unit: 'dokumen', unitPrice: 3000000, amount: 6000000 }
                ],
                subtotal: 13500000,
                taxRate: 11,
                taxAmount: 1485000,
                discount: 0,
                totalAmount: 14985000,
                status: 'partial',
                paidAmount: 7500000,
                paidDate: '2024-12-05',
                paymentMethod: 'transfer',
                notes: 'Pembayaran dapat dilakukan via transfer ke rekening BCA.',
                terms: 'Pembayaran dalam 30 hari dari tanggal invoice.',
                createdBy: 'user_002',
                createdAt: '2024-12-01T00:00:00.000Z',
                updatedAt: '2024-12-05T00:00:00.000Z'
            },
            {
                id: 'inv_002',
                invoiceNumber: 'INV-2024-002',
                clientId: 'client_002',
                caseId: 'case_002',
                issueDate: '2024-12-10',
                dueDate: '2025-01-10',
                items: [
                    { description: 'Review Perjanjian Investasi', quantity: 1, unit: 'dokumen', unitPrice: 10000000, amount: 10000000 },
                    { description: 'Konsultasi Legal', quantity: 3, unit: 'jam', unitPrice: 1500000, amount: 4500000 }
                ],
                subtotal: 14500000,
                taxRate: 11,
                taxAmount: 1595000,
                discount: 500000,
                totalAmount: 15595000,
                status: 'unpaid',
                paidAmount: 0,
                paidDate: null,
                paymentMethod: null,
                notes: 'Invoice untuk jasa legal bulan Desember 2024.',
                terms: 'Pembayaran dalam 30 hari dari tanggal invoice.',
                createdBy: 'user_003',
                createdAt: '2024-12-10T00:00:00.000Z',
                updatedAt: '2024-12-10T00:00:00.000Z'
            }
        ];
    },

    getInvoices() {
        const data = localStorage.getItem(this.KEYS.INVOICES);
        return data ? JSON.parse(data) : [];
    },

    setInvoices(invoices) {
        localStorage.setItem(this.KEYS.INVOICES, JSON.stringify(invoices));
    },

    getInvoiceById(id) {
        return this.getInvoices().find(i => i.id === id);
    },

    addInvoice(invoice) {
        const invoices = this.getInvoices();
        invoice.id = 'inv_' + Date.now();
        invoice.invoiceNumber = this.generateInvoiceNumber();
        invoice.createdAt = new Date().toISOString();
        invoice.updatedAt = new Date().toISOString();
        invoices.push(invoice);
        this.setInvoices(invoices);
        return invoice;
    },

    updateInvoice(id, updates) {
        const invoices = this.getInvoices();
        const index = invoices.findIndex(i => i.id === id);
        if (index !== -1) {
            invoices[index] = { ...invoices[index], ...updates, updatedAt: new Date().toISOString() };
            this.setInvoices(invoices);
            return invoices[index];
        }
        return null;
    },

    deleteInvoice(id) {
        const invoices = this.getInvoices().filter(i => i.id !== id);
        this.setInvoices(invoices);
    },

    generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const invoices = this.getInvoices();
        const yearInvoices = invoices.filter(i => i.invoiceNumber && i.invoiceNumber.includes(year.toString()));
        const nextNum = yearInvoices.length + 1;
        return `INV-${year}-${String(nextNum).padStart(3, '0')}`;
    },

    // ==================== PAYMENTS ====================
    getPayments() {
        const data = localStorage.getItem(this.KEYS.PAYMENTS);
        return data ? JSON.parse(data) : [];
    },

    setPayments(payments) {
        localStorage.setItem(this.KEYS.PAYMENTS, JSON.stringify(payments));
    },

    addPayment(payment) {
        const payments = this.getPayments();
        payment.id = 'payment_' + Date.now();
        payment.createdAt = new Date().toISOString();
        payments.push(payment);
        this.setPayments(payments);

        // Update invoice paid amount
        const invoice = this.getInvoiceById(payment.invoiceId);
        if (invoice) {
            const newPaidAmount = (invoice.paidAmount || 0) + payment.amount;
            let newStatus = 'partial';
            if (newPaidAmount >= invoice.totalAmount) {
                newStatus = 'paid';
            } else if (newPaidAmount === 0) {
                newStatus = 'unpaid';
            }
            this.updateInvoice(invoice.id, {
                paidAmount: newPaidAmount,
                status: newStatus,
                paidDate: payment.paymentDate,
                paymentMethod: payment.paymentMethod
            });
        }

        return payment;
    },

    // ==================== CURRENT USER ====================
    getCurrentUser() {
        const data = localStorage.getItem(this.KEYS.CURRENT_USER);
        return data ? JSON.parse(data) : null;
    },

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.KEYS.CURRENT_USER);
        }
    },

    // ==================== THEME ====================
    getTheme() {
        return localStorage.getItem(this.KEYS.THEME) || 'light';
    },

    setTheme(theme) {
        localStorage.setItem(this.KEYS.THEME, theme);
        document.documentElement.setAttribute('data-theme', theme);
    },

    // ==================== STATISTICS ====================
    getStatistics() {
        const cases = this.getCases();
        const clients = this.getClients();
        const invoices = this.getInvoices();
        const schedules = this.getSchedules();

        return {
            totalCases: cases.length,
            activeCases: cases.filter(c => c.status === 'in_progress' || c.status === 'open').length,
            completedCases: cases.filter(c => c.status === 'closed').length,
            totalClients: clients.length,
            totalInvoices: invoices.length,
            unpaidInvoices: invoices.filter(i => i.status === 'unpaid').length,
            totalRevenue: invoices.reduce((sum, i) => sum + i.totalAmount, 0),
            paidRevenue: invoices.reduce((sum, i) => sum + (i.paidAmount || 0), 0),
            pendingRevenue: invoices.reduce((sum, i) => sum + (i.totalAmount - (i.paidAmount || 0)), 0),
            upcomingEvents: schedules.filter(s => new Date(s.startTime) >= new Date() && !s.isCompleted).length
        };
    },

    // ==================== RESET DATA ====================
    resetAllData() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        this.init();
    }
};

// Initialize data on load
DataManager.init();
