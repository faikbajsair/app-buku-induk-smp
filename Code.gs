/**
 * =========================================================================
 * APLIKASI BUKU INDUK & RAPOR K13 / KURIKULUM NASIONAL MODERN
 * Backend Controller & REST API Router for Google Apps Script (GAS)
 * =========================================================================
 * Author: Senior Full-Stack Software Architect
 * Database: Google Sheets (Relational Architecture)
 * Version: 2.5.0 Modern Edition
 */

// Global Sheet Names
const SHEETS = {
  CONFIG: 'CONFIG',
  STUDENTS: 'STUDENTS',
  PARENTS: 'PARENTS',
  HISTORIES: 'HISTORIES',
  SUBJECTS: 'SUBJECTS',
  GRADES: 'GRADES',
  AUDITS: 'AUDITS'
};

/**
 * Main Web App Entry Point - Handles GET Requests
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'ping';
    const callback = (e && e.parameter && e.parameter.callback) ? e.parameter.callback : null;
    const params = (e && e.parameter) ? e.parameter : {};

    let responseData = {};

    switch (action) {
      case 'ping':
        responseData = { status: 'success', message: 'API Buku Induk Online & Ready', timestamp: new Date() };
        break;

      case 'initDatabase':
        responseData = setupDatabase();
        break;

      case 'getConfig':
        responseData = getConfigData();
        break;

      case 'getDashboardStats':
        responseData = getDashboardStatsData();
        break;

      case 'getStudents':
        responseData = getStudentsData(params);
        break;

      case 'getStudentDetail':
        responseData = getStudentDetailData(params.studentId || params.id);
        break;

      case 'getSubjects':
        responseData = getSubjectsData();
        break;

      case 'getGrades':
        responseData = getGradesData(params.studentId || params.id);
        break;

      case 'getAudits':
        responseData = getAuditsData();
        break;

      case 'exportAllData':
        responseData = exportAllDatabaseData();
        break;

      case 'getDrivePhotos':
        responseData = getDriveFolderPhotos(params.folderId || params.folder_id);
        break;

      case 'syncDrivePhotos':
        responseData = syncDrivePhotosData(params.folderId || params.folder_id);
        break;

      default:
        responseData = { status: 'error', message: 'Action not recognized: ' + action };
        break;
    }

    return createJsonResponse(responseData, callback);
  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString(),
      stack: err.stack
    }, (e && e.parameter ? e.parameter.callback : null));
  }
}

/**
 * Main Web App Entry Point - Handles POST Requests
 */
function doPost(e) {
  try {
    let postData = {};
    if (e && e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    }

    const action = postData.action || (e && e.parameter ? e.parameter.action : '');
    let responseData = {};

    switch (action) {
      case 'saveConfig':
        responseData = saveConfigData(postData.data);
        break;

      case 'saveStudent':
        responseData = saveStudentData(postData.data);
        break;

      case 'deleteStudent':
        responseData = deleteStudentData(postData.studentId || postData.id);
        break;

      case 'saveGrades':
        responseData = saveGradesData(postData.studentId, postData.grades);
        break;

      case 'saveAudit':
        responseData = saveAuditLog(postData.data);
        break;

      case 'bulkImportStudents':
        responseData = bulkImportStudentsData(postData.students);
        break;

      case 'syncDrivePhotos':
        responseData = syncDrivePhotosData(postData.folderId || postData.folder_id || (e && e.parameter ? e.parameter.folderId : ''));
        break;

      case 'getDrivePhotos':
        responseData = getDriveFolderPhotos(postData.folderId || postData.folder_id || (e && e.parameter ? e.parameter.folderId : ''));
        break;

      default:
        responseData = { status: 'error', message: 'POST Action not recognized: ' + action };
        break;
    }

    return createJsonResponse(responseData);
  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString(),
      stack: err.stack
    });
  }
}

/**
 * Helper to produce standard JSON output or JSONP with CORS support
 */
