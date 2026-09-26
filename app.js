/**
 * =========================================================================
 * APLIKASI BUKU INDUK & RAPOR K13 MODERN - FRONTEND MVC CORE ARCHITECTURE
 * =========================================================================
 * Version: 2.5.0 Modern Commercial Edition
 * Tech: Vanilla JS (Modular Controller-View-Model), SheetJS, CSS Variables
 */

const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbyFYIRceWKPE2rA2gD0xgbChgkx2ELFqF2OQUG1TVjVlo8a4H7tZL9MxZKx6b0xS_5u-Q/exec';

// ==========================================
// 1. MODEL & STORE (Centralized State)
// ==========================================
const Store = {
  // Current user role: 'TU' (Tata Usaha - Full CRUD) or 'KEPSEK' (Kepala Sekolah - Read/Approval)
  currentRole: 'TU',

  // Config & School Identity
  config: {
    school_name: 'SMP ISLAM TERPADU AL-IMAM',
    npsn: '20109988',
    nss: '202050101001',
    address: 'Jl. Raya Sunnah No. 12, Kel. Harapan Jaya, Kec. Sukamaju',
    city: 'Jakarta Timur',
    province: 'DKI Jakarta',
    postal_code: '13420',
    phone: '(021) 88997766',
    email: 'info@alimamischool.sch.id',
    website: 'https://alimamischool.com',
    logo_url: 'https://alimamischool.com/wp-content/uploads/2020/08/Al-Imam-Islamic-School-alimamischool.com-sekolah-sunnah-logo.png',
    headmaster_name: 'Dr. H. Muhammad Zulkarnain, M.Pd.',
    headmaster_nip: '19750812 200003 1 002',
    headmaster_signature_url: '',
    tu_admin_name: 'Ahmad Fauzi, S.Kom.',
    tu_admin_nip: '19880415 201201 1 004',
    academic_year: '2025/2026',
    active_semester: 'Ganjil',
    theme_preset: 'soft_green',
    gas_api_url: DEFAULT_GAS_URL
  },

  // Master Subjects (K13 & Muatan Lokal & Ekstrakurikuler)
  subjects: [
    { subject_code: 'PAI', subject_name: 'Pendidikan Agama Islam & Budi Pekerti', group_name: 'Kelompok A (Umum)', kkm: 75, sort_order: 1 },
    { subject_code: 'PPKN', subject_name: 'Pendidikan Pancasila dan Kewarganegaraan', group_name: 'Kelompok A (Umum)', kkm: 75, sort_order: 2 },
    { subject_code: 'BIN', subject_name: 'Bahasa Indonesia', group_name: 'Kelompok A (Umum)', kkm: 75, sort_order: 3 },
    { subject_code: 'MAT', subject_name: 'Matematika', group_name: 'Kelompok A (Umum)', kkm: 70, sort_order: 4 },
    { subject_code: 'IPA', subject_name: 'Ilmu Pengetahuan Alam', group_name: 'Kelompok A (Umum)', kkm: 72, sort_order: 5 },
    { subject_code: 'IPS', subject_name: 'Ilmu Pengetahuan Sosial', group_name: 'Kelompok A (Umum)', kkm: 75, sort_order: 6 },
    { subject_code: 'BIG', subject_name: 'Bahasa Inggris', group_name: 'Kelompok A (Umum)', kkm: 72, sort_order: 7 },
    { subject_code: 'SBK', subject_name: 'Seni Budaya', group_name: 'Kelompok B (Umum)', kkm: 75, sort_order: 8 },
    { subject_code: 'PJOK', subject_name: 'Pendidikan Jasmani, Olahraga, dan Kesehatan', group_name: 'Kelompok B (Umum)', kkm: 75, sort_order: 9 },
    { subject_code: 'PRA', subject_name: 'Prakarya', group_name: 'Kelompok B (Umum)', kkm: 75, sort_order: 10 },
    { subject_code: 'B_ARAB', subject_name: 'Bahasa Arab (Muatan Lokal)', group_name: 'Muatan Lokal', kkm: 75, sort_order: 11 },
    { subject_code: 'BTQ', subject_name: 'Baca Tulis Al-Qur\'an & Tahfidz', group_name: 'Muatan Lokal', kkm: 80, sort_order: 12 }
  ],

  // In-Memory Students List with rich seed data
  students: [
    {
      student_id: 'STD-2025001',
      nis: '252607001',
      nisn: '0098765432',
      full_name: 'MUHAMMAD FAYYADH AR-RASYID',
      nickname: 'Fayyadh',
      gender: 'L',
      birth_place: 'Jakarta',
      birth_date: '2011-05-14',
      religion: 'Islam',
      citizenship: 'WNI',
      child_order: 1,
      siblings_count: 3,
      address: 'Jl. Mawar Raya No. 45 RT 03/05',
      rt_rw: '03/05',
      village: 'Harapan Jaya',
      district: 'Sukamaju',
      regency: 'Jakarta Timur',
      province: 'DKI Jakarta',
      postal_code: '13420',
      phone: '081234567890',
      height: 158,
      weight: 48,
      blood_type: 'O',
      medical_notes: 'Tidak ada riwayat alergi berat',
      photo_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&h=400&fit=crop',
      current_class: 'VII-A',
      status: 'Aktif',
      parent: {
        father_name: 'Ir. H. Salman Faris',
        father_nik: '3175001205780001',
        father_birth: 'Bandung, 12-05-1978',
        father_edu: 'S1/D4',
        father_job: 'Karyawan BUMN',
        father_income: 'Rp 10.000.000 - Rp 20.000.000',
        father_phone: '081122334455',
        mother_name: 'Hj. Siti Aminah, S.Pd.',
        mother_nik: '3175004508800002',
        mother_birth: 'Jakarta, 15-08-1980',
        mother_edu: 'S1/D4',
        mother_job: 'Guru / PNS',
        mother_income: 'Rp 5.000.000 - Rp 10.000.000',
        mother_phone: '081199887766',
        guardian_name: '-',
        guardian_relation: '-',
        guardian_job: '-',
        guardian_address: '-',
        guardian_phone: '-'
      },
      history: {
        prev_school: 'SDIT Nurul Fikri Jakarta',
        prev_diploma_no: 'DN-01/D-SD/13/0012345',
        accepted_date: '2025-07-15',
        accepted_class: 'VII-A',
        scholarships: 'Beasiswa Prestasi Tahfidz Juz 30',
        mutation_out_date: '',
        mutation_out_reason: '',
        graduation_date: '',
        graduation_diploma_no: '',
        exam_number: '25-01-07-001'
      }
    },
    {
      student_id: 'STD-2025002',
      nis: '252607002',
      nisn: '0091234567',
      full_name: 'AISYAH AQILAH AZ-ZAHRA',
      nickname: 'Aisyah',
      gender: 'P',
      birth_place: 'Bekasi',
      birth_date: '2011-08-22',
      religion: 'Islam',
      citizenship: 'WNI',
      child_order: 2,
      siblings_count: 2,
      address: 'Komp. Bintara Jaya Blok B4 No. 12',
      rt_rw: '02/08',
      village: 'Bintara',
      district: 'Bekasi Barat',
      regency: 'Kota Bekasi',
      province: 'Jawa Barat',
      postal_code: '17134',
      phone: '081398765432',
      height: 152,
      weight: 42,
      blood_type: 'A',
      medical_notes: 'Asma ringan jika udara sangat dingin',
      photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop',
      current_class: 'VII-A',
      status: 'Aktif',
      parent: {
        father_name: 'Drs. Hendra Gunawan',
        father_nik: '3275002208750003',
        father_birth: 'Solo, 22-08-1975',
        father_edu: 'S2',
        father_job: 'Dosen Perguruan Tinggi',
        father_income: '> Rp 20.000.000',
        father_phone: '081211223344',
        mother_name: 'dr. Ratna Juwita, Sp.A',
        mother_nik: '3275001402770004',
        mother_birth: 'Yogyakarta, 14-02-1977',
        mother_edu: 'S2',
        mother_job: 'Dokter Spesialis Anak',
        mother_income: '> Rp 20.000.000',
        mother_phone: '081255667788',
        guardian_name: '-',
        guardian_relation: '-',
        guardian_job: '-',
        guardian_address: '-',
        guardian_phone: '-'
      },
      history: {
        prev_school: 'SD Al-Azhar 9 Kemang Pratama',
        prev_diploma_no: 'DN-02/D-SD/13/0088991',
        accepted_date: '2025-07-15',
        accepted_class: 'VII-A',
        scholarships: 'Juara 1 Olimpiade Sains Nasional Tingkat Kota',
        mutation_out_date: '',
        mutation_out_reason: '',
        graduation_date: '',
        graduation_diploma_no: '',
        exam_number: '25-01-07-002'
      }
    },
    {
      student_id: 'STD-2025003',
      nis: '252607003',
      nisn: '0095544332',
      full_name: 'ABDULLAH DZAKI AL-FATH',
      nickname: 'Dzaki',
      gender: 'L',
      birth_place: 'Depok',
      birth_date: '2011-03-10',
      religion: 'Islam',
      citizenship: 'WNI',
      child_order: 1,
      siblings_count: 1,
      address: 'Jl. Margonda Raya Gang Kamboja No. 8',
      rt_rw: '01/03',
      village: 'Pondok Cina',
      district: 'Beji',
      regency: 'Kota Depok',
      province: 'Jawa Barat',
      postal_code: '16424',
      phone: '081988776655',
      height: 160,
      weight: 50,
      blood_type: 'B',
      medical_notes: 'Sehat & Prima',
      photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop',
      current_class: 'VII-B',
      status: 'Aktif',
      parent: {
        father_name: 'Fikri Haikal, S.E.',
        father_nik: '3276001003760005',
        father_birth: 'Bogor, 10-03-1976',
        father_edu: 'S1/D4',
        father_job: 'Wiraswasta / Pengusaha Kuliner',
        father_income: 'Rp 10.000.000 - Rp 20.000.000',
        father_phone: '081344556677',
        mother_name: 'Nurul Hidayah, S.E.',
        mother_nik: '3276002511790006',
        mother_birth: 'Jakarta, 25-11-1979',
        mother_edu: 'S1/D4',
        mother_job: 'Ibu Rumah Tangga',
        mother_income: 'Tidak Berpenghasilan',
        mother_phone: '081377889900',
        guardian_name: '-',
        guardian_relation: '-',
        guardian_job: '-',
        guardian_address: '-',
        guardian_phone: '-'
      },
      history: {
        prev_school: 'SDIT Al-Qudwah Depok',
        prev_diploma_no: 'DN-02/D-SD/13/0077654',
        accepted_date: '2025-07-15',
        accepted_class: 'VII-B',
        scholarships: 'Prestasi Juara 2 Pidato Bahasa Arab',
        mutation_out_date: '',
        mutation_out_reason: '',
        graduation_date: '',
        graduation_diploma_no: '',
        exam_number: '25-01-07-003'
      }
    }
  ],

  // In-Memory Grades List
  grades: [
    // Student 1 (Fayyadh) - Semester 1
    { student_id: 'STD-2025001', subject_code: 'PAI', semester: 1, knowledge_score: 92, knowledge_pred: 'A', skill_score: 94, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'SB', final_exam_score: 93 },
    { student_id: 'STD-2025001', subject_code: 'PPKN', semester: 1, knowledge_score: 88, knowledge_pred: 'A', skill_score: 87, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'B', final_exam_score: 88 },
    { student_id: 'STD-2025001', subject_code: 'BIN', semester: 1, knowledge_score: 86, knowledge_pred: 'B', skill_score: 88, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'SB', final_exam_score: 87 },
    { student_id: 'STD-2025001', subject_code: 'MAT', semester: 1, knowledge_score: 90, knowledge_pred: 'A', skill_score: 88, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'B', final_exam_score: 89 },
    { student_id: 'STD-2025001', subject_code: 'IPA', semester: 1, knowledge_score: 85, knowledge_pred: 'B', skill_score: 86, skill_pred: 'B', spiritual_attitude: 'SB', social_attitude: 'B', final_exam_score: 86 },
    { student_id: 'STD-2025001', subject_code: 'IPS', semester: 1, knowledge_score: 87, knowledge_pred: 'A', skill_score: 89, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'SB', final_exam_score: 88 },
    { student_id: 'STD-2025001', subject_code: 'BIG', semester: 1, knowledge_score: 91, knowledge_pred: 'A', skill_score: 93, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'SB', final_exam_score: 92 },
    { student_id: 'STD-2025001', subject_code: 'SBK', semester: 1, knowledge_score: 85, knowledge_pred: 'B', skill_score: 87, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'B', final_exam_score: 86 },
    { student_id: 'STD-2025001', subject_code: 'PJOK', semester: 1, knowledge_score: 90, knowledge_pred: 'A', skill_score: 92, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'SB', final_exam_score: 91 },
    { student_id: 'STD-2025001', subject_code: 'PRA', semester: 1, knowledge_score: 88, knowledge_pred: 'A', skill_score: 88, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'B', final_exam_score: 88 },
    { student_id: 'STD-2025001', subject_code: 'B_ARAB', semester: 1, knowledge_score: 94, knowledge_pred: 'A', skill_score: 95, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'SB', final_exam_score: 95 },
    { student_id: 'STD-2025001', subject_code: 'BTQ', semester: 1, knowledge_score: 96, knowledge_pred: 'A', skill_score: 98, skill_pred: 'A', spiritual_attitude: 'SB', social_attitude: 'SB', final_exam_score: 97 }
  ],

  // Audits & Inspection logs
  audits: [
    {
      audit_id: 'AUD-1001',
      timestamp: '2025-10-10 09:30:00',
      auditor_name: 'Dr. H. Muhammad Zulkarnain, M.Pd.',
      auditor_role: 'Kepala Sekolah',
      action_type: 'Pemeriksaan Rutin Semester Ganjil',
      notes: 'Buku Induk Peserta Didik Baru Tahun Ajaran 2025/2026 telah terisi lengkap dengan pas foto 3x4 dan data orang tua terverifikasi.',
      approval_status: 'Approved'
    },
    {
      audit_id: 'AUD-1002',
      timestamp: '2025-12-20 14:00:00',
      auditor_name: 'Drs. H. Bambang Sudiro, M.M.',
      auditor_role: 'Pengawas Pembina Dinas Pendidikan',
      action_type: 'Monitoring & Evaluasi Administrasi Sekolah',
      notes: 'Format Buku Induk dan Transkrip Nilai telah sesuai dengan Regulasi Kurikulum Nasional dan K13. Sangat tertib dan rapi.',
      approval_status: 'Approved'
    }
  ],

  // Pagination & Filtering state
  tableFilter: {
    search: '',
    class: 'ALL',
    status: 'ALL',
    currentPage: 1,
    pageSize: 8
  },

  // Save to LocalStorage
  saveLocal() {
    try {
      localStorage.setItem('BUKU_INDUK_DATA_V2', JSON.stringify({
        config: this.config,
        students: this.students,
        grades: this.grades,
        audits: this.audits,
        currentRole: this.currentRole
      }));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  // Load from LocalStorage
  loadLocal() {
    try {
      const raw = localStorage.getItem('BUKU_INDUK_DATA_V2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.config) {
          this.config = { ...this.config, ...parsed.config };
          if (!this.config.gas_api_url || this.config.gas_api_url.includes('AKfycbysGjJilISZ2tk0')) {
            this.config.gas_api_url = DEFAULT_GAS_URL;
          }
        }
        if (parsed.students && parsed.students.length > 0) this.students = parsed.students;
        if (parsed.grades && parsed.grades.length > 0) this.grades = parsed.grades;
        if (parsed.audits && parsed.audits.length > 0) this.audits = parsed.audits;
        if (parsed.currentRole) this.currentRole = parsed.currentRole;
      } else {
        this.config.gas_api_url = DEFAULT_GAS_URL;
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    }
  }
};

// ==========================================
// API SERVICE (REST Client for GAS Backend)
// ==========================================
const ApiService = {
  cleanUrl(rawUrl) {
    if (!rawUrl) return '';
    let url = rawUrl.trim();
    // Convert /a/macros/domain/ to standard /macros/
    url = url.replace(/\/a\/macros\/[^\/]+\/s\//, '/macros/s/');
    return url;
  },

  async call(action, payload = {}, method = 'POST') {
    const url = this.cleanUrl(Store.config.gas_api_url);
    if (!url) return null;

    try {
      let response;
      if (method === 'GET') {
        const queryParams = new URLSearchParams({ action, ...payload });
        response = await fetch(`${url}?${queryParams.toString()}`);
      } else {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action, ...payload })
        });
      }
      return await response.json();
    } catch (err) {
      console.warn('GAS API Call error:', action, err);
      return { status: 'error', message: err.toString() };
    }
  },

  async fetchAll() {
    const url = this.cleanUrl(Store.config.gas_api_url);
    if (!url) return null;
    try {
      // First attempt single batch export
      const batchRes = await fetch(`${url}?action=exportAllData`).then(r => r.json()).catch(() => null);
      if (batchRes && batchRes.status === 'success' && batchRes.data) {
        return {
          resStudents: { status: 'success', data: batchRes.data.students || [] },
          resConfig: { status: 'success', data: batchRes.data.config || {} },
          resSubjects: { status: 'success', data: batchRes.data.subjects || [] },
          resAudits: { status: 'success', data: batchRes.data.audits || [] }
        };
      }

      // Fallback to separate endpoints
      const [resStudents, resConfig, resSubjects, resAudits] = await Promise.all([
        fetch(`${url}?action=getStudents`).then(r => r.json()).catch(() => null),
        fetch(`${url}?action=getConfig`).then(r => r.json()).catch(() => null),
        fetch(`${url}?action=getSubjects`).then(r => r.json()).catch(() => null),
        fetch(`${url}?action=getAudits`).then(r => r.json()).catch(() => null)
      ]);
      return { resStudents, resConfig, resSubjects, resAudits };
    } catch (err) {
      console.warn('Fetch all error:', err);
      return null;
    }
  }
};