function createJsonResponse(data, callback) {
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(data) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get active spreadsheet instance
 */
function getDb() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Helper to get or create a sheet with designated headers
 */
function getOrCreateSheet(sheetName, headers) {
  const ss = getDb();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#AFC8AD').setFontColor('#2E4036');
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

/**
 * Setup & Initialize the Relational Google Sheets Database
 */
function setupDatabase() {
  const ss = getDb();

  // 1. CONFIG Sheet
  const configHeaders = ['Key', 'Value', 'Description'];
  const configSheet = getOrCreateSheet(SHEETS.CONFIG, configHeaders);
  if (configSheet.getLastRow() <= 1) {
    const defaultConfigs = [
      ['school_name', 'SMP ISLAM TERPADU AL-IMAM', 'Nama Resmi Sekolah'],
      ['npsn', '20109988', 'Nomor Pokok Sekolah Nasional'],
      ['nss', '202050101001', 'Nomor Statistik Sekolah'],
      ['address', 'Jl. Raya Sunnah No. 12, Kel. Harapan Jaya, Kec. Sukamaju', 'Alamat Lengkap Sekolah'],
      ['city', 'Jakarta', 'Kota/Kabupaten'],
      ['province', 'DKI Jakarta', 'Provinsi'],
      ['postal_code', '13420', 'Kode Pos'],
      ['phone', '(021) 88997766', 'Nomor Telepon'],
      ['email', 'info@alimamischool.sch.id', 'Email Resmi'],
      ['website', 'https://alimamischool.com', 'Website Resmi'],
      ['logo_url', 'https://alimamischool.com/wp-content/uploads/2020/08/Al-Imam-Islamic-School-alimamischool.com-sekolah-sunnah-logo.png', 'URL Logo Sekolah'],
      ['headmaster_name', 'Arif Rohman, S.Sos., M.Pd.', 'Nama Kepala Sekolah'],
      ['headmaster_nip', '19750812 200003 1 002', 'NIP Kepala Sekolah'],
      ['headmaster_signature_url', '', 'Tanda Tangan Digital Kepala Sekolah'],
      ['tu_admin_name', 'Ahmad Fauzi, S.Kom.', 'Nama Kepala Tata Usaha'],
      ['tu_admin_nip', '19880415 201201 1 004', 'NIP Kepala Tata Usaha'],
      ['theme_color_primary', '#88AB8E', 'Warna Utama (Primary)'],
      ['theme_color_secondary', '#AFC8AD', 'Warna Sekunder'],
      ['theme_color_accent', '#EEE7DA', 'Warna Aksen'],
      ['academic_year', '2025/2026', 'Tahun Pelajaran Aktif'],
      ['active_semester', 'Ganjil', 'Semester Aktif'],
      ['license_status', 'Commercial Pro Active', 'Status Lisensi Aplikasi']
    ];
    configSheet.getRange(2, 1, defaultConfigs.length, 3).setValues(defaultConfigs);
  }

  // 2. STUDENTS Sheet
  const studentHeaders = [
    'student_id', 'nis', 'nisn', 'full_name', 'nickname', 'gender', 'birth_place', 'birth_date',
    'religion', 'citizenship', 'child_order', 'siblings_count', 'address', 'rt_rw', 'village',
    'district', 'regency', 'province', 'postal_code', 'phone', 'height', 'weight', 'blood_type',
    'medical_notes', 'photo_url', 'current_class', 'status', 'created_at', 'updated_at'
  ];
  getOrCreateSheet(SHEETS.STUDENTS, studentHeaders);

  // 3. PARENTS Sheet
  const parentHeaders = [
    'student_id', 'father_name', 'father_nik', 'father_birth', 'father_edu', 'father_job', 'father_income', 'father_phone',
    'mother_name', 'mother_nik', 'mother_birth', 'mother_edu', 'mother_job', 'mother_income', 'mother_phone',
    'guardian_name', 'guardian_relation', 'guardian_job', 'guardian_address', 'guardian_phone'
  ];
  getOrCreateSheet(SHEETS.PARENTS, parentHeaders);

  // 4. HISTORIES Sheet
  const historyHeaders = [
    'student_id', 'prev_school', 'prev_diploma_no', 'prev_diploma_file', 'accepted_date', 'accepted_class', 'scholarships',
    'mutation_out_date', 'mutation_out_reason', 'graduation_date', 'graduation_diploma_no', 'graduation_diploma_file', 'exam_number'
  ];
  getOrCreateSheet(SHEETS.HISTORIES, historyHeaders);

  // 5. SUBJECTS Sheet
  const subjectHeaders = ['subject_code', 'subject_name', 'group_name', 'kkm', 'sort_order'];
  const subjectSheet = getOrCreateSheet(SHEETS.SUBJECTS, subjectHeaders);
  if (subjectSheet.getLastRow() <= 1) {
    const defaultSubjects = [
      ['PAI', 'Pendidikan Agama Islam & Budi Pekerti', 'Kelompok A (Umum)', 75, 1],
      ['PPKN', 'Pendidikan Pancasila dan Kewarganegaraan', 'Kelompok A (Umum)', 75, 2],
      ['BIN', 'Bahasa Indonesia', 'Kelompok A (Umum)', 75, 3],
      ['MAT', 'Matematika', 'Kelompok A (Umum)', 70, 4],
      ['IPA', 'Ilmu Pengetahuan Alam', 'Kelompok A (Umum)', 72, 5],
      ['IPS', 'Ilmu Pengetahuan Sosial', 'Kelompok A (Umum)', 75, 6],
      ['BIG', 'Bahasa Inggris', 'Kelompok A (Umum)', 72, 7],
      ['SBK', 'Seni Budaya', 'Kelompok B (Umum)', 75, 8],
      ['PJOK', 'Pendidikan Jasmani, Olahraga, dan Kesehatan', 'Kelompok B (Umum)', 75, 9],
      ['PRA', 'Prakarya', 'Kelompok B (Umum)', 75, 10],
      ['B_ARAB', 'Bahasa Arab (Muatan Lokal)', 'Muatan Lokal', 75, 11],
      ['BTQ', 'Baca Tulis Al-Qur\'an & Tahfidz', 'Muatan Lokal', 80, 12],
      ['EKS_PRAMUKA', 'Ekstrakurikuler Wajib: Pramuka', 'Ekstrakurikuler', 80, 13],
      ['EKS_BTQ', 'Ekstrakurikuler: Tahfidz & Tilawah', 'Ekstrakurikuler', 80, 14],
      ['EKS_OLAHRAGA', 'Ekstrakurikuler: Futsal / Panahan / Bela Diri', 'Ekstrakurikuler', 80, 15]
    ];
    subjectSheet.getRange(2, 1, defaultSubjects.length, 5).setValues(defaultSubjects);
  }

  // 6. GRADES Sheet
  const gradeHeaders = [
    'grade_id', 'student_id', 'subject_code', 'semester', 'knowledge_score', 'knowledge_pred',
    'skill_score', 'skill_pred', 'spiritual_attitude', 'social_attitude', 'final_exam_score', 'updated_at'
  ];
  getOrCreateSheet(SHEETS.GRADES, gradeHeaders);

  // 7. AUDITS Sheet
  const auditHeaders = ['audit_id', 'timestamp', 'auditor_name', 'auditor_role', 'action_type', 'notes', 'approval_status'];
  getOrCreateSheet(SHEETS.AUDITS, auditHeaders);

  // Seed sample student if empty
  seedSampleStudentIfEmpty();

  return { status: 'success', message: 'Database Relasional Berhasil Diinisialisasi Lengkap!' };
}

/**
 * Seed initial dummy student for demonstration
 */
function seedSampleStudentIfEmpty() {
  const ss = getDb();
  const studentSheet = ss.getSheetByName(SHEETS.STUDENTS);
  if (studentSheet.getLastRow() <= 1) {
    const sampleId = 'STD-2025001';
    const sampleStudent = [
      sampleId, '252607001', '0098765432', 'MUHAMMAD FAYYADH AR-RASYID', 'Fayyadh', 'L', 'Jakarta', '2011-05-14',
      'Islam', 'WNI', 1, 3, 'Jl. Mawar Raya No. 45 RT 03/05', '03/05', 'Harapan Jaya',
      'Sukamaju', 'Jakarta Timur', 'DKI Jakarta', '13420', '081234567890', 158, 48, 'O',
      'Tidak ada riwayat alergi berat', 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&h=400&fit=crop', 'VII Utsman', 'Aktif', new Date(), new Date()
    ];
    studentSheet.getRange(2, 1, 1, sampleStudent.length).setValues([sampleStudent]);

    const parentSheet = ss.getSheetByName(SHEETS.PARENTS);
    const sampleParent = [
      sampleId, 'Ir. H. Salman Faris', '3175001205780001', 'Bandung, 12-05-1978', 'S1 Teknik', 'Karyawan Swasta / BUMN', 'Rp 10.000.000 - Rp 20.000.000', '081122334455',
      'Hj. Siti Aminah, S.Pd.', '3175004508800002', 'Jakarta, 15-08-1980', 'S1 Pendidikan', 'Guru / PNS', 'Rp 5.000.000 - Rp 10.000.000', '081199887766',
      '-', '-', '-', '-', '-'
    ];
    parentSheet.getRange(2, 1, 1, sampleParent.length).setValues([sampleParent]);

    const historySheet = ss.getSheetByName(SHEETS.HISTORIES);
    const sampleHistory = [
      sampleId, 'SD Islam Terpadu Nurul Fikri', 'DN-01/D-SD/13/0012345', '', '2025-07-15', 'VII Utsman', 'Prestasi Tahfidz Juz 30',
      '', '', '', '', '', '25-01-07-001'
    ];
    historySheet.getRange(2, 1, 1, sampleHistory.length).setValues([sampleHistory]);
  }
}

/**
 * Get configuration settings
 */
function getConfigData() {
  const ss = getDb();
  const sheet = ss.getSheetByName(SHEETS.CONFIG);
  if (!sheet) return { status: 'error', message: 'Config sheet not found' };

  const data = sheet.getDataRange().getValues();
  const config = {};
  for (let i = 1; i < data.length; i++) {
    const key = data[i][0];
    const val = data[i][1];
    if (key) {
      config[key] = val;
    }
  }
  return { status: 'success', data: config };
}

/**
 * Save configuration settings
 */
function saveConfigData(configObj) {
  const ss = getDb();
  const sheet = getOrCreateSheet(SHEETS.CONFIG);
  const data = sheet.getDataRange().getValues();

  for (let key in configObj) {
    let found = false;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        sheet.getRange(i + 1, 2).setValue(configObj[key]);
        found = true;
        break;
      }
    }
    if (!found) {
      sheet.appendRow([key, configObj[key], 'Updated via API']);
    }
  }

  return { status: 'success', message: 'Pengaturan CMS berhasil disimpan!' };
}

/**
 * Convert 2D sheet rows into array of objects using header row
 */
function sheetToObjects(sheet) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const results = [];
  const stringKeys = [
    'student_id', 'nis', 'nisn', 'phone', 'father_phone', 'mother_phone', 'guardian_phone',
    'father_nik', 'mother_nik', 'postal_code', 'prev_diploma_no', 'prev_diploma_file', 'graduation_diploma_no', 'graduation_diploma_file', 'exam_number',
    'audit_id', 'grade_id', 'subject_code', 'npsn', 'nss'
  ];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0] && row.every(cell => cell === '')) continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const h = headers[j];
      let val = row[j];

      if (val instanceof Date) {
        if (h === 'birth_date' || h === 'accepted_date' || h === 'mutation_out_date' || h === 'graduation_date') {
          val = Utilities.formatDate(val, Session.getScriptTimeZone() || 'GMT+7', 'yyyy-MM-dd');
        } else {
          val = Utilities.formatDate(val, Session.getScriptTimeZone() || 'GMT+7', 'yyyy-MM-dd HH:mm:ss');
        }
      } else if (stringKeys.indexOf(h) !== -1 && val !== null && val !== undefined && val !== '') {
        val = String(val);
      }

      obj[h] = val;
    }
    results.push(obj);
  }
  return results;
}