// ==========================================
// 2. CONTROLLER (Main Application Logic)
// ==========================================
const App = {
  // Initialize App
  init() {
    Store.loadLocal();
    this.setupEventListeners();
    ThemeEngine.applyPreset(Store.config.theme_preset || 'soft_green');
    this.updateBrandingUI();
    this.updateRoleUI();
    this.renderDashboard();
    this.renderStudentsTable();
    this.populateStudentSelects();
    this.renderAuditsTable();
    this.loadSettingsForm();

    // Auto-sync with live Google Apps Script if URL is set
    if (Store.config.gas_api_url) {
      this.syncWithBackend(true);
    } else {
      this.setApiStatus(false, 'Demo Data Mode');
    }
  },

  // Event Listeners for Navigation & Global actions
  setupEventListeners() {
    // Navigation Items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const viewId = item.getAttribute('data-view');
        this.navigateTo(viewId);
      });
    });

    // Mobile Sidebar Toggle
    const menuBtn = document.getElementById('menuToggleBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        document.getElementById('appSidebar').classList.toggle('mobile-open');
      });
    }

    // Role Switcher Button
    const btnSwitchRole = document.getElementById('btnSwitchRole');
    if (btnSwitchRole) {
      btnSwitchRole.addEventListener('click', () => {
        this.toggleUserRole();
      });
    }

    // Global Search Input in Topbar
    const globalSearch = document.getElementById('globalSearchInput');
    if (globalSearch) {
      globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        Store.tableFilter.search = query;
        Store.tableFilter.currentPage = 1;
        document.getElementById('tableSearchInput').value = query;
        this.navigateTo('view-students');
        this.renderStudentsTable();
      });
    }

    // Table Search & Filter controls
    const tableSearch = document.getElementById('tableSearchInput');
    if (tableSearch) {
      tableSearch.addEventListener('input', (e) => {
        Store.tableFilter.search = e.target.value.trim();
        Store.tableFilter.currentPage = 1;
        this.renderStudentsTable();
      });
    }

    const filterClass = document.getElementById('filterClassSelect');
    if (filterClass) {
      filterClass.addEventListener('change', (e) => {
        Store.tableFilter.class = e.target.value;
        Store.tableFilter.currentPage = 1;
        this.renderStudentsTable();
      });
    }

    const filterStatus = document.getElementById('filterStatusSelect');
    if (filterStatus) {
      filterStatus.addEventListener('change', (e) => {
        Store.tableFilter.status = e.target.value;
        Store.tableFilter.currentPage = 1;
        this.renderStudentsTable();
      });
    }

    const btnReset = document.getElementById('btnResetFilter');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        Store.tableFilter.search = '';
        Store.tableFilter.class = 'ALL';
        Store.tableFilter.status = 'ALL';
        Store.tableFilter.currentPage = 1;
        document.getElementById('tableSearchInput').value = '';
        document.getElementById('filterClassSelect').value = 'ALL';
        document.getElementById('filterStatusSelect').value = 'ALL';
        this.renderStudentsTable();
      });
    }

    // Quick Add Button
    const btnQuickAdd = document.getElementById('btnQuickAdd');
    if (btnQuickAdd) {
      btnQuickAdd.addEventListener('click', () => {
        this.openWizardForCreate();
      });
    }

    // Export Excel Button
    const btnExportExcel = document.getElementById('btnExportExcel');
    if (btnExportExcel) {
      btnExportExcel.addEventListener('click', () => {
        this.exportStudentsToExcel();
      });
    }

    // Import Excel Modal Trigger
    const btnImportModal = document.getElementById('btnImportExcelModal');
    if (btnImportModal) {
      btnImportModal.addEventListener('click', () => {
        this.openModal('modalImportExcel');
      });
    }

    // Photo input change handler in Wizard
    const photoInput = document.getElementById('wizardPhotoInput');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        Wizard.handlePhotoUpload(e);
      });
    }

    const btnDefaultAvatar = document.getElementById('btnPhotoDefaultAvatar');
    if (btnDefaultAvatar) {
      btnDefaultAvatar.addEventListener('click', () => {
        const gender = document.getElementById('formGender').value;
        const avatarUrl = gender === 'P'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop'
          : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop';
        Wizard.setPhotoPreview(avatarUrl);
      });
    }
  },

  // View Navigation Switcher
  navigateTo(viewId) {
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      }
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close mobile sidebar
    document.getElementById('appSidebar').classList.remove('mobile-open');

    // Trigger specific page refresh hooks
    if (viewId === 'view-dashboard') this.renderDashboard();
    if (viewId === 'view-students') this.renderStudentsTable();
    if (viewId === 'view-grades') {
      this.populateStudentSelects();
      GradesModule.renderGradesMatrix();
    }
    if (viewId === 'view-print') {
      this.populateStudentSelects();
      PrintEngine.renderSelectedDocument();
    }
    if (viewId === 'view-audit') this.renderAuditsTable();
    if (viewId === 'view-settings') this.loadSettingsForm();
  },

  // Toggle User Role (Kepsek vs TU)
  toggleUserRole() {
    Store.currentRole = Store.currentRole === 'TU' ? 'KEPSEK' : 'TU';
    Store.saveLocal();
    this.updateRoleUI();
    this.showToast('Mode Pengguna dialihkan ke: ' + (Store.currentRole === 'KEPSEK' ? 'Kepala Sekolah' : 'Tata Usaha (Full CRUD)'), 'info');
  },

  // Update UI Elements based on Role
  updateRoleUI() {
    const isKepsek = Store.currentRole === 'KEPSEK';
    const roleText = document.getElementById('currentRoleText');
    if (roleText) {
      roleText.textContent = isKepsek ? 'Kepala Sekolah (Approval)' : 'Tata Usaha (Full)';
      roleText.style.color = isKepsek ? '#2E4036' : '#10B981';
    }

    // Hide or disable CRUD buttons in Kepsek mode
    const crudElements = [
      document.getElementById('btnQuickAdd'),
      document.getElementById('navAddStudent'),
      document.getElementById('btnImportExcelModal'),
      document.getElementById('btnSaveGradesMatrix')
    ];

    crudElements.forEach(el => {
      if (el) {
        el.style.opacity = isKepsek ? '0.5' : '1';
        el.style.pointerEvents = isKepsek ? 'none' : 'auto';
        if (isKepsek) {
          el.setAttribute('title', 'Fitur dikunci dalam Mode Kepala Sekolah (Read-Only)');
        } else {
          el.removeAttribute('title');
        }
      }
    });

    this.renderStudentsTable();
  },

  // Update School Branding in Sidebar & Header
  updateBrandingUI() {
    const logoImg = document.getElementById('sidebarLogo');
    if (logoImg && Store.config.logo_url) logoImg.src = Store.config.logo_url;

    const schoolNameEl = document.getElementById('sidebarSchoolName');
    if (schoolNameEl) schoolNameEl.textContent = Store.config.school_name || 'SMP BUKU INDUK';

    const npsnEl = document.getElementById('sidebarNpsn');
    if (npsnEl) npsnEl.textContent = 'NPSN: ' + (Store.config.npsn || '-');

    const academicYearEl = document.getElementById('headerAcademicYear');
    if (academicYearEl) {
      academicYearEl.textContent = `TP: ${Store.config.academic_year || '2025/2026'} (${Store.config.active_semester || 'Ganjil'})`;
    }
  },

  // Set API Connection Status Badge
  setApiStatus(isOnline, label) {
    const dot = document.getElementById('statusDot');
    const labelEl = document.getElementById('apiStatusLabel');
    if (dot) {
      dot.className = isOnline ? 'status-dot' : 'status-dot offline';
    }
    if (labelEl) {
      labelEl.textContent = label;
    }
  },

  // Test GAS Web App API Connection
  async testApiConnection(silent = false) {
    const url = Store.config.gas_api_url;
    if (!url) {
      if (!silent) this.showToast('Masukkan URL Google Apps Script Web App terlebih dahulu!', 'warning');
      this.setApiStatus(false, 'Demo Data Mode');
      return;
    }

    try {
      this.setApiStatus(false, 'Menghubungkan...');
      const res = await fetch(`${url}?action=ping`, { method: 'GET' });
      const json = await res.json();
      if (json && json.status === 'success') {
        this.setApiStatus(true, 'Google Sheets Online');
        if (!silent) this.showToast('Koneksi Google Apps Script Berhasil & Aktif!', 'success');
        this.syncWithBackend(silent);
      } else {
        throw new Error('Respon tidak valid');
      }
    } catch (err) {
      this.setApiStatus(false, 'GAS Offline (Demo Mode)');
      if (!silent) this.showToast('Gagal menghubungi GAS Web App. Memakai data lokal.', 'warning');
    }
  },

  // Switch explicitly to Demo Data Mode
  useDemoDataMode() {
    Store.config.gas_api_url = '';
    Store.saveLocal();
    document.getElementById('cfgGasApiUrl').value = '';
    this.setApiStatus(false, 'Demo Data Mode');
    this.showToast('Beralih ke Demo Data Mode (LocalStorage)', 'info');
  },

  // Sync Data with Google Apps Script Backend
  async syncWithBackend(silent = false) {
    if (!Store.config.gas_api_url) {
      if (!silent) this.showToast('Data telah tersinkron dengan penyimpanan lokal (Demo Mode).', 'info');
      this.renderDashboard();
      this.renderStudentsTable();
      return;
    }

    try {
      if (!silent) this.showToast('Menghubungkan & menyinkronkan data Google Sheets...', 'info');
      this.setApiStatus(false, 'Sinkronisasi...');

      const result = await ApiService.fetchAll();
      if (result) {
        let hasData = false;
        if (result.resStudents && result.resStudents.status === 'success' && Array.isArray(result.resStudents.data)) {
          if (result.resStudents.data.length > 0) {
            Store.students = result.resStudents.data;
          }
          hasData = true;
        }
        if (result.resConfig && result.resConfig.status === 'success' && result.resConfig.data) {
          Store.config = { ...Store.config, ...result.resConfig.data };
          if (!Store.config.gas_api_url) Store.config.gas_api_url = DEFAULT_GAS_URL;
        }
        if (result.resSubjects && result.resSubjects.status === 'success' && Array.isArray(result.resSubjects.data) && result.resSubjects.data.length > 0) {
          Store.subjects = result.resSubjects.data;
        }
        if (result.resAudits && result.resAudits.status === 'success' && Array.isArray(result.resAudits.data) && result.resAudits.data.length > 0) {
          Store.audits = result.resAudits.data;
        }

        Store.saveLocal();
        this.setApiStatus(true, 'Google Sheets Online');
        this.updateBrandingUI();
        this.renderDashboard();
        this.renderStudentsTable();
        this.populateStudentSelects();
        this.renderAuditsTable();
        this.loadSettingsForm();

        if (!silent) this.showToast('Berhasil sinkron dengan database Google Sheets!', 'success');
      } else {
        throw new Error('Respon tidak valid');
      }
    } catch (err) {
      this.setApiStatus(false, 'GAS Offline (Demo Mode)');
      if (!silent) this.showToast('Gagal sinkron dengan Google Sheets. Memakai data lokal.', 'warning');
    }
  },

  // ==========================================
  // DASHBOARD RENDERER
  // ==========================================
  renderDashboard() {
    const students = Store.students;
    const total = students.length;
    let male = 0;
    let female = 0;
    let active = 0;
    let mutasi = 0;
    let alumni = 0;

    const classCounts = {
      'VII-A': 0, 'VII-B': 0,
      'VIII-A': 0, 'VIII-B': 0,
      'IX-A': 0, 'IX-B': 0
    };

    students.forEach(s => {
      if (s.gender === 'L') male++;
      if (s.gender === 'P') female++;

      const st = (s.status || '').toLowerCase();
      if (st === 'aktif') active++;
      else if (st === 'mutasi') mutasi++;
      else if (st === 'alumni') alumni++;
      else active++;

      const cls = s.current_class;
      if (classCounts[cls] !== undefined) {
        classCounts[cls]++;
      } else {
        classCounts[cls] = (classCounts[cls] || 0) + 1;
      }
    });

    // Update Stat Cards
    const totalEl = document.getElementById('statTotalStudents');
    if (totalEl) totalEl.textContent = total;

    const genderEl = document.getElementById('statGenderRatio');
    if (genderEl) genderEl.textContent = `${male} L / ${female} P`;

    const activeEl = document.getElementById('statActiveStudents');
    if (activeEl) activeEl.textContent = active;

    const mutasiEl = document.getElementById('statMutasiAlumni');
    if (mutasiEl) mutasiEl.textContent = `${mutasi} / ${alumni}`;

    // Render Class Breakdown Bars
    const barsContainer = document.getElementById('classDistributionBars');
    if (barsContainer) {
      barsContainer.innerHTML = '';
      const classes = Object.keys(classCounts);
      const maxCount = Math.max(...Object.values(classCounts), 1);

      classes.forEach(cls => {
        const count = classCounts[cls];
        const pct = Math.round((count / maxCount) * 100);
        const barItem = document.createElement('div');
        barItem.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
            <span>${cls}</span>
            <span>${count} Siswa (${total > 0 ? Math.round((count / total) * 100) : 0}%)</span>
          </div>
          <div style="height: 10px; background: var(--secondary-light); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: var(--primary); border-radius: var(--radius-full); transition: width 0.5s ease;"></div>
          </div>
        `;
        barsContainer.appendChild(barItem);
      });
    }

    // Last Audit Info
    if (Store.audits.length > 0) {
      const lastAudit = Store.audits[Store.audits.length - 1];
      const noteEl = document.getElementById('dashLastAuditNote');
      const dateEl = document.getElementById('dashLastAuditDate');
      const statusEl = document.getElementById('dashLastAuditStatus');
      if (noteEl) noteEl.textContent = lastAudit.notes;
      if (dateEl) dateEl.textContent = `Pemeriksa: ${lastAudit.auditor_name} (${lastAudit.timestamp.split(' ')[0]})`;
      if (statusEl) statusEl.textContent = lastAudit.approval_status;
    }
  },

  // ==========================================
  // STUDENTS TABLE RENDERER & PAGINATION
  // ==========================================
  renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;

    let filtered = Store.students.slice();

    // Search filter
    if (Store.tableFilter.search) {
      const q = Store.tableFilter.search.toLowerCase();
      filtered = filtered.filter(s =>
        (s.full_name && s.full_name.toLowerCase().includes(q)) ||
        (s.nis && String(s.nis).toLowerCase().includes(q)) ||
        (s.nisn && String(s.nisn).toLowerCase().includes(q)) ||
        (s.nickname && s.nickname.toLowerCase().includes(q))
      );
    }

    // Class filter
    if (Store.tableFilter.class && Store.tableFilter.class !== 'ALL') {
      filtered = filtered.filter(s => s.current_class === Store.tableFilter.class);
    }

    // Status filter
    if (Store.tableFilter.status && Store.tableFilter.status !== 'ALL') {
      filtered = filtered.filter(s => s.status === Store.tableFilter.status);
    }

    const totalFiltered = filtered.length;
    const pageSize = Store.tableFilter.pageSize;
    const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
    const currentPage = Math.min(Store.tableFilter.currentPage, totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const pagedStudents = filtered.slice(startIndex, startIndex + pageSize);

    // Update Pagination Text
    const infoEl = document.getElementById('tablePaginationInfo');
    if (infoEl) {
      infoEl.textContent = `Menampilkan ${totalFiltered > 0 ? startIndex + 1 : 0} - ${Math.min(startIndex + pageSize, totalFiltered)} dari ${totalFiltered} siswa`;
    }

    // Render Table Rows
    tbody.innerHTML = '';
    if (pagedStudents.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 36px; color: #8C9B90;">
            <i class="fa-solid fa-user-slash" style="font-size: 28px; margin-bottom: 8px; display: block;"></i>
            Tidak ada data siswa yang cocok dengan filter.
          </td>
        </tr>
      `;
    } else {
      pagedStudents.forEach(s => {
        const isKepsek = Store.currentRole === 'KEPSEK';
        const tr = document.createElement('tr');
        const photo = s.photo_url || (s.gender === 'P'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=140&fit=crop'
          : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=140&fit=crop');

        let statusBadge = '<span class="badge badge-success">Aktif</span>';
        if (s.status === 'Mutasi') statusBadge = '<span class="badge badge-warning">Mutasi</span>';
        if (s.status === 'Alumni') statusBadge = '<span class="badge badge-secondary">Alumni</span>';

        const fatherName = (s.parent && s.parent.father_name) ? s.parent.father_name : '-';

        tr.innerHTML = `
          <td style="text-align: center;">
            <img src="${photo}" alt="Foto" class="student-avatar">
          </td>
          <td>
            <div style="font-weight: 700; color: var(--dark);">${s.nis || '-'}</div>
            <div style="font-size: 11px; color: #8C9B90;">NISN: ${s.nisn || '-'}</div>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--dark); font-size: 13.5px;">${s.full_name}</div>
            <div style="font-size: 11.5px; color: var(--dark-soft);">${s.birth_place || '-'}, ${s.birth_date || '-'}</div>
          </td>
          <td style="text-align: center;">
            <span class="badge ${s.gender === 'L' ? 'badge-info' : 'badge-warning'}">${s.gender}</span>
          </td>
          <td>
            <span class="badge badge-secondary">${s.current_class}</span>
          </td>
          <td>${fatherName}</td>
          <td>${statusBadge}</td>
          <td style="text-align: center;">
            <div style="display: flex; gap: 6px; justify-content: center;">
              <button class="btn btn-sm btn-outline" onclick="App.viewStudentDetail('${s.student_id}')" title="Lihat Detail Biodata">
                <i class="fa-solid fa-eye"></i>
              </button>
              ${!isKepsek ? `
                <button class="btn btn-sm btn-outline" onclick="App.openWizardForEdit('${s.student_id}')" title="Edit Data">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn btn-sm btn-outline" onclick="App.deleteStudent('${s.student_id}')" style="color: var(--danger);" title="Hapus Siswa">
                  <i class="fa-solid fa-trash"></i>
                </button>
              ` : `
                <button class="btn btn-sm btn-outline" onclick="App.directPrintStudent('${s.student_id}')" title="Cetak Dokumen">
                  <i class="fa-solid fa-print"></i>
                </button>
              `}
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Render Pagination Controls
    const paginationContainer = document.getElementById('paginationButtons');
    if (paginationContainer) {
      paginationContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline'}`;
        btn.textContent = i;
        btn.onclick = () => {
          Store.tableFilter.currentPage = i;
          this.renderStudentsTable();
        };
        paginationContainer.appendChild(btn);
      }
    }
  },

  // Populate Student Dropdown selectors in Grades & Print views
  populateStudentSelects() {
    const selects = [
      document.getElementById('gradesStudentSelect'),
      document.getElementById('printStudentSelect')
    ];

    selects.forEach(select => {
      if (!select) return;
      const currentVal = select.value;
      select.innerHTML = '';
      Store.students.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.student_id;
        opt.textContent = `${s.current_class} - ${s.nis || ''} - ${s.full_name}`;
        select.appendChild(opt);
      });

      if (currentVal && Store.students.find(s => s.student_id === currentVal)) {
        select.value = currentVal;
      }
    });
  },

  // Open Wizard to create student
  openWizardForCreate() {
    if (Store.currentRole === 'KEPSEK') {
      this.showToast('Mode Kepala Sekolah tidak memiliki hak akses penambahan data siswa.', 'warning');
      return;
    }
    Wizard.resetForm();
    document.getElementById('wizardTitle').textContent = 'Pendaftaran Siswa Baru (Buku Induk)';
    this.navigateTo('view-wizard');
  },

  // Open Wizard to edit existing student
  openWizardForEdit(studentId) {
    const student = Store.students.find(s => s.student_id === studentId);
    if (!student) return;
    Wizard.fillForm(student);
    document.getElementById('wizardTitle').textContent = `Edit Buku Induk: ${student.full_name}`;
    this.navigateTo('view-wizard');
  },

  // View Student Full Biodata in Modal
  viewStudentDetail(studentId) {
    const student = Store.students.find(s => s.student_id === studentId);
    if (!student) return;

    const modalBody = document.getElementById('detailModalBody');
    const titleEl = document.getElementById('detailModalTitle');
    if (titleEl) titleEl.textContent = `Biodata Siswa: ${student.full_name} (${student.nis || '-'})`;

    const photo = student.photo_url || (student.gender === 'P'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop'
      : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop');

    const p = student.parent || {};
    const h = student.history || {};

    modalBody.innerHTML = `
      <div style="display: flex; gap: 24px; margin-bottom: 24px; align-items: flex-start;">
        <div class="photo-3x4-box" style="width: 120px; height: 160px; flex-shrink: 0;">
          <img src="${photo}" alt="Foto Siswa">
        </div>
        <div style="flex: 1;">
          <h2 style="font-size: 18px; color: var(--dark);">${student.full_name}</h2>
          <div style="font-size: 13px; color: var(--dark-soft); margin-top: 4px;">
            NIS: <b>${student.nis || '-'}</b> | NISN: <b>${student.nisn || '-'}</b> | Kelas: <b>${student.current_class}</b>
          </div>
          <div style="margin-top: 10px; display: flex; gap: 8px;">
            <span class="badge ${student.gender === 'L' ? 'badge-info' : 'badge-warning'}">JK: ${student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
            <span class="badge badge-success">Status: ${student.status}</span>
            <span class="badge badge-secondary">Agama: ${student.religion || 'Islam'}</span>
          </div>
          <p style="font-size: 12.5px; color: var(--dark-soft); margin-top: 12px; line-height: 1.5;">
            <i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> ${student.address || '-'}, RT ${student.rt_rw || '-'}, Kel. ${student.village || '-'}, Kec. ${student.district || '-'}, ${student.regency || '-'}
          </p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
        <div style="background: var(--light-bg); padding: 16px; border-radius: var(--radius-md);">
          <div style="font-weight: 700; font-size: 13.5px; margin-bottom: 8px; color: var(--primary-hover);">
            <i class="fa-solid fa-user-tie"></i> Data Orang Tua Kandung
          </div>
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--dark);">
            <div><b>Ayah:</b> ${p.father_name || '-'} (${p.father_job || '-'})</div>
            <div><b>Pendidikan Ayah:</b> ${p.father_edu || '-'}</div>
            <div><b>Penghasilan Ayah:</b> ${p.father_income || '-'}</div>
            <div style="margin-top: 6px;"><b>Ibu:</b> ${p.mother_name || '-'} (${p.mother_job || '-'})</div>
            <div><b>Pendidikan Ibu:</b> ${p.mother_edu || '-'}</div>
            <div><b>No Telp Ortu:</b> ${p.father_phone || p.mother_phone || '-'}</div>
          </div>
        </div>

        <div style="background: var(--light-bg); padding: 16px; border-radius: var(--radius-md);">
          <div style="font-weight: 700; font-size: 13.5px; margin-bottom: 8px; color: var(--primary-hover);">
            <i class="fa-solid fa-graduation-cap"></i> Riwayat Pendidikan & Beasiswa
          </div>
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--dark);">
            <div><b>Sekolah Asal (SD/MI):</b> ${h.prev_school || '-'}</div>
            <div><b>No. Ijazah SD:</b> ${h.prev_diploma_no || '-'}</div>
            <div><b>Diterima Tgl:</b> ${h.accepted_date || '-'} di ${h.accepted_class || '-'}</div>
            <div><b>Beasiswa/Prestasi:</b> ${h.scholarships || '-'}</div>
            <div><b>No. Peserta Ujian:</b> ${h.exam_number || '-'}</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnDetailPrintDirect').onclick = () => {
      this.closeModal('modalStudentDetail');
      this.directPrintStudent(studentId);
    };

    this.openModal('modalStudentDetail');
  },

  // Delete Student
  deleteStudent(studentId) {
    if (Store.currentRole === 'KEPSEK') return;
    const student = Store.students.find(s => s.student_id === studentId);
    if (!student) return;

    if (confirm(`Apakah Anda yakin ingin menghapus data buku induk ${student.full_name} (${student.nis})?`)) {
      Store.students = Store.students.filter(s => s.student_id !== studentId);
      Store.grades = Store.grades.filter(g => g.student_id !== studentId);
      Store.saveLocal();
      this.renderDashboard();
      this.renderStudentsTable();
      this.populateStudentSelects();
      this.showToast('Data siswa berhasil dihapus!', 'success');

      // Sync deletion with GAS in background
      if (Store.config.gas_api_url) {
        ApiService.call('deleteStudent', { studentId: studentId });
      }
    }
  },

  // Jump to Print View for specific student
  directPrintStudent(studentId) {
    document.getElementById('printDocTypeSelect').value = 'biodata_siswa';
    document.getElementById('printStudentSelect').value = studentId;
    this.navigateTo('view-print');
  },

  // Print Transkrip for active student
  printActiveStudentGrades() {
    const studentId = document.getElementById('gradesStudentSelect').value;
    document.getElementById('printDocTypeSelect').value = 'transkrip_nilai';
    document.getElementById('printStudentSelect').value = studentId;
    this.navigateTo('view-print');
  },

  // Export Data to Excel (.xlsx) using SheetJS
  exportStudentsToExcel() {
    try {
      const dataRows = Store.students.map((s, idx) => ({
        'No': idx + 1,
        'ID Siswa': s.student_id,
        'NIS': s.nis || '',
        'NISN': s.nisn || '',
        'Nama Lengkap': s.full_name,
        'Nama Panggilan': s.nickname || '',
        'JK': s.gender,
        'Tempat Lahir': s.birth_place || '',
        'Tanggal Lahir': s.birth_date || '',
        'Agama': s.religion || '',
        'Kewarganegaraan': s.citizenship || '',
        'Anak Ke': s.child_order || 1,
        'Jml Saudara': s.siblings_count || 0,
        'Alamat Lengkap': s.address || '',
        'RT/RW': s.rt_rw || '',
        'Kelurahan': s.village || '',
        'Kecamatan': s.district || '',
        'Kota/Kab': s.regency || '',
        'Provinsi': s.province || '',
        'Kode Pos': s.postal_code || '',
        'No Telepon': s.phone || '',
        'Tinggi Badan (cm)': s.height || '',
        'Berat Badan (kg)': s.weight || '',
        'Gol Darah': s.blood_type || '',
        'Kelas': s.current_class,
        'Status': s.status,
        'Nama Ayah': s.parent ? s.parent.father_name : '',
        'NIK Ayah': s.parent ? s.parent.father_nik : '',
        'Pendidikan Ayah': s.parent ? s.parent.father_edu : '',
        'Pekerjaan Ayah': s.parent ? s.parent.father_job : '',
        'Penghasilan Ayah': s.parent ? s.parent.father_income : '',
        'No HP Ayah': s.parent ? s.parent.father_phone : '',
        'Nama Ibu': s.parent ? s.parent.mother_name : '',
        'NIK Ibu': s.parent ? s.parent.mother_nik : '',
        'Pendidikan Ibu': s.parent ? s.parent.mother_edu : '',
        'Pekerjaan Ibu': s.parent ? s.parent.mother_job : '',
        'Penghasilan Ibu': s.parent ? s.parent.mother_income : '',
        'No HP Ibu': s.parent ? s.parent.mother_phone : '',
        'Sekolah Asal': s.history ? s.history.prev_school : '',
        'No Ijazah Asal': s.history ? s.history.prev_diploma_no : '',
        'Tgl Diterima': s.history ? s.history.accepted_date : '',
        'Diterima di Kelas': s.history ? s.history.accepted_class : '',
        'Riwayat Beasiswa': s.history ? s.history.scholarships : ''
      }));

      const ws = XLSX.utils.json_to_sheet(dataRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Master Data Siswa');

      const fileName = `Buku_Induk_Siswa_${Store.config.school_name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, fileName);
      this.showToast('Berkas Excel Buku Induk berhasil diunduh!', 'success');
    } catch (err) {
      this.showToast('Gagal mengekspor Excel: ' + err.message, 'error');
    }
  },

  // Download Excel Import Template
  downloadExcelTemplate() {
    const templateRows = [
      {
        'NIS': '252607004',
        'NISN': '0091122334',
        'Nama Lengkap': 'FATIMAH AZ-ZAHRA',
        'Nama Panggilan': 'Fatimah',
        'JK (L/P)': 'P',
        'Tempat Lahir': 'Jakarta',
        'Tanggal Lahir (YYYY-MM-DD)': '2011-06-15',
        'Agama': 'Islam',
        'Alamat': 'Jl. Melati No. 10',
        'Kelas': 'VII-A',
        'Status': 'Aktif',
        'Nama Ayah': 'H. Abdullah',
        'Pekerjaan Ayah': 'Wiraswasta',
        'Nama Ibu': 'Hj. Mariam',
        'Pekerjaan Ibu': 'Guru',
        'No Telp': '081234567890',
        'Sekolah Asal': 'SDIT Al-Hikmah'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Impor');
    XLSX.writeFile(wb, 'Template_Impor_Buku_Induk_Siswa.xlsx');
  },

  // Selected Excel file for import
  importedExcelData: null,

  handleExcelFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    document.getElementById('selectedExcelFileName').textContent = file.name;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.importedExcelData = XLSX.utils.sheet_to_json(worksheet);

        document.getElementById('btnExecuteImport').disabled = false;
        this.showToast(`Berkas siap. Ditemukan ${this.importedExcelData.length} baris data.`, 'info');
      } catch (err) {
        this.showToast('Format berkas tidak dapat dibaca: ' + err.message, 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  },

  executeExcelImport() {
    if (!this.importedExcelData || this.importedExcelData.length === 0) {
      this.showToast('Data impor kosong!', 'warning');
      return;
    }

    let importedCount = 0;
    this.importedExcelData.forEach((row, idx) => {
      const studentId = 'STD-' + new Date().getFullYear() + ('000' + (Store.students.length + idx + 1)).slice(-4);
      const newStudent = {
        student_id: studentId,
        nis: row['NIS'] ? String(row['NIS']) : '',
        nisn: row['NISN'] ? String(row['NISN']) : '',
        full_name: row['Nama Lengkap'] || 'Siswa ' + (idx + 1),
        nickname: row['Nama Panggilan'] || '',
        gender: (row['JK (L/P)'] || row['JK'] || 'L').toUpperCase().startsWith('P') ? 'P' : 'L',
        birth_place: row['Tempat Lahir'] || '',
        birth_date: row['Tanggal Lahir (YYYY-MM-DD)'] || row['Tanggal Lahir'] || '',
        religion: row['Agama'] || 'Islam',
        citizenship: 'WNI',
        child_order: 1,
        siblings_count: 0,
        address: row['Alamat'] || '',
        rt_rw: '',
        village: '',
        district: '',
        regency: '',
        province: 'DKI Jakarta',
        postal_code: '',
        phone: row['No Telp'] ? String(row['No Telp']) : '',
        height: 155,
        weight: 45,
        blood_type: 'O',
        medical_notes: '',
        photo_url: '',
        current_class: row['Kelas'] || 'VII-A',
        status: row['Status'] || 'Aktif',
        parent: {
          father_name: row['Nama Ayah'] || '',
          father_nik: '',
          father_birth: '',
          father_edu: 'S1/D4',
          father_job: row['Pekerjaan Ayah'] || '',
          father_income: 'Rp 5.000.000 - Rp 10.000.000',
          father_phone: '',
          mother_name: row['Nama Ibu'] || '',
          mother_nik: '',
          mother_birth: '',
          mother_edu: 'S1/D4',
          mother_job: row['Pekerjaan Ibu'] || '',
          mother_income: 'Tidak Berpenghasilan',
          mother_phone: '',
          guardian_name: '-',
          guardian_relation: '-',
          guardian_job: '-',
          guardian_address: '-',
          guardian_phone: '-'
        },
        history: {
          prev_school: row['Sekolah Asal'] || '',
          prev_diploma_no: '',
          accepted_date: new Date().toISOString().slice(0, 10),
          accepted_class: row['Kelas'] || 'VII-A',
          scholarships: '',
          mutation_out_date: '',
          mutation_out_reason: '',
          graduation_date: '',
          graduation_diploma_no: '',
          exam_number: ''
        }
      };

      Store.students.push(newStudent);
      importedCount++;
    });

    Store.saveLocal();
    this.closeModal('modalImportExcel');
    this.renderDashboard();
    this.renderStudentsTable();
    this.populateStudentSelects();
    this.showToast(`Berhasil mengimpor ${importedCount} data siswa baru!`, 'success');
  },

  // Audits Table Renderer
  renderAuditsTable() {
    const tbody = document.getElementById('auditTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    Store.audits.slice().reverse().forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600; color: var(--dark); font-size: 12.5px;">${a.timestamp}</td>
        <td style="font-weight: 700;">${a.auditor_name}</td>
        <td><span class="badge badge-secondary">${a.auditor_role}</span></td>
        <td>${a.action_type}</td>
        <td style="max-width: 320px; font-size: 12px; color: var(--dark-soft);">${a.notes}</td>
        <td><span class="badge badge-success">${a.approval_status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  // Load Settings Form
  loadSettingsForm() {
    const c = Store.config;
    const map = {
      'cfgSchoolName': c.school_name,
      'cfgNpsn': c.npsn,
      'cfgNss': c.nss,
      'cfgAddress': c.address,
      'cfgCity': c.city,
      'cfgProvince': c.province,
      'cfgPhone': c.phone,
      'cfgEmail': c.email,
      'cfgLogoUrl': c.logo_url,
      'cfgHeadmasterName': c.headmaster_name,
      'cfgHeadmasterNip': c.headmaster_nip,
      'cfgTuAdminName': c.tu_admin_name,
      'cfgTuAdminNip': c.tu_admin_nip,
      'cfgGasApiUrl': c.gas_api_url
    };

    for (let id in map) {
      const el = document.getElementById(id);
      if (el) el.value = map[id] || '';
    }
  },

  // Modal helpers
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  // Toast Notification Engine
  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-triangle-exclamation';
    if (type === 'warning') icon = 'fa-circle-exclamation';
    if (type === 'info') icon = 'fa-circle-info';

    toast.innerHTML = `
      <i class="fa-solid ${icon}" style="font-size: 18px;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
};


// ==========================================
// 3. WIZARD CONTROLLER (Multi-Step Form)
// ==========================================
const Wizard = {
  currentStep: 1,

  goToStep(step) {
    this.currentStep = step;
    document.querySelectorAll('.wizard-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.step-item').forEach(s => {
      const sNum = parseInt(s.getAttribute('data-step'));
      s.classList.remove('active');
      if (sNum === step) s.classList.add('active');
      if (sNum < step) s.classList.add('completed');
    });

    const activeContent = document.getElementById(`wizardStep${step}`);
    if (activeContent) activeContent.classList.add('active');

    const btnPrev = document.getElementById('btnWizardPrev');
    const btnNext = document.getElementById('btnWizardNext');
    const btnSubmit = document.getElementById('btnWizardSubmit');

    if (btnPrev) btnPrev.style.display = step === 1 ? 'none' : 'inline-flex';
    if (btnNext) btnNext.style.display = step === 4 ? 'none' : 'inline-flex';
    if (btnSubmit) btnSubmit.style.display = step === 4 ? 'inline-flex' : 'none';
  },

  nextStep() {
    if (this.currentStep === 1) {
      const nis = document.getElementById('formNis').value.trim();
      const nisn = document.getElementById('formNisn').value.trim();
      const name = document.getElementById('formFullName').value.trim();
      if (!nis || !nisn || !name) {
        App.showToast('Lengkapi NIS, NISN, dan Nama Lengkap terlebih dahulu!', 'warning');
        return;
      }
    }
    if (this.currentStep < 4) {
      this.goToStep(this.currentStep + 1);
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  },

  resetForm() {
    document.getElementById('studentWizardForm').reset();
    document.getElementById('formStudentId').value = '';
    document.getElementById('formPhotoUrl').value = '';
    this.setPhotoPreview('');
    this.goToStep(1);
  },

  fillForm(student) {
    this.resetForm();
    document.getElementById('formStudentId').value = student.student_id;
    document.getElementById('formNis').value = student.nis || '';
    document.getElementById('formNisn').value = student.nisn || '';
    document.getElementById('formFullName').value = student.full_name || '';
    document.getElementById('formNickname').value = student.nickname || '';
    document.getElementById('formGender').value = student.gender || 'L';
    document.getElementById('formBirthPlace').value = student.birth_place || '';
    document.getElementById('formBirthDate').value = student.birth_date || '';
    document.getElementById('formReligion').value = student.religion || 'Islam';
    document.getElementById('formCitizenship').value = student.citizenship || 'WNI';
    document.getElementById('formChildOrder').value = student.child_order || 1;
    document.getElementById('formSiblingsCount').value = student.siblings_count || 0;
    document.getElementById('formClass').value = student.current_class || 'VII-A';
    document.getElementById('formStatus').value = student.status || 'Aktif';

    document.getElementById('formAddress').value = student.address || '';
    document.getElementById('formRtRw').value = student.rt_rw || '';
    document.getElementById('formVillage').value = student.village || '';
    document.getElementById('formDistrict').value = student.district || '';
    document.getElementById('formRegency').value = student.regency || '';
    document.getElementById('formProvince').value = student.province || 'DKI Jakarta';
    document.getElementById('formPostalCode').value = student.postal_code || '';
    document.getElementById('formPhone').value = student.phone || '';
    document.getElementById('formHeight').value = student.height || '';
    document.getElementById('formWeight').value = student.weight || '';
    document.getElementById('formBloodType').value = student.blood_type || '-';
    document.getElementById('formMedicalNotes').value = student.medical_notes || '';

    const p = student.parent || {};
    document.getElementById('formFatherName').value = p.father_name || '';
    document.getElementById('formFatherNik').value = p.father_nik || '';
    document.getElementById('formFatherBirth').value = p.father_birth || '';
    document.getElementById('formFatherEdu').value = p.father_edu || 'S1/D4';
    document.getElementById('formFatherJob').value = p.father_job || '';
    document.getElementById('formFatherIncome').value = p.father_income || 'Rp 10.000.000 - Rp 20.000.000';
    document.getElementById('formFatherPhone').value = p.father_phone || '';

    document.getElementById('formMotherName').value = p.mother_name || '';
    document.getElementById('formMotherNik').value = p.mother_nik || '';
    document.getElementById('formMotherBirth').value = p.mother_birth || '';
    document.getElementById('formMotherEdu').value = p.mother_edu || 'S1/D4';
    document.getElementById('formMotherJob').value = p.mother_job || '';
    document.getElementById('formMotherIncome').value = p.mother_income || 'Rp 5.000.000 - Rp 10.000.000';
    document.getElementById('formMotherPhone').value = p.mother_phone || '';

    document.getElementById('formGuardianName').value = p.guardian_name || '';
    document.getElementById('formGuardianRelation').value = p.guardian_relation || '';
    document.getElementById('formGuardianJob').value = p.guardian_job || '';
    document.getElementById('formGuardianPhone').value = p.guardian_phone || '';

    const h = student.history || {};
    document.getElementById('formPrevSchool').value = h.prev_school || '';
    document.getElementById('formPrevDiplomaNo').value = h.prev_diploma_no || '';
    document.getElementById('formAcceptedDate').value = h.accepted_date || '';
    document.getElementById('formAcceptedClass').value = h.accepted_class || student.current_class;
    document.getElementById('formScholarships').value = h.scholarships || '';
    document.getElementById('formMutationOutDate').value = h.mutation_out_date || '';
    document.getElementById('formMutationOutReason').value = h.mutation_out_reason || '';
    document.getElementById('formGraduationDate').value = h.graduation_date || '';
    document.getElementById('formGraduationDiplomaNo').value = h.graduation_diploma_no || '';
    document.getElementById('formExamNumber').value = h.exam_number || '';

    this.setPhotoPreview(student.photo_url);
    this.goToStep(1);
  },

  handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64Url = evt.target.result;
      this.setPhotoPreview(base64Url);
    };
    reader.readAsDataURL(file);
  },

  setPhotoPreview(url) {
    const img = document.getElementById('wizardPhotoImg');
    const placeholder = document.getElementById('photoPlaceholder');
    const hiddenInput = document.getElementById('formPhotoUrl');

    if (url) {
      img.src = url;
      img.style.display = 'block';
      placeholder.style.display = 'none';
      hiddenInput.value = url;
    } else {
      img.src = '';
      img.style.display = 'none';
      placeholder.style.display = 'block';
      hiddenInput.value = '';
    }
  },

  submitForm() {
    const studentId = document.getElementById('formStudentId').value.trim();
    const isNew = !studentId;
    const finalId = studentId || ('STD-' + new Date().getFullYear() + ('000' + (Store.students.length + 1)).slice(-4));

    const photoUrl = document.getElementById('formPhotoUrl').value.trim() ||
      (document.getElementById('formGender').value === 'P'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop');

    const studentObj = {
      student_id: finalId,
      nis: document.getElementById('formNis').value.trim(),
      nisn: document.getElementById('formNisn').value.trim(),
      full_name: document.getElementById('formFullName').value.trim().toUpperCase(),
      nickname: document.getElementById('formNickname').value.trim(),
      gender: document.getElementById('formGender').value,
      birth_place: document.getElementById('formBirthPlace').value.trim(),
      birth_date: document.getElementById('formBirthDate').value,
      religion: document.getElementById('formReligion').value,
      citizenship: document.getElementById('formCitizenship').value.trim(),
      child_order: parseInt(document.getElementById('formChildOrder').value) || 1,
      siblings_count: parseInt(document.getElementById('formSiblingsCount').value) || 0,
      current_class: document.getElementById('formClass').value,
      status: document.getElementById('formStatus').value,
      address: document.getElementById('formAddress').value.trim(),
      rt_rw: document.getElementById('formRtRw').value.trim(),
      village: document.getElementById('formVillage').value.trim(),
      district: document.getElementById('formDistrict').value.trim(),
      regency: document.getElementById('formRegency').value.trim(),
      province: document.getElementById('formProvince').value.trim(),
      postal_code: document.getElementById('formPostalCode').value.trim(),
      phone: document.getElementById('formPhone').value.trim(),
      height: document.getElementById('formHeight').value.trim(),
      weight: document.getElementById('formWeight').value.trim(),
      blood_type: document.getElementById('formBloodType').value,
      medical_notes: document.getElementById('formMedicalNotes').value.trim(),
      photo_url: photoUrl,
      parent: {
        father_name: document.getElementById('formFatherName').value.trim(),
        father_nik: document.getElementById('formFatherNik').value.trim(),
        father_birth: document.getElementById('formFatherBirth').value.trim(),
        father_edu: document.getElementById('formFatherEdu').value,
        father_job: document.getElementById('formFatherJob').value.trim(),
        father_income: document.getElementById('formFatherIncome').value,
        father_phone: document.getElementById('formFatherPhone').value.trim(),
        mother_name: document.getElementById('formMotherName').value.trim(),
        mother_nik: document.getElementById('formMotherNik').value.trim(),
        mother_birth: document.getElementById('formMotherBirth').value.trim(),
        mother_edu: document.getElementById('formMotherEdu').value,
        mother_job: document.getElementById('formMotherJob').value.trim(),
        mother_income: document.getElementById('formMotherIncome').value,
        mother_phone: document.getElementById('formMotherPhone').value.trim(),
        guardian_name: document.getElementById('formGuardianName').value.trim() || '-',
        guardian_relation: document.getElementById('formGuardianRelation').value.trim() || '-',
        guardian_job: document.getElementById('formGuardianJob').value.trim() || '-',
        guardian_address: '-',
        guardian_phone: document.getElementById('formGuardianPhone').value.trim() || '-'
      },
      history: {
        prev_school: document.getElementById('formPrevSchool').value.trim(),
        prev_diploma_no: document.getElementById('formPrevDiplomaNo').value.trim(),
        accepted_date: document.getElementById('formAcceptedDate').value,
        accepted_class: document.getElementById('formAcceptedClass').value.trim() || document.getElementById('formClass').value,
        scholarships: document.getElementById('formScholarships').value.trim(),
        mutation_out_date: document.getElementById('formMutationOutDate').value,
        mutation_out_reason: document.getElementById('formMutationOutReason').value.trim(),
        graduation_date: document.getElementById('formGraduationDate').value,
        graduation_diploma_no: document.getElementById('formGraduationDiplomaNo').value.trim(),
        exam_number: document.getElementById('formExamNumber').value.trim()
      }
    };

    if (isNew) {
      Store.students.unshift(studentObj);
    } else {
      const idx = Store.students.findIndex(s => s.student_id === finalId);
      if (idx !== -1) Store.students[idx] = studentObj;
    }

    Store.saveLocal();
    App.renderDashboard();
    App.renderStudentsTable();
    App.populateStudentSelects();
    App.navigateTo('view-students');
    App.showToast(`Data siswa ${studentObj.full_name} berhasil disimpan!`, 'success');

    // Sync student to GAS backend in background
    if (Store.config.gas_api_url) {
      ApiService.call('saveStudent', { data: studentObj });
    }
  }
};


// ==========================================
// 4. GRADES MODULE (Leger & Nilai K13)
// ==========================================
const GradesModule = {
  getPredicate(score, kkm) {
    const num = parseFloat(score) || 0;
    if (num >= 90) return 'A';
    if (num >= 80) return 'B';
    if (num >= kkm) return 'C';
    return 'D';
  },

  loadGradesForSelectedStudent() {
    this.renderGradesMatrix();
  },

  renderGradesMatrix() {
    const tbody = document.getElementById('gradesMatrixBody');
    const studentSelect = document.getElementById('gradesStudentSelect');
    const semesterSelect = document.getElementById('gradesSemesterSelect');
    if (!tbody || !studentSelect || !semesterSelect) return;

    const studentId = studentSelect.value;
    const semester = parseInt(semesterSelect.value) || 1;

    const studentGrades = Store.grades.filter(g => g.student_id === studentId && g.semester === semester);
    const gradeMap = {};
    studentGrades.forEach(g => { gradeMap[g.subject_code] = g; });

    tbody.innerHTML = '';
    let totalScore = 0;
    let count = 0;

    Store.subjects.forEach((subj, idx) => {
      const g = gradeMap[subj.subject_code] || {
        knowledge_score: 80,
        skill_score: 80,
        spiritual_attitude: 'B',
        social_attitude: 'B',
        final_exam_score: 80
      };

      const kScore = parseFloat(g.knowledge_score) || 0;
      const sScore = parseFloat(g.skill_score) || 0;
      totalScore += (kScore + sScore) / 2;
      count++;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align: center;">${idx + 1}</td>
        <td style="font-weight: 700;">${subj.subject_code}</td>
        <td style="text-align: left;">${subj.subject_name}</td>
        <td style="text-align: center; font-weight: 600;">${subj.kkm}</td>
        <td>
          <input type="number" class="matrix-input" id="kScore_${subj.subject_code}" value="${kScore}" min="0" max="100" onchange="GradesModule.updateRowPredicate('${subj.subject_code}', ${subj.kkm})">
        </td>
        <td id="kPred_${subj.subject_code}" style="font-weight: 700; color: var(--primary);">${this.getPredicate(kScore, subj.kkm)}</td>
        <td>
          <input type="number" class="matrix-input" id="sScore_${subj.subject_code}" value="${sScore}" min="0" max="100" onchange="GradesModule.updateRowPredicate('${subj.subject_code}', ${subj.kkm})">
        </td>
        <td id="sPred_${subj.subject_code}" style="font-weight: 700; color: var(--primary);">${this.getPredicate(sScore, subj.kkm)}</td>
        <td>
          <select id="sikap_${subj.subject_code}" class="matrix-input" style="width: 75px;">
            <option value="SB" ${g.spiritual_attitude === 'SB' ? 'selected' : ''}>SB</option>
            <option value="B" ${g.spiritual_attitude === 'B' || !g.spiritual_attitude ? 'selected' : ''}>B</option>
            <option value="C" ${g.spiritual_attitude === 'C' ? 'selected' : ''}>C</option>
            <option value="K" ${g.spiritual_attitude === 'K' ? 'selected' : ''}>K</option>
          </select>
        </td>
        <td>
          <input type="number" class="matrix-input" id="usScore_${subj.subject_code}" value="${g.final_exam_score || 0}" min="0" max="100">
        </td>
      `;
      tbody.appendChild(tr);
    });

    const avg = count > 0 ? (totalScore / count).toFixed(2) : '0.00';
    const avgBadge = document.getElementById('gradesAverageBadge');
    if (avgBadge) {
      avgBadge.textContent = `${avg} (${this.getPredicate(avg, 75)})`;
    }
  },

  updateRowPredicate(subjectCode, kkm) {
    const kInput = document.getElementById(`kScore_${subjectCode}`);
    const sInput = document.getElementById(`sScore_${subjectCode}`);
    const kPred = document.getElementById(`kPred_${subjectCode}`);
    const sPred = document.getElementById(`sPred_${subjectCode}`);

    if (kInput && kPred) kPred.textContent = this.getPredicate(kInput.value, kkm);
    if (sInput && sPred) sPred.textContent = this.getPredicate(sInput.value, kkm);
  },

  saveActiveGrades() {
    if (Store.currentRole === 'KEPSEK') {
      App.showToast('Mode Kepala Sekolah tidak dapat mengubah data nilai.', 'warning');
      return;
    }

    const studentId = document.getElementById('gradesStudentSelect').value;
    const semester = parseInt(document.getElementById('gradesSemesterSelect').value) || 1;

    // Filter out previous grades for this student & semester
    Store.grades = Store.grades.filter(g => !(g.student_id === studentId && g.semester === semester));

    Store.subjects.forEach(subj => {
      const kInput = document.getElementById(`kScore_${subj.subject_code}`);
      const sInput = document.getElementById(`sScore_${subj.subject_code}`);
      const sikapInput = document.getElementById(`sikap_${subj.subject_code}`);
      const usInput = document.getElementById(`usScore_${subj.subject_code}`);

      const kScore = parseFloat(kInput ? kInput.value : 80) || 0;
      const sScore = parseFloat(sInput ? sInput.value : 80) || 0;
      const sikap = sikapInput ? sikapInput.value : 'B';
      const usScore = parseFloat(usInput ? usInput.value : 0) || 0;

      Store.grades.push({
        student_id: studentId,
        subject_code: subj.subject_code,
        semester: semester,
        knowledge_score: kScore,
        knowledge_pred: this.getPredicate(kScore, subj.kkm),
        skill_score: sScore,
        skill_pred: this.getPredicate(sScore, subj.kkm),
        spiritual_attitude: sikap,
        social_attitude: sikap,
        final_exam_score: usScore
      });
    });

    Store.saveLocal();
    App.showToast('Data Nilai Transkrip Semester ' + semester + ' Berhasil Disimpan!', 'success');

    // Sync grades with GAS backend
    if (Store.config.gas_api_url) {
      const currentStudentGrades = Store.grades.filter(g => g.student_id === studentId);
      ApiService.call('saveGrades', { studentId: studentId, grades: currentStudentGrades });
    }
  }
};


// ==========================================
// 5. PRINT ENGINE (Indonesian A4 Precision)
// ==========================================
const PrintEngine = {
  renderSelectedDocument() {
    const docType = document.getElementById('printDocTypeSelect').value;
    const studentId = document.getElementById('printStudentSelect').value;
    const student = Store.students.find(s => s.student_id === studentId) || Store.students[0];
    const container = document.getElementById('printRenderArea');
    const selectorGroup = document.getElementById('printStudentSelectorGroup');

    if (selectorGroup) {
      selectorGroup.style.display = (docType === 'biodata_siswa' || docType === 'transkrip_nilai') ? 'block' : 'none';
    }

    if (!container) return;
    container.innerHTML = '';

    switch (docType) {
      case 'biodata_siswa':
        container.innerHTML = this.getBiodataSiswaTemplate(student);
        break;

      case 'transkrip_nilai':
        container.innerHTML = this.getTranskripNilaiTemplate(student);
        break;

      case 'cover_buku_induk':
        container.innerHTML = this.getCoverBukuIndukTemplate();
        break;

      case 'petunjuk_isi':
        container.innerHTML = this.getPetunjukPengisianTemplate();
        break;

      case 'lembar_pemeriksaan':
        container.innerHTML = this.getLembarPemeriksaanTemplate();
        break;

      case 'rekap_nisn':
        container.innerHTML = this.getRekapitulasiSiswaTemplate();
        break;
    }
  },

  // 1. Lembar Biodata Siswa Resmi Format Buku Induk
  getBiodataSiswaTemplate(s) {
    if (!s) return '<p>Pilih siswa terlebih dahulu.</p>';
    const c = Store.config;
    const p = s.parent || {};
    const h = s.history || {};
    const photo = s.photo_url || (s.gender === 'P'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop'
      : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop');

    return `
      <div class="a4-page">
        <!-- Kop Surat -->
        <div class="doc-kop-surat">
          <img src="${c.logo_url}" class="doc-kop-logo" alt="Logo">
          <div class="doc-kop-text">
            <h2>${c.school_name}</h2>
            <h3>LEMBAR BUKU INDUK SISWA</h3>
            <p>${c.address}, ${c.city}, ${c.province} • Telp: ${c.phone} • NPSN: ${c.npsn}</p>
          </div>
        </div>

        <div class="doc-title-box">
          <h1>LEMBAR BUKU INDUK PESERTA DIDIK</h1>
          <p>Nomor Induk Siswa (NIS): <b>${s.nis || '-'}</b> &nbsp;|&nbsp; NISN: <b>${s.nisn || '-'}</b></p>
        </div>

        <!-- Bagian A: Diri Siswa -->
        <table class="doc-table">
          <tr style="background: #EAEAEA;"><th colspan="3" style="text-align: left; padding: 6px 10px;">A. KETERANGAN TENTANG DIRI PESERTA DIDIK</th></tr>
          <tr><td style="width: 30px; text-align: center;">1.</td><td style="width: 240px;">Nama Lengkap</td><td><b>${s.full_name}</b></td></tr>
          <tr><td style="text-align: center;">2.</td><td>Nama Panggilan</td><td>${s.nickname || '-'}</td></tr>
          <tr><td style="text-align: center;">3.</td><td>Jenis Kelamin</td><td>${s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td></tr>
          <tr><td style="text-align: center;">4.</td><td>Tempat, Tanggal Lahir</td><td>${s.birth_place || '-'}, ${s.birth_date || '-'}</td></tr>
          <tr><td style="text-align: center;">5.</td><td>Agama</td><td>${s.religion || 'Islam'}</td></tr>
          <tr><td style="text-align: center;">6.</td><td>Kewarganegaraan</td><td>${s.citizenship || 'WNI'}</td></tr>
          <tr><td style="text-align: center;">7.</td><td>Anak Keberapa / Jml Saudara</td><td>Anak ke-<b>${s.child_order || 1}</b> dari <b>${(s.siblings_count || 0) + 1}</b> bersaudara</td></tr>
          
          <tr style="background: #EAEAEA;"><th colspan="3" style="text-align: left; padding: 6px 10px;">B. KETERANGAN TEMPAT TINGGAL & JASMANI</th></tr>
          <tr><td style="text-align: center;">8.</td><td>Alamat Lengkap Siswa</td><td>${s.address || '-'} RT ${s.rt_rw || '-'}, Kel. ${s.village || '-'}, Kec. ${s.district || '-'}, ${s.regency || '-'}</td></tr>
          <tr><td style="text-align: center;">9.</td><td>Nomor Telepon / HP</td><td>${s.phone || '-'}</td></tr>
          <tr><td style="text-align: center;">10.</td><td>Tinggi / Berat Badan / Gol. Darah</td><td>${s.height || '-'} cm / ${s.weight || '-'} kg / Gol. ${s.blood_type || '-'}</td></tr>
          <tr><td style="text-align: center;">11.</td><td>Catatan Kesehatan Khusus</td><td>${s.medical_notes || 'Tidak Ada'}</td></tr>

          <tr style="background: #EAEAEA;"><th colspan="3" style="text-align: left; padding: 6px 10px;">C. PENDIDIKAN SEBELUMNYA & PENERIMAAN</th></tr>
          <tr><td style="text-align: center;">12.</td><td>Sekolah Asal (SD / MI)</td><td>${h.prev_school || '-'}</td></tr>
          <tr><td style="text-align: center;">13.</td><td>Nomor Seri Ijazah SD/MI</td><td>${h.prev_diploma_no || '-'}</td></tr>
          <tr><td style="text-align: center;">14.</td><td>Diterima Tanggal / di Kelas</td><td>${h.accepted_date || '-'} / Kelas ${h.accepted_class || s.current_class}</td></tr>

          <tr style="background: #EAEAEA;"><th colspan="3" style="text-align: left; padding: 6px 10px;">D. KETERANGAN ORANG TUA KANDUNG & WALI</th></tr>
          <tr><td style="text-align: center;">15.</td><td>Nama Ayah Kandung & NIK</td><td><b>${p.father_name || '-'}</b> (NIK: ${p.father_nik || '-'})</td></tr>
          <tr><td style="text-align: center;">16.</td><td>Pendidikan & Pekerjaan Ayah</td><td>${p.father_edu || '-'} / ${p.father_job || '-'}</td></tr>
          <tr><td style="text-align: center;">17.</td><td>Nama Ibu Kandung & NIK</td><td><b>${p.mother_name || '-'}</b> (NIK: ${p.mother_nik || '-'})</td></tr>
          <tr><td style="text-align: center;">18.</td><td>Pendidikan & Pekerjaan Ibu</td><td>${p.mother_edu || '-'} / ${p.mother_job || '-'}</td></tr>
          <tr><td style="text-align: center;">19.</td><td>Nama Wali & Hubungan</td><td>${p.guardian_name || '-'} (${p.guardian_relation || '-'})</td></tr>
        </table>

        <!-- Foto 3x4 Frame & Tanda Tangan -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 25px; page-break-inside: avoid;">
          <div style="width: 105px; height: 140px; border: 1px solid #000; padding: 2px; text-align: center; display: flex; align-items: center; justify-content: center; position: relative;">
            <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover;" alt="Pas Foto 3x4">
            <div style="position: absolute; bottom: 2px; background: rgba(255,255,255,0.8); font-size: 8pt; width: 100%;">Cap Sekolah</div>
          </div>

          <div class="sig-box">
            <div>${c.city}, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div>Kepala Sekolah,</div>
            <div class="sig-space"></div>
            <div class="sig-name">${c.headmaster_name}</div>
            <div>NIP. ${c.headmaster_nip}</div>
          </div>
        </div>
      </div>
    `;
  },

  // 2. Lembar Transkrip Nilai Rapor K13 (6 Semester)
  getTranskripNilaiTemplate(s) {
    if (!s) return '<p>Pilih siswa terlebih dahulu.</p>';
    const c = Store.config;
    const studentGrades = Store.grades.filter(g => g.student_id === s.student_id);

    let rowsHtml = '';
    Store.subjects.forEach((subj, idx) => {
      const g = studentGrades.find(x => x.subject_code === subj.subject_code) || { knowledge_score: 80, skill_score: 80, spiritual_attitude: 'B' };
      rowsHtml += `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td>${subj.subject_name}</td>
          <td style="text-align: center;">${subj.kkm}</td>
          <td style="text-align: center; font-weight: bold;">${g.knowledge_score || 80}</td>
          <td style="text-align: center;">${GradesModule.getPredicate(g.knowledge_score || 80, subj.kkm)}</td>
          <td style="text-align: center; font-weight: bold;">${g.skill_score || 80}</td>
          <td style="text-align: center;">${GradesModule.getPredicate(g.skill_score || 80, subj.kkm)}</td>
          <td style="text-align: center;">${g.spiritual_attitude || 'B'}</td>
        </tr>
      `;
    });

    return `
      <div class="a4-page">
        <div class="doc-kop-surat">
          <img src="${c.logo_url}" class="doc-kop-logo" alt="Logo">
          <div class="doc-kop-text">
            <h2>${c.school_name}</h2>
            <h3>TRANSKRIP NILAI CAPAIAN KOMPETENSI (K13)</h3>
            <p>${c.address}, ${c.city} • NPSN: ${c.npsn}</p>
          </div>
        </div>

        <table style="width: 100%; font-size: 10pt; margin-bottom: 12px;">
          <tr>
            <td style="width: 120px;">Nama Peserta Didik</td><td style="width: 10px;">:</td><td><b>${s.full_name}</b></td>
            <td style="width: 100px;">Kelas</td><td style="width: 10px;">:</td><td>${s.current_class}</td>
          </tr>
          <tr>
            <td>NIS / NISN</td><td>:</td><td>${s.nis || '-'} / ${s.nisn || '-'}</td>
            <td>Tahun Pelajaran</td><td>:</td><td>${c.academic_year}</td>
          </tr>
        </table>

        <table class="doc-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 30px;">No</th>
              <th rowspan="2">Mata Pelajaran</th>
              <th rowspan="2" style="width: 45px;">KKM</th>
              <th colspan="2">Pengetahuan (KI-3)</th>
              <th colspan="2">Keterampilan (KI-4)</th>
              <th rowspan="2" style="width: 50px;">Sikap</th>
            </tr>
            <tr>
              <th style="width: 50px;">Angka</th>
              <th style="width: 50px;">Pred</th>
              <th style="width: 50px;">Angka</th>
              <th style="width: 50px;">Pred</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div style="margin-top: 14px; font-size: 10pt;">
          <b>Kegiatan Ekstrakurikuler:</b>
          <div style="margin-top: 4px; border: 1px solid #000; padding: 6px 10px;">
            1. Pramuka Wajib: Sangat Baik (A)<br>
            2. Tahfidz & Tilawah Al-Qur'an: Amat Baik (A)<br>
            3. Olahraga & Bela Diri: Baik (B)
          </div>
        </div>

        <div class="doc-signatures">
          <div class="sig-box">
            <div>Mengetahui,</div>
            <div>Orang Tua / Wali Siswa,</div>
            <div class="sig-space"></div>
            <div class="sig-name">${(s.parent && s.parent.father_name) ? s.parent.father_name : '.......................................'}</div>
          </div>
          <div class="sig-box">
            <div>${c.city}, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div>Kepala Sekolah,</div>
            <div class="sig-space"></div>
            <div class="sig-name">${c.headmaster_name}</div>
            <div>NIP. ${c.headmaster_nip}</div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Cover Buku Induk
  getCoverBukuIndukTemplate() {
    const c = Store.config;
    return `
      <div class="a4-page">
        <div class="cover-outer-frame">
          <div>
            <div style="font-size: 16pt; font-weight: bold; letter-spacing: 1px;">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</div>
            <div style="font-size: 12pt; margin-top: 4px;">REPUBLIK INDONESIA</div>
          </div>

          <div>
            <img src="${c.logo_url}" class="cover-logo-center" alt="Logo Sekolah">
            <div class="cover-title">BUKU INDUK</div>
            <div class="cover-subtitle">REGISTER RESMI PESERTA DIDIK</div>
            <div style="font-size: 16pt; font-weight: bold; margin-top: 16px; color: var(--dark);">${c.school_name}</div>
            <div style="font-size: 12pt; margin-top: 4px;">NPSN: ${c.npsn} • NSS: ${c.nss || '202050101001'}</div>
          </div>

          <div style="border-top: 2px solid #2E4036; padding-top: 14px; width: 85%;">
            <div style="font-size: 11pt; font-weight: bold;">TAHUN PELAJARAN ${c.academic_year}</div>
            <div style="font-size: 10pt; margin-top: 4px;">${c.address}, ${c.city}, ${c.province}</div>
          </div>
        </div>
      </div>
    `;
  },

  // 4. Petunjuk Pengisian
  getPetunjukPengisianTemplate() {
    const c = Store.config;
    return `
      <div class="a4-page">
        <div class="doc-kop-surat">
          <img src="${c.logo_url}" class="doc-kop-logo" alt="Logo">
          <div class="doc-kop-text">
            <h2>${c.school_name}</h2>
            <h3>PETUNJUK TEKNIS PENGISIAN BUKU INDUK</h3>
          </div>
        </div>

        <div class="doc-title-box">
          <h1>PETUNJUK & KETENTUAN PENGELOLAAN BUKU INDUK</h1>
        </div>

        <div style="font-size: 11pt; line-height: 1.7; text-align: justify;">
          <p><b>1. Kedudukan & Fungsi Buku Induk:</b><br>
          Buku Induk Peserta Didik merupakan dokumen kearsipan negara yang bersifat abadi dan mutlak harus disimpan secara aman, tertib, dan berkelanjutan oleh satuan pendidikan.</p>

          <p style="margin-top: 10px;"><b>2. Ketentuan Pengisian:</b><br>
          - Data pokok siswa wajib diisi berdasarkan Akta Kelahiran dan Ijazah Sekolah Dasar (SD/MI) asal.<br>
          - Nomor Induk Siswa (NIS) diterbitkan berurutan dan tidak boleh berganti atau digunakan ganda.<br>
          - Pas foto yang ditempelkan wajib berukuran 3x4 cm resmi dengan stempel cap basah sekolah.<br>
          - Setiap mutasi, beasiswa, maupun kelulusan wajib dicatat tanggal dan nomor surat resminya.</p>

          <p style="margin-top: 10px;"><b>3. Pengesahan & Pemeriksaan Berkala:</b><br>
          Buku Induk wajib diperiksa dan ditandatangani secara berkala oleh Kepala Sekolah minimal satu kali per semester dan diverifikasi oleh Pengawas Pembina Dinas Pendidikan.</p>
        </div>
      </div>
    `;
  },

  // 5. Lembar Pemeriksaan Buku Induk
  getLembarPemeriksaanTemplate() {
    const c = Store.config;
    let auditRows = '';
    Store.audits.forEach((a, idx) => {
      auditRows += `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td style="text-align: center;">${a.timestamp.split(' ')[0]}</td>
          <td><b>${a.auditor_name}</b><br><span style="font-size: 9pt;">${a.auditor_role}</span></td>
          <td>${a.notes}</td>
          <td style="text-align: center; font-weight: bold;">${a.approval_status}</td>
          <td style="height: 45px; text-align: center; vertical-align: bottom;">( Paraf )</td>
        </tr>
      `;
    });

    return `
      <div class="a4-page">
        <div class="doc-kop-surat">
          <img src="${c.logo_url}" class="doc-kop-logo" alt="Logo">
          <div class="doc-kop-text">
            <h2>${c.school_name}</h2>
            <h3>LEMBAR PEMERIKSAAN BUKU INDUK SISWA</h3>
            <p>NPSN: ${c.npsn} • Alamat: ${c.address}</p>
          </div>
        </div>

        <div class="doc-title-box">
          <h1>CATATAN HASIL PEMERIKSAAN & AUDIT BUKU INDUK</h1>
        </div>

        <table class="doc-table">
          <thead>
            <tr>
              <th style="width: 30px;">No</th>
              <th style="width: 80px;">Tanggal</th>
              <th style="width: 160px;">Pemeriksa & Jabatan</th>
              <th>Catatan / Petunjuk Perbaikan</th>
              <th style="width: 80px;">Status</th>
              <th style="width: 70px;">Tanda Tangan</th>
            </tr>
          </thead>
          <tbody>
            ${auditRows}
          </tbody>
        </table>
      </div>
    `;
  },

  // 6. Rekapitulasi Siswa
  getRekapitulasiSiswaTemplate() {
    const c = Store.config;
    let rows = '';
    Store.students.forEach((s, idx) => {
      rows += `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td style="text-align: center; font-weight: bold;">${s.nis || '-'}</td>
          <td style="text-align: center;">${s.nisn || '-'}</td>
          <td><b>${s.full_name}</b></td>
          <td style="text-align: center;">${s.gender}</td>
          <td style="text-align: center;">${s.current_class}</td>
          <td>${(s.parent && s.parent.father_name) ? s.parent.father_name : '-'}</td>
          <td style="text-align: center;">${s.status}</td>
        </tr>
      `;
    });

    return `
      <div class="a4-page">
        <div class="doc-kop-surat">
          <img src="${c.logo_url}" class="doc-kop-logo" alt="Logo">
          <div class="doc-kop-text">
            <h2>${c.school_name}</h2>
            <h3>REKAPITULASI BUKU INDUK SISWA</h3>
            <p>Tahun Pelajaran: ${c.academic_year} • NPSN: ${c.npsn}</p>
          </div>
        </div>

        <table class="doc-table">
          <thead>
            <tr>
              <th style="width: 30px;">No</th>
              <th style="width: 70px;">NIS</th>
              <th style="width: 80px;">NISN</th>
              <th>Nama Lengkap Siswa</th>
              <th style="width: 35px;">JK</th>
              <th style="width: 60px;">Kelas</th>
              <th>Nama Orang Tua</th>
              <th style="width: 60px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }
};


// ==========================================
// 6. SETTINGS & THEME ENGINE
// ==========================================
const SettingsModule = {
  saveConfig() {
    Store.config.school_name = document.getElementById('cfgSchoolName').value.trim();
    Store.config.npsn = document.getElementById('cfgNpsn').value.trim();
    Store.config.nss = document.getElementById('cfgNss').value.trim();
    Store.config.address = document.getElementById('cfgAddress').value.trim();
    Store.config.city = document.getElementById('cfgCity').value.trim();
    Store.config.province = document.getElementById('cfgProvince').value.trim();
    Store.config.phone = document.getElementById('cfgPhone').value.trim();
    Store.config.email = document.getElementById('cfgEmail').value.trim();
    Store.config.logo_url = document.getElementById('cfgLogoUrl').value.trim();
    Store.config.headmaster_name = document.getElementById('cfgHeadmasterName').value.trim();
    Store.config.headmaster_nip = document.getElementById('cfgHeadmasterNip').value.trim();
    Store.config.tu_admin_name = document.getElementById('cfgTuAdminName').value.trim();
    Store.config.tu_admin_nip = document.getElementById('cfgTuAdminNip').value.trim();
    Store.config.gas_api_url = document.getElementById('cfgGasApiUrl').value.trim();

    Store.saveLocal();
    App.updateBrandingUI();
    App.showToast('Pengaturan CMS & Tampilan berhasil disimpan!', 'success');

    // Sync config with GAS backend
    if (Store.config.gas_api_url) {
      ApiService.call('saveConfig', { data: Store.config });
    }
  }
};

const ThemeEngine = {
  presets: {
    soft_green: {
      '--primary': '#88AB8E',
      '--primary-hover': '#75977B',
      '--primary-light': '#E7EFE8',
      '--secondary': '#AFC8AD',
      '--secondary-light': '#F0F5F0',
      '--accent': '#EEE7DA',
      '--dark': '#2E4036',
      '--light-bg': '#F4F7F4'
    },
    ocean_blue: {
      '--primary': '#6096B4',
      '--primary-hover': '#4E7F9B',
      '--primary-light': '#E4EEF5',
      '--secondary': '#93BFCF',
      '--secondary-light': '#EDF5F8',
      '--accent': '#BDCDD6',
      '--dark': '#1C3144',
      '--light-bg': '#F0F5F9'
    },
    warm_terracotta: {
      '--primary': '#DDA15E',
      '--primary-hover': '#BC6C25',
      '--primary-light': '#FAF3EA',
      '--secondary': '#E9D8A6',
      '--secondary-light': '#FCF9F2',
      '--accent': '#F4A261',
      '--dark': '#382B22',
      '--light-bg': '#FAF8F5'
    },
    slate_lavender: {
      '--primary': '#9F91CC',
      '--primary-hover': '#8777B8',
      '--primary-light': '#F1EEF8',
      '--secondary': '#C4B5E6',
      '--secondary-light': '#F7F5FC',
      '--accent': '#E2DCF2',
      '--dark': '#2D283E',
      '--light-bg': '#F7F6FA'
    }
  },

  applyPreset(presetKey) {
    const theme = this.presets[presetKey] || this.presets.soft_green;
    const root = document.documentElement;
    for (let variable in theme) {
      root.style.setProperty(variable, theme[variable]);
    }
    Store.config.theme_preset = presetKey;
    Store.saveLocal();
  }
};

const AuditModule = {
  openAddAuditModal() {
    document.getElementById('auditFormName').value = Store.config.headmaster_name;
    document.getElementById('auditFormRole').value = 'Kepala Sekolah';
    App.openModal('modalAddAudit');
  },

  saveAudit() {
    const auditorName = document.getElementById('auditFormName').value.trim();
    const auditorRole = document.getElementById('auditFormRole').value.trim();
    const actionType = document.getElementById('auditFormAction').value.trim();
    const notes = document.getElementById('auditFormNotes').value.trim();
    const approvalStatus = document.getElementById('auditFormStatus').value;

    if (!auditorName || !notes) {
      App.showToast('Nama pemeriksa dan catatan audit wajib diisi!', 'warning');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}:00`;

    const newAudit = {
      audit_id: 'AUD-' + now.getTime(),
      timestamp: formattedDate,
      auditor_name: auditorName,
      auditor_role: auditorRole,
      action_type: actionType,
      notes: notes,
      approval_status: approvalStatus
    };

    Store.audits.push(newAudit);
    Store.saveLocal();
    App.closeModal('modalAddAudit');
    App.renderAuditsTable();
    App.renderDashboard();
    App.showToast('Catatan pemeriksaan Buku Induk berhasil disimpan!', 'success');

    // Sync audit log to GAS backend
    if (Store.config.gas_api_url) {
      ApiService.call('saveAudit', { data: newAudit });
    }
  }
};

// ==========================================
// 7. BOOTSTRAP APPLICATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