/**
 * Get Dashboard Statistics
 */
function getDashboardStatsData() {
  const ss = getDb();
  const students = sheetToObjects(ss.getSheetByName(SHEETS.STUDENTS));
  const subjects = sheetToObjects(ss.getSheetByName(SHEETS.SUBJECTS));
  const audits = sheetToObjects(ss.getSheetByName(SHEETS.AUDITS));

  let totalStudents = students.length;
  let maleCount = 0;
  let femaleCount = 0;
  let activeCount = 0;
  let mutationCount = 0;
  let alumniCount = 0;
  const classBreakdown = {};

  students.forEach(s => {
    if (s.gender === 'L' || s.gender === 'Laki-laki') maleCount++;
    if (s.gender === 'P' || s.gender === 'Perempuan') femaleCount++;

    const st = (s.status || '').toLowerCase();
    if (st.indexOf('aktif') !== -1) activeCount++;
    else if (st.indexOf('mutasi') !== -1 || st.indexOf('keluar') !== -1) mutationCount++;
    else if (st.indexOf('alumni') !== -1 || st.indexOf('lulus') !== -1) alumniCount++;
    else activeCount++;

    const cls = s.current_class || 'Belum Ditentukan';
    classBreakdown[cls] = (classBreakdown[cls] || 0) + 1;
  });

  return {
    status: 'success',
    data: {
      totalStudents,
      maleCount,
      femaleCount,
      activeCount,
      mutationCount,
      alumniCount,
      totalSubjects: subjects.length,
      totalAudits: audits.length,
      classBreakdown,
      lastAudit: audits.length > 0 ? audits[audits.length - 1] : null
    }
  };
}

/**
 * Get List of Students with filtering
 */
function getStudentsData(params) {
  const ss = getDb();
  const allStudents = sheetToObjects(ss.getSheetByName(SHEETS.STUDENTS));
  const allParents = sheetToObjects(ss.getSheetByName(SHEETS.PARENTS));
  const allHistories = sheetToObjects(ss.getSheetByName(SHEETS.HISTORIES));

  const parentMap = {};
  allParents.forEach(p => { parentMap[p.student_id] = p; });

  const historyMap = {};
  allHistories.forEach(h => { historyMap[h.student_id] = h; });

  let combined = allStudents.map(s => {
    return {
      ...s,
      parent: parentMap[s.student_id] || {},
      history: historyMap[s.student_id] || {}
    };
  });

  // Filtering
  if (params && params.class && params.class !== 'ALL') {
    combined = combined.filter(s => s.current_class === params.class);
  }
  if (params && params.status && params.status !== 'ALL') {
    combined = combined.filter(s => s.status === params.status);
  }
  if (params && params.search) {
    const q = params.search.toLowerCase();
    combined = combined.filter(s =>
      (s.full_name && s.full_name.toLowerCase().indexOf(q) !== -1) ||
      (s.nis && String(s.nis).indexOf(q) !== -1) ||
      (s.nisn && String(s.nisn).indexOf(q) !== -1)
    );
  }

  return {
    status: 'success',
    total: combined.length,
    data: combined
  };
}

/**
 * Get full detail of single student
 */
function getStudentDetailData(studentId) {
  if (!studentId) return { status: 'error', message: 'ID Siswa wajib disertakan' };

  const ss = getDb();
  const students = sheetToObjects(ss.getSheetByName(SHEETS.STUDENTS));
  const student = students.find(s => s.student_id === studentId);

  if (!student) return { status: 'error', message: 'Siswa tidak ditemukan' };

  const parents = sheetToObjects(ss.getSheetByName(SHEETS.PARENTS)).find(p => p.student_id === studentId) || {};
  const history = sheetToObjects(ss.getSheetByName(SHEETS.HISTORIES)).find(h => h.student_id === studentId) || {};
  const grades = sheetToObjects(ss.getSheetByName(SHEETS.GRADES)).filter(g => g.student_id === studentId);
  const subjects = sheetToObjects(ss.getSheetByName(SHEETS.SUBJECTS));

  return {
    status: 'success',
    data: {
      ...student,
      parent: parents,
      history: history,
      grades: grades,
      subjects: subjects
    }
  };
}

/**
 * Save / Update student data across relational tables
 */
function saveStudentData(data) {
  if (!data) return { status: 'error', message: 'Data siswa kosong' };

  const ss = getDb();
  const studentSheet = getOrCreateSheet(SHEETS.STUDENTS);
  const parentSheet = getOrCreateSheet(SHEETS.PARENTS);
  const historySheet = getOrCreateSheet(SHEETS.HISTORIES);

  let studentId = data.student_id;
  const isNew = !studentId;

  if (isNew) {
    studentId = 'STD-' + new Date().getFullYear() + ('000' + Math.floor(Math.random() * 9000 + 1000)).slice(-4);
    data.student_id = studentId;
  }

  const now = new Date();

  // 1. Update/Insert STUDENTS
  const stdRows = studentSheet.getDataRange().getValues();
  const stdHeaders = stdRows[0];
  let stdRowIdx = -1;

  for (let i = 1; i < stdRows.length; i++) {
    if (stdRows[i][0] === studentId) {
      stdRowIdx = i + 1;
      break;
    }
  }

  const stdRecord = [
    studentId,
    data.nis || '',
    data.nisn || '',
    data.full_name || '',
    data.nickname || '',
    data.gender || 'L',
    data.birth_place || '',
    data.birth_date || '',
    data.religion || 'Islam',
    data.citizenship || 'WNI',
    data.child_order || 1,
    data.siblings_count || 0,
    data.address || '',
    data.rt_rw || '',
    data.village || '',
    data.district || '',
    data.regency || '',
    data.province || '',
    data.postal_code || '',
    data.phone || '',
    data.height || '',
    data.weight || '',
    data.blood_type || '',
    data.medical_notes || '',
    data.photo_url || '',
    data.current_class || 'VII Utsman',
    data.status || 'Aktif',
    isNew ? now : (stdRows[stdRowIdx - 1][27] || now),
    now
  ];

  if (stdRowIdx > 0) {
    studentSheet.getRange(stdRowIdx, 1, 1, stdRecord.length).setValues([stdRecord]);
  } else {
    studentSheet.appendRow(stdRecord);
  }

  // 2. Update/Insert PARENTS
  const parRows = parentSheet.getDataRange().getValues();
  let parRowIdx = -1;
  for (let i = 1; i < parRows.length; i++) {
    if (parRows[i][0] === studentId) {
      parRowIdx = i + 1;
      break;
    }
  }

  const p = data.parent || {};
  const parRecord = [
    studentId,
    p.father_name || '',
    p.father_nik || '',
    p.father_birth || '',
    p.father_edu || '',
    p.father_job || '',
    p.father_income || '',
    p.father_phone || '',
    p.mother_name || '',
    p.mother_nik || '',
    p.mother_birth || '',
    p.mother_edu || '',
    p.mother_job || '',
    p.mother_income || '',
    p.mother_phone || '',
    p.guardian_name || '',
    p.guardian_relation || '',
    p.guardian_job || '',
    p.guardian_address || '',
    p.guardian_phone || ''
  ];

  if (parRowIdx > 0) {
    parentSheet.getRange(parRowIdx, 1, 1, parRecord.length).setValues([parRecord]);
  } else {
    parentSheet.appendRow(parRecord);
  }

  // 3. Update/Insert HISTORIES
  const histRows = historySheet.getDataRange().getValues();
  let histRowIdx = -1;
  for (let i = 1; i < histRows.length; i++) {
    if (histRows[i][0] === studentId) {
      histRowIdx = i + 1;
      break;
    }
  }

  const h = data.history || {};
  const histRecord = [
    studentId,
    h.prev_school || '',
    h.prev_diploma_no || '',
    h.prev_diploma_file || '',
    h.accepted_date || '',
    h.accepted_class || data.current_class || 'VII Utsman',
    h.scholarships || '',
    h.mutation_out_date || '',
    h.mutation_out_reason || '',
    h.graduation_date || '',
    h.graduation_diploma_no || '',
    h.graduation_diploma_file || '',
    h.exam_number || ''
  ];

  if (histRowIdx > 0) {
    historySheet.getRange(histRowIdx, 1, 1, histRecord.length).setValues([histRecord]);
  } else {
    historySheet.appendRow(histRecord);
  }

  return {
    status: 'success',
    message: isNew ? 'Data Siswa Baru Berhasil Ditambahkan!' : 'Data Siswa Berhasil Diperbarui!',
    student_id: studentId
  };
}

/**
 * Delete student and all associated records across tables
 */
function deleteStudentData(studentId) {
  if (!studentId) return { status: 'error', message: 'ID Siswa wajib disertakan' };

  const ss = getDb();
  const tables = [SHEETS.STUDENTS, SHEETS.PARENTS, SHEETS.HISTORIES, SHEETS.GRADES];

  tables.forEach(tableName => {
    const sheet = ss.getSheetByName(tableName);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        const rowStudentId = tableName === SHEETS.GRADES ? data[i][1] : data[i][0];
        if (rowStudentId === studentId) {
          sheet.deleteRow(i + 1);
        }
      }
    }
  });

  return { status: 'success', message: 'Data Siswa dan Relasi Nilai Berhasil Dihapus!' };
}

/**
 * Get Master Subjects
 */
function getSubjectsData() {
  const ss = getDb();
  const subjects = sheetToObjects(ss.getSheetByName(SHEETS.SUBJECTS));
  return { status: 'success', data: subjects };
}

/**
 * Get Grades for specific student
 */
function getGradesData(studentId) {
  if (!studentId) return { status: 'error', message: 'ID Siswa wajib disertakan' };

  const ss = getDb();
  const allGrades = sheetToObjects(ss.getSheetByName(SHEETS.GRADES));
  const studentGrades = allGrades.filter(g => g.student_id === studentId);

  return { status: 'success', data: studentGrades };
}

/**
 * Save Grades Matrix for a student
 */
function saveGradesData(studentId, gradesArray) {
  if (!studentId || !gradesArray) {
    return { status: 'error', message: 'Student ID dan array nilai wajib disertakan' };
  }

  const ss = getDb();
  const sheet = getOrCreateSheet(SHEETS.GRADES);
  const data = sheet.getDataRange().getValues();

  // Remove existing grades for this student first to cleanly insert updated list
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][1] === studentId) {
      sheet.deleteRow(i + 1);
    }
  }

  const newRows = [];
  const now = new Date();

  gradesArray.forEach(g => {
    const gradeId = 'GRD-' + studentId + '-' + g.subject_code + '-S' + g.semester;
    newRows.push([
      gradeId,
      studentId,
      g.subject_code,
      g.semester,
      g.knowledge_score || 0,
      g.knowledge_pred || '',
      g.skill_score || 0,
      g.skill_pred || '',
      g.spiritual_attitude || 'B',
      g.social_attitude || 'B',
      g.final_exam_score || 0,
      now
    ]);
  });

  if (newRows.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, newRows[0].length).setValues(newRows);
  }

  return { status: 'success', message: 'Nilai Transkrip & Rapor Berhasil Disimpan!' };
}

/**
 * Save Audit Log (Inspection by Kepsek / Inspector)
 */
function saveAuditLog(auditData) {
  const ss = getDb();
  const sheet = getOrCreateSheet(SHEETS.AUDITS);
  const auditId = 'AUD-' + new Date().getTime();

  const record = [
    auditId,
    new Date(),
    auditData.auditor_name || 'Kepala Sekolah',
    auditData.auditor_role || 'Kepala Sekolah',
    auditData.action_type || 'Pemeriksaan Buku Induk',
    auditData.notes || 'Buku Induk telah diverifikasi lengkap dan akurat.',
    auditData.approval_status || 'Approved'
  ];

  sheet.appendRow(record);
  return { status: 'success', message: 'Log Audit & Lembar Pemeriksaan Berhasil Disimpan!' };
}

/**
 * Get Audit Logs
 */
function getAuditsData() {
  const ss = getDb();
  const audits = sheetToObjects(ss.getSheetByName(SHEETS.AUDITS));
  return { status: 'success', data: audits };
}

/**
 * Bulk Import Students
 */
function bulkImportStudentsData(studentsList) {
  if (!studentsList || !studentsList.length) {
    return { status: 'error', message: 'Daftar siswa untuk diimpor kosong' };
  }

  let count = 0;
  studentsList.forEach(s => {
    saveStudentData(s);
    count++;
  });

  return { status: 'success', message: 'Berhasil mengimpor ' + count + ' data siswa!', count };
}

/**
 * Export complete database payload
 */
function exportAllDatabaseData() {
  const ss = getDb();
  return {
    status: 'success',
    data: {
      config: getConfigData().data,
      students: sheetToObjects(ss.getSheetByName(SHEETS.STUDENTS)),
      parents: sheetToObjects(ss.getSheetByName(SHEETS.PARENTS)),
      histories: sheetToObjects(ss.getSheetByName(SHEETS.HISTORIES)),
      subjects: sheetToObjects(ss.getSheetByName(SHEETS.SUBJECTS)),
      grades: sheetToObjects(ss.getSheetByName(SHEETS.GRADES)),
      audits: sheetToObjects(ss.getSheetByName(SHEETS.AUDITS)),
      exported_at: new Date()
    }
  };
}

/**
 * Scan Google Drive Folder for Student Photos and return matched metadata list
 * Default Folder: 1_n104erUV1AWG-JhOH8BAyXF196byKiu (cropped smp)
 */
function getDriveFolderPhotos(folderId) {
  try {
    const fId = folderId || '1YBI9x7RW8CtIgsI-ydkKZR_EceWVKti1';
    const folder = DriveApp.getFolderById(fId);
    const files = folder.getFiles();
    const photos = [];
    
    while (files.hasNext()) {
      const file = files.next();
      const name = file.getName();
      const id = file.getId();
      photos.push({
        id: id,
        name: name,
        clean_name: name.replace(/\.(jpg|jpeg|png|webp|JPG|PNG|JPEG)$/i, '').trim(),
        mimeType: file.getMimeType(),
        thumbnail_url: 'https://drive.google.com/thumbnail?id=' + id + '&sz=w500',
        direct_url: 'https://lh3.googleusercontent.com/d/' + id,
        view_url: file.getUrl()
      });
    }

    return {
      status: 'success',
      folder_id: fId,
      folder_name: folder.getName(),
      total_files: photos.length,
      data: photos
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'Gagal membaca folder Google Drive: ' + err.toString()
    };
  }
}

/**
 * Scan Google Drive folder and automatically update photo_url for all matching students in STUDENTS sheet
 */
function syncDrivePhotosData(folderId) {
  try {
    const fId = folderId || '1YBI9x7RW8CtIgsI-ydkKZR_EceWVKti1';
    const folder = DriveApp.getFolderById(fId);
    const files = folder.getFiles();
    
    // Build photo lookup map (normalized name -> photo URL)
    const photoMap = {};
    let totalPhotos = 0;
    while (files.hasNext()) {
      const file = files.next();
      const rawName = file.getName();
      const cleanName = rawName.replace(/\.(jpg|jpeg|png|webp|JPG|PNG|JPEG)$/i, '').trim().toLowerCase();
      const directUrl = 'https://lh3.googleusercontent.com/d/' + file.getId();
      
      photoMap[cleanName] = {
        id: file.getId(),
        raw_name: rawName,
        url: directUrl,
        thumbnail: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w500'
      };
      totalPhotos++;
    }

    const ss = getDb();
    const sheet = ss.getSheetByName(SHEETS.STUDENTS);
    if (!sheet) return { status: 'error', message: 'Sheet STUDENTS tidak ditemukan di spreadsheet' };

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return { status: 'error', message: 'Tidak ada data siswa' };

    const headers = data[0];
    const nameColIdx = headers.indexOf('full_name');
    const photoColIdx = headers.indexOf('photo_url');

    if (nameColIdx === -1 || photoColIdx === -1) {
      return { status: 'error', message: 'Kolom full_name atau photo_url tidak ditemukan di sheet STUDENTS' };
    }

    let updatedCount = 0;
    const updatedStudents = [];

    for (let i = 1; i < data.length; i++) {
      const studentName = String(data[i][nameColIdx] || '').trim();
      if (!studentName) continue;
      
      const normStudentName = studentName.toLowerCase();
      
      let matched = photoMap[normStudentName];
      if (!matched) {
        // try fuzzy match ignoring whitespace and punctuation
        const stripped = normStudentName.replace(/[^a-z0-9]/g, '');
        for (let k in photoMap) {
          if (k.replace(/[^a-z0-9]/g, '') === stripped) {
            matched = photoMap[k];
            break;
          }
        }
      }

      if (matched) {
        sheet.getRange(i + 1, photoColIdx + 1).setValue(matched.url);
        updatedCount++;
        updatedStudents.push({
          student_id: data[i][0],
          name: studentName,
          photo_url: matched.url
        });
      }
    }

    // Save audit log
    saveAuditLog({
      auditor_name: 'Sistem Sinkronisasi Drive',
      auditor_role: 'Administrator IT',
      action_type: 'Sinkronisasi Foto Siswa',
      notes: 'Sinkronisasi otomatis foto siswa dari folder Google Drive (' + fId + '). Berhasil memperbarui ' + updatedCount + ' dari ' + totalPhotos + ' foto siswa.',
      approval_status: 'Synced'
    });

    return {
      status: 'success',
      message: 'Berhasil menyinkronkan ' + updatedCount + ' foto siswa dari Google Drive (' + folder.getName() + ')!',
      total_drive_photos: totalPhotos,
      matched_count: updatedCount,
      updated_students: updatedStudents
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'Gagal menyinkronkan foto Google Drive: ' + err.toString()
    };
  }
}
