// Initialize patients array from localStorage or empty array
let patients = JSON.parse(localStorage.getItem('patients')) || [];

// Function to save patients to localStorage
function savePatients() {
    localStorage.setItem('patients', JSON.stringify(patients));
}

// Add this function at the beginning of script.js
function generatePatientId() {
    const lastPatient = patients[patients.length - 1];
    let nextNumber = 1;
    
    if (lastPatient) {
        // Extract the number from the last ID
        nextNumber = parseInt(lastPatient.patientId) + 1;
    }
    
    return nextNumber.toString();
}

// Function to add a new patient
function addPatient(e) {
    e.preventDefault();

    const currentDate = new Date();
    const patientId = generatePatientId();

    // Check if patient ID already exists
    if (patients.some(p => p.patientId === patientId)) {
        alert('Patient ID already exists. Please use a unique ID.');
        return;
    }

    // Get selected main complaint options
    const mainComplaintCheckboxes = document.querySelectorAll('input[name="mainComplaint"]:checked');
    const selectedMainComplaints = Array.from(mainComplaintCheckboxes).map(cb => cb.value);
    const otherMainComplaint = document.getElementById('mainComplaintOther').value;

    // Get selected ocular history options
    const ocularHistoryCheckboxes = document.querySelectorAll('input[name="ocularHistory"]:checked');
    const selectedOcularHistory = Array.from(ocularHistoryCheckboxes).map(cb => cb.value);
    const otherOcularHistory = document.getElementById('ocularHistoryOther').value;

    // Get selected medical history options
    const medicalHistoryCheckboxes = document.querySelectorAll('input[name="medicalHistory"]:checked');
    const selectedMedicalHistory = Array.from(medicalHistoryCheckboxes).map(cb => cb.value);
    const otherMedicalHistory = document.getElementById('medicalHistoryOther').value;

    const patient = {
        id: Date.now(),
        patientId: patientId,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        visitDateTime: currentDate.toISOString(),
        mainComplaint: {
            selected: selectedMainComplaints,
            other: otherMainComplaint
        },
        ocularHistory: {
            selected: selectedOcularHistory,
            other: otherOcularHistory
        },
        medicalHistory: {
            selected: selectedMedicalHistory,
            other: otherMedicalHistory
        },
        visualAcuity: {
            rightEye: {
                ucva: document.querySelector('.va-button[data-eye="right"][data-type="ucva"].selected')?.textContent || 'N/A'
            },
            leftEye: {
                ucva: document.querySelector('.va-button[data-eye="left"][data-type="ucva"].selected')?.textContent || 'N/A'
            }
        },
        pgp: {
            right: {
                distance: {
                    sph: document.getElementById('pgpRightDistSph').value,
                    cyl: document.getElementById('pgpRightDistCyl').value,
                    axis: document.getElementById('pgpRightDistAxis').value,
                    va: document.getElementById('pgpRightDistVa').value
                },
                near: {
                    sph: document.getElementById('pgpRightNearSph').value,
                    cyl: document.getElementById('pgpRightNearCyl').value,
                    axis: document.getElementById('pgpRightNearAxis').value,
                    va: document.getElementById('pgpRightNearVa').value
                }
            },
            left: {
                distance: {
                    sph: document.getElementById('pgpLeftDistSph').value,
                    cyl: document.getElementById('pgpLeftDistCyl').value,
                    axis: document.getElementById('pgpLeftDistAxis').value,
                    va: document.getElementById('pgpLeftDistVa').value
                },
                near: {
                    sph: document.getElementById('pgpLeftNearSph').value,
                    cyl: document.getElementById('pgpLeftNearCyl').value,
                    axis: document.getElementById('pgpLeftNearAxis').value,
                    va: document.getElementById('pgpLeftNearVa').value
                }
            }
        },
        autoRefraction: {
            right: {
                distance: {
                    sph: document.getElementById('autoRightDistSph').value,
                    cyl: document.getElementById('autoRightDistCyl').value,
                    axis: document.getElementById('autoRightDistAxis').value
                },
                near: {
                    sph: document.getElementById('autoRightNearSph').value,
                    cyl: document.getElementById('autoRightNearCyl').value,
                    axis: document.getElementById('autoRightNearAxis').value
                }
            },
            left: {
                distance: {
                    sph: document.getElementById('autoLeftDistSph').value,
                    cyl: document.getElementById('autoLeftDistCyl').value,
                    axis: document.getElementById('autoLeftDistAxis').value
                },
                near: {
                    sph: document.getElementById('autoLeftNearSph').value,
                    cyl: document.getElementById('autoLeftNearCyl').value,
                    axis: document.getElementById('autoLeftNearAxis').value
                }
            }
        },
        subjectiveRefraction: {
            right: {
                distance: {
                    sph: document.getElementById('subRightDistSph').value,
                    cyl: document.getElementById('subRightDistCyl').value,
                    axis: document.getElementById('subRightDistAxis').value,
                    va: document.getElementById('subRightDistVa').value
                },
                near: {
                    sph: document.getElementById('subRightNearSph').value,
                    cyl: document.getElementById('subRightNearCyl').value,
                    axis: document.getElementById('subRightNearAxis').value,
                    va: document.getElementById('subRightNearVa').value
                }
            },
            left: {
                distance: {
                    sph: document.getElementById('subLeftDistSph').value,
                    cyl: document.getElementById('subLeftDistCyl').value,
                    axis: document.getElementById('subLeftDistAxis').value,
                    va: document.getElementById('subLeftDistVa').value
                },
                near: {
                    sph: document.getElementById('subLeftNearSph').value,
                    cyl: document.getElementById('subLeftNearCyl').value,
                    axis: document.getElementById('subLeftNearAxis').value,
                    va: document.getElementById('subLeftNearVa').value
                }
            }
        },
        glassPrescription: {
            right: {
                sph: document.getElementById('rightSph').value,
                cyl: document.getElementById('rightCyl').value,
                axis: document.getElementById('rightAxis').value,
                prism: document.getElementById('rightPrism').value,
                add: document.getElementById('rightAdd').value
            },
            left: {
                sph: document.getElementById('leftSph').value,
                cyl: document.getElementById('leftCyl').value,
                axis: document.getElementById('leftAxis').value,
                prism: document.getElementById('leftPrism').value,
                add: document.getElementById('leftAdd').value
            },
            pd: document.getElementById('pd').value,
            comments: document.getElementById('prescriptionComments').value
        }
    };

    patients.push(patient);
    savePatients();
    displayPatients();
    e.target.reset();
}

// Function to delete a patient
function deletePatient(id) {
    patients = patients.filter(patient => patient.id !== id);
    savePatients();
    displayPatients();
}

// Function to display patients
function displayPatients() {
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = '';

    patients.forEach(patient => {
        const patientCard = document.createElement('div');
        patientCard.className = 'patient-card';
        patientCard.innerHTML = `
            <button class="delete-btn" onclick="deletePatient(${patient.id})">Delete</button>
            
            <div class="patient-info">
                <div class="info-item">
                    <h4>Patient ID</h4>
                    <p>${patient.patientId}</p>
                </div>
                <div class="info-item">
                    <h4>Name</h4>
                    <p>${patient.name}</p>
                </div>
                <div class="info-item">
                    <h4>Age</h4>
                    <p>${patient.age}</p>
                </div>
                <div class="info-item">
                    <h4>Gender</h4>
                    <p>${patient.gender || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <h4>Phone</h4>
                    <p>${patient.phone}</p>
                </div>
                <div class="info-item full-width">
                    <h4>Address</h4>
                    <p>${patient.address || 'N/A'}</p>
                </div>
            </div>

            <div class="details-grid">
                <div class="detail-section">
                    <h4>Main Complaint</h4>
                    ${patient.mainComplaint.selected && patient.mainComplaint.selected.length > 0 
                        ? `<p class="history-tags">${patient.mainComplaint.selected.map(item => 
                            `<span class="history-tag">${item}</span>`).join('')}</p>` 
                        : ''}
                    ${patient.mainComplaint.other 
                        ? `<p class="other-history">Other: ${patient.mainComplaint.other}</p>` 
                        : ''}
                </div>
                
                <div class="detail-section">
                    <h4>Ocular History</h4>
                    ${patient.ocularHistory.selected && patient.ocularHistory.selected.length > 0 
                        ? `<p class="history-tags">${patient.ocularHistory.selected.map(item => 
                            `<span class="history-tag">${item}</span>`).join('')}</p>` 
                        : ''}
                    ${patient.ocularHistory.other 
                        ? `<p class="other-history">Other: ${patient.ocularHistory.other}</p>` 
                        : ''}
                </div>
                
                <div class="detail-section">
                    <h4>Medical History</h4>
                    ${patient.medicalHistory.selected && patient.medicalHistory.selected.length > 0 
                        ? `<p class="history-tags">${patient.medicalHistory.selected.map(item => 
                            `<span class="history-tag">${item}</span>`).join('')}</p>` 
                        : ''}
                    ${patient.medicalHistory.other 
                        ? `<p class="other-history">Other: ${patient.medicalHistory.other}</p>` 
                        : ''}
                </div>

                <div class="detail-section">
                    <h4>Visual Acuity</h4>
                    <p>Right Eye: ${patient.visualAcuity.rightEye.ucva || 'N/A'}</p>
                    <p>Left Eye: ${patient.visualAcuity.leftEye.ucva || 'N/A'}</p>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Subjective Refraction</h4>
                    <div class="prescription-container">
                        <div class="prescription-section">
                            <h5>Right Eye (OD)</h5>
                            <table class="prescription-display">
                                <tr>
                                    <th>Rx</th>
                                    <th>Sphere</th>
                                    <th>Cylinder</th>
                                    <th>Axis</th>
                                    <th>VA</th>
                                </tr>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.subjectiveRefraction.right.distance.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.distance.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.distance.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.distance.va || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.subjectiveRefraction.right.near.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.near.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.near.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.near.va || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="prescription-section">
                            <h5>Left Eye (OS)</h5>
                            <table class="prescription-display">
                                <tr>
                                    <th>Rx</th>
                                    <th>Sphere</th>
                                    <th>Cylinder</th>
                                    <th>Axis</th>
                                    <th>VA</th>
                                </tr>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.subjectiveRefraction.left.distance.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.distance.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.distance.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.distance.va || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.subjectiveRefraction.left.near.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.near.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.near.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.near.va || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Glass Prescription</h4>
                    <div class="prescription-container">
                        <table class="prescription-display">
                            <tr>
                                <th>Rx</th>
                                <th>Sphere</th>
                                <th>Cylinder</th>
                                <th>Axis</th>
                                <th>Prism</th>
                                <th>Add</th>
                            </tr>
                            <tr>
                                <td>Right (OD)</td>
                                <td>${patient.glassPrescription.right.sph || 'N/A'}</td>
                                <td>${patient.glassPrescription.right.cyl || 'N/A'}</td>
                                <td>${patient.glassPrescription.right.axis || 'N/A'}</td>
                                <td>${patient.glassPrescription.right.prism || '-'}</td>
                                <td>${patient.glassPrescription.right.add || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Left (OS)</td>
                                <td>${patient.glassPrescription.left.sph || 'N/A'}</td>
                                <td>${patient.glassPrescription.left.cyl || 'N/A'}</td>
                                <td>${patient.glassPrescription.left.axis || 'N/A'}</td>
                                <td>${patient.glassPrescription.left.prism || '-'}</td>
                                <td>${patient.glassPrescription.left.add || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                                <td>PD</td>
                                <td>${patient.glassPrescription.pd || 'N/A'}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Comments</h4>
                    <div class="comments-box">
                        <p>${patient.glassPrescription.comments || 'No comments'}</p>
                    </div>
                </div>
            </div>
        `;
        patientsList.appendChild(patientCard);
    });

    // Update dashboard stats
    updateDashboardStats();

    // Update quick list
    updateQuickList();
}

// Event Listeners
document.getElementById('patientForm').addEventListener('submit', addPatient);

// Initial display
displayPatients();

// Add this after your existing code
document.querySelectorAll('.va-button').forEach(button => {
    button.addEventListener('click', function() {
        const eye = this.dataset.eye;
        const type = this.dataset.type;
        
        // Deselect other buttons in the same group
        document.querySelectorAll(`.va-button[data-eye="${eye}"][data-type="${type}"]`)
            .forEach(btn => btn.classList.remove('selected'));
        
        // Select this button
        this.classList.add('selected');
        
        // Store the value
        const value = this.textContent;
        document.getElementById(`va${eye.charAt(0).toUpperCase() + eye.slice(1)}${type.toUpperCase()}`).value = value;
    });
});

// Add these functions at the beginning of your script.js
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeNav = document.querySelector(`.nav-item[onclick*="${sectionId}"]`);
    if (activeNav) activeNav.classList.add('active');

    // If showing profile section, populate the data
    if (sectionId === 'profileSection') {
        const profileSection = document.getElementById('profileSection');
        profileSection.innerHTML = `
            <div class="profile-header">
                <h2>Profile</h2>
                <button class="settings-btn" onclick="showProfileSettings()">
                    <i class="fas fa-cog"></i> Settings
                </button>
            </div>
            <div class="profile-content">
                <div class="profile-card">
                    <div class="profile-info">
                        <div class="clinic-details">
                            <h3>${localStorage.getItem('clinicName') || 'Sarafath Opticals'}</h3>
                            <p class="qualification">${localStorage.getItem('qualification') || 'Add your qualification'}</p>
                            <p class="doctor-name">Dr. ${localStorage.getItem('doctorName') || 'Add doctor name'}</p>
                            <p class="registration">Reg. No: ${localStorage.getItem('registrationNumber') || 'Add registration number'}</p>
                        </div>
                        <div class="contact-details">
                            <p><i class="fas fa-phone"></i> ${localStorage.getItem('clinicPhone') || 'Add phone number'}</p>
                            <p><i class="fas fa-envelope"></i> ${localStorage.getItem('clinicEmail') || 'Add email'}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${localStorage.getItem('clinicAddress') || 'Add clinic address'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateDashboardStats() {
    const totalPatients = patients.length;
    const today = new Date().toDateString();
    const todayPatients = patients.filter(p => 
        new Date(p.id).toDateString() === today
    ).length;
    const totalPrescriptions = patients.filter(p => 
        p.glassPrescription.right.sph || p.glassPrescription.left.sph
    ).length;

    document.getElementById('totalPatients').textContent = totalPatients;
    document.getElementById('todayPatients').textContent = todayPatients;
    document.getElementById('totalPrescriptions').textContent = totalPrescriptions;
}

// Initial dashboard update
updateDashboardStats();

// Add this function to update the quick list
function updateQuickList(filteredPatients = patients) {
    const quickList = document.getElementById('patientQuickList');
    quickList.innerHTML = '';

    filteredPatients.forEach(patient => {
        const visitDate = new Date(patient.visitDateTime);
        const formattedDate = visitDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.patientId}</td>
            <td>${patient.name}</td>
            <td class="timestamp-column">${formattedDate}</td>
            <td>
                <button class="view-details-btn" onclick="showPatientDetails('${patient.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        quickList.appendChild(row);
    });
}

// Update the showPatientDetails function
function showPatientDetails(patientId) {
    const patient = patients.find(p => p.id.toString() === patientId);
    if (!patient) return;

    // Show the container
    const detailsContainer = document.getElementById('patientDetailsContainer');
    detailsContainer.classList.add('show');

    // Format the date and time
    const visitDate = new Date(patient.visitDateTime);
    const formattedDate = visitDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = visitDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = ''; // Clear current display

    const patientCard = document.createElement('div');
    patientCard.className = 'patient-card';
    patientCard.innerHTML = `
        <div class="card-header">
            <div class="timestamp">
                <div class="date">
                    <i class="far fa-calendar"></i>
                    ${formattedDate}
                </div>
                <div class="time">
                    <i class="far fa-clock"></i>
                    ${formattedTime}
                </div>
            </div>
            <div class="header-buttons">
                <button class="edit-btn" onclick="editPatient(${JSON.stringify(patient).replace(/"/g, '&quot;')})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="print-btn" onclick="printPatientDetails(${JSON.stringify(patient).replace(/"/g, '&quot;')})">
                    <i class="fas fa-print"></i> Print Details
                </button>
                <button class="print-btn" onclick="printPrescription(${JSON.stringify(patient).replace(/"/g, '&quot;')})">
                    <i class="fas fa-print"></i> Print Prescription
                </button>
                <button class="delete-btn" onclick="deletePatient(${patient.id})">Delete</button>
                <button class="close-btn" onclick="hidePatientDetails()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        
        <div class="patient-info">
            <div class="info-item">
                <h4>Patient ID</h4>
                <p>${patient.patientId}</p>
            </div>
            <div class="info-item">
                <h4>Name</h4>
                <p>${patient.name}</p>
            </div>
            <div class="info-item">
                <h4>Age</h4>
                <p>${patient.age}</p>
            </div>
            <div class="info-item">
                <h4>Gender</h4>
                <p>${patient.gender || 'N/A'}</p>
            </div>
            <div class="info-item">
                <h4>Phone</h4>
                <p>${patient.phone}</p>
            </div>
            <div class="info-item full-width">
                <h4>Address</h4>
                <p>${patient.address || 'N/A'}</p>
            </div>
        </div>

        <div class="details-grid">
            <div class="detail-section">
                <h4>Main Complaint</h4>
                ${patient.mainComplaint.selected && patient.mainComplaint.selected.length > 0 
                    ? `<p class="history-tags">${patient.mainComplaint.selected.map(item => 
                        `<span class="history-tag">${item}</span>`).join('')}</p>` 
                    : ''}
                ${patient.mainComplaint.other 
                    ? `<p class="other-history">Other: ${patient.mainComplaint.other}</p>` 
                    : ''}
            </div>
            
            <div class="detail-section">
                <h4>Ocular History</h4>
                ${patient.ocularHistory.selected && patient.ocularHistory.selected.length > 0 
                    ? `<p class="history-tags">${patient.ocularHistory.selected.map(item => 
                        `<span class="history-tag">${item}</span>`).join('')}</p>` 
                    : ''}
                ${patient.ocularHistory.other 
                    ? `<p class="other-history">Other: ${patient.ocularHistory.other}</p>` 
                    : ''}
            </div>
            
            <div class="detail-section">
                <h4>Medical History</h4>
                ${patient.medicalHistory.selected && patient.medicalHistory.selected.length > 0 
                    ? `<p class="history-tags">${patient.medicalHistory.selected.map(item => 
                        `<span class="history-tag">${item}</span>`).join('')}</p>` 
                    : ''}
                ${patient.medicalHistory.other 
                    ? `<p class="other-history">Other: ${patient.medicalHistory.other}</p>` 
                    : ''}
            </div>

            <div class="detail-section">
                <h4>Visual Acuity</h4>
                <p>Right Eye: ${patient.visualAcuity.rightEye.ucva || 'N/A'}</p>
                <p>Left Eye: ${patient.visualAcuity.leftEye.ucva || 'N/A'}</p>
            </div>

            <div class="detail-section prescription-box">
                <h4>Previous Glass Prescription (PGP)</h4>
                <div class="prescription-container">
                    <h5>Right Eye (OD)</h5>
                    <table class="prescription-display">
                        <thead>
                            <tr>
                                <th>Rx</th>
                                <th>Sphere</th>
                                <th>Cylinder</th>
                                <th>Axis</th>
                                <th>VA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Distance</td>
                                <td>${patient.pgp.right.distance.sph || 'N/A'}</td>
                                <td>${patient.pgp.right.distance.cyl || 'N/A'}</td>
                                <td>${patient.pgp.right.distance.axis || 'N/A'}</td>
                                <td>${patient.pgp.right.distance.va || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Near</td>
                                <td>${patient.pgp.right.near.sph || 'N/A'}</td>
                                <td>${patient.pgp.right.near.cyl || 'N/A'}</td>
                                <td>${patient.pgp.right.near.axis || 'N/A'}</td>
                                <td>${patient.pgp.right.near.va || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5>Left Eye (OS)</h5>
                    <table class="prescription-display">
                        <thead>
                            <tr>
                                <th>Rx</th>
                                <th>Sphere</th>
                                <th>Cylinder</th>
                                <th>Axis</th>
                                <th>VA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Distance</td>
                                <td>${patient.pgp.left.distance.sph || 'N/A'}</td>
                                <td>${patient.pgp.left.distance.cyl || 'N/A'}</td>
                                <td>${patient.pgp.left.distance.axis || 'N/A'}</td>
                                <td>${patient.pgp.left.distance.va || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Near</td>
                                <td>${patient.pgp.left.near.sph || 'N/A'}</td>
                                <td>${patient.pgp.left.near.cyl || 'N/A'}</td>
                                <td>${patient.pgp.left.near.axis || 'N/A'}</td>
                                <td>${patient.pgp.left.near.va || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="detail-section prescription-box">
                <h4>Auto Refraction</h4>
                <div class="prescription-container">
                    <h5>Right Eye (OD)</h5>
                    <table class="prescription-display">
                        <thead>
                            <tr>
                                <th>Rx</th>
                                <th>Spherical</th>
                                <th>Cylindrical</th>
                                <th>Axis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Distance</td>
                                <td>${patient.autoRefraction.right.distance.sph || 'N/A'}</td>
                                <td>${patient.autoRefraction.right.distance.cyl || 'N/A'}</td>
                                <td>${patient.autoRefraction.right.distance.axis || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Near</td>
                                <td>${patient.autoRefraction.right.near.sph || 'N/A'}</td>
                                <td>${patient.autoRefraction.right.near.cyl || 'N/A'}</td>
                                <td>${patient.autoRefraction.right.near.axis || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5>Left Eye (OS)</h5>
                    <table class="prescription-display">
                        <thead>
                            <tr>
                                <th>Rx</th>
                                <th>Spherical</th>
                                <th>Cylindrical</th>
                                <th>Axis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Distance</td>
                                <td>${patient.autoRefraction.left.distance.sph || 'N/A'}</td>
                                <td>${patient.autoRefraction.left.distance.cyl || 'N/A'}</td>
                                <td>${patient.autoRefraction.left.distance.axis || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Near</td>
                                <td>${patient.autoRefraction.left.near.sph || 'N/A'}</td>
                                <td>${patient.autoRefraction.left.near.cyl || 'N/A'}</td>
                                <td>${patient.autoRefraction.left.near.axis || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="detail-section prescription-box">
                <h4>Subjective Refraction</h4>
                <div class="prescription-container">
                    <div class="prescription-section">
                        <h5>Right Eye (OD)</h5>
                        <table class="prescription-display">
                            <tr>
                                <th>Rx</th>
                                <th>Sphere</th>
                                <th>Cylinder</th>
                                <th>Axis</th>
                                <th>VA</th>
                            </tr>
                            <tr>
                                <td>Distance</td>
                                <td>${patient.subjectiveRefraction.right.distance.sph || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.right.distance.cyl || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.right.distance.axis || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.right.distance.va || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Near</td>
                                <td>${patient.subjectiveRefraction.right.near.sph || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.right.near.cyl || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.right.near.axis || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.right.near.va || 'N/A'}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="prescription-section">
                        <h5>Left Eye (OS)</h5>
                        <table class="prescription-display">
                            <tr>
                                <th>Rx</th>
                                <th>Sphere</th>
                                <th>Cylinder</th>
                                <th>Axis</th>
                                <th>VA</th>
                            </tr>
                            <tr>
                                <td>Distance</td>
                                <td>${patient.subjectiveRefraction.left.distance.sph || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.left.distance.cyl || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.left.distance.axis || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.left.distance.va || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Near</td>
                                <td>${patient.subjectiveRefraction.left.near.sph || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.left.near.cyl || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.left.near.axis || 'N/A'}</td>
                                <td>${patient.subjectiveRefraction.left.near.va || 'N/A'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="detail-section prescription-box">
                <h4>Glass Prescription</h4>
                <div class="prescription-container">
                    <table class="prescription-display">
                        <tr>
                            <th>Rx</th>
                            <th>Sphere</th>
                            <th>Cylinder</th>
                            <th>Axis</th>
                            <th>Prism</th>
                            <th>Add</th>
                        </tr>
                        <tr>
                            <td>Right (OD)</td>
                            <td>${patient.glassPrescription.right.sph || 'N/A'}</td>
                            <td>${patient.glassPrescription.right.cyl || 'N/A'}</td>
                            <td>${patient.glassPrescription.right.axis || 'N/A'}</td>
                            <td>${patient.glassPrescription.right.prism || '-'}</td>
                            <td>${patient.glassPrescription.right.add || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Left (OS)</td>
                            <td>${patient.glassPrescription.left.sph || 'N/A'}</td>
                            <td>${patient.glassPrescription.left.cyl || 'N/A'}</td>
                            <td>${patient.glassPrescription.left.axis || 'N/A'}</td>
                            <td>${patient.glassPrescription.left.prism || '-'}</td>
                            <td>${patient.glassPrescription.left.add || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td>PD</td>
                            <td>${patient.glassPrescription.pd || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="detail-section prescription-box">
                <h4>Comments</h4>
                <div class="comments-box">
                    <p>${patient.glassPrescription.comments || 'No comments'}</p>
                </div>
            </div>
        </div>
    `;
    patientsList.appendChild(patientCard);
}

function editPatient(patient) {
    // Create edit form HTML
    const editForm = document.createElement('div');
    editForm.className = 'edit-form';
    editForm.innerHTML = `
        <div class="edit-form-header">
            <h3>Edit Patient Details</h3>
            <button class="close-btn" onclick="cancelEdit()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <form id="editPatientForm" onsubmit="savePatientEdit(event, ${patient.id})">
            <div class="form-section">
                <h4>Basic Information</h4>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="editName">Name</label>
                        <input type="text" id="editName" value="${patient.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="editAge">Age</label>
                        <input type="number" id="editAge" value="${patient.age}" required>
                    </div>
                    <div class="form-group">
                        <label for="editGender">Gender</label>
                        <select id="editGender" required>
                            <option value="Male" ${patient.gender === 'Male' ? 'selected' : ''}>Male</option>
                            <option value="Female" ${patient.gender === 'Female' ? 'selected' : ''}>Female</option>
                            <option value="Other" ${patient.gender === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editPhone">Phone</label>
                        <input type="tel" id="editPhone" value="${patient.phone}" required>
                    </div>
                    <div class="form-group full-width">
                        <label for="editAddress">Address</label>
                        <textarea id="editAddress">${patient.address || ''}</textarea>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h4>Glass Prescription</h4>
                <div class="prescription-edit-grid">
                    <div class="eye-section">
                        <h5>Right Eye (OD)</h5>
                        <div class="prescription-inputs">
                            <div class="form-group">
                                <label>Sphere</label>
                                <input type="text" id="editRightSph" value="${patient.glassPrescription.right.sph || ''}">
                            </div>
                            <div class="form-group">
                                <label>Cylinder</label>
                                <input type="text" id="editRightCyl" value="${patient.glassPrescription.right.cyl || ''}">
                            </div>
                            <div class="form-group">
                                <label>Axis</label>
                                <input type="text" id="editRightAxis" value="${patient.glassPrescription.right.axis || ''}">
                            </div>
                            <div class="form-group">
                                <label>Add</label>
                                <input type="text" id="editRightAdd" value="${patient.glassPrescription.right.add || ''}">
                            </div>
                        </div>
                    </div>
                    <div class="eye-section">
                        <h5>Left Eye (OS)</h5>
                        <div class="prescription-inputs">
                            <div class="form-group">
                                <label>Sphere</label>
                                <input type="text" id="editLeftSph" value="${patient.glassPrescription.left.sph || ''}">
                            </div>
                            <div class="form-group">
                                <label>Cylinder</label>
                                <input type="text" id="editLeftCyl" value="${patient.glassPrescription.left.cyl || ''}">
                            </div>
                            <div class="form-group">
                                <label>Axis</label>
                                <input type="text" id="editLeftAxis" value="${patient.glassPrescription.left.axis || ''}">
                            </div>
                            <div class="form-group">
                                <label>Add</label>
                                <input type="text" id="editLeftAdd" value="${patient.glassPrescription.left.add || ''}">
                            </div>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label for="editPD">PD</label>
                        <input type="text" id="editPD" value="${patient.glassPrescription.pd || ''}">
                    </div>
                    <div class="form-group full-width">
                        <label for="editComments">Comments</label>
                        <textarea id="editComments">${patient.glassPrescription.comments || ''}</textarea>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="save-btn">Save Changes</button>
                <button type="button" class="cancel-btn" onclick="cancelEdit()">Cancel</button>
            </div>
        </form>
    `;

    // Replace patient card with edit form
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = '';
    patientsList.appendChild(editForm);
}

function cancelEdit() {
    // Refresh the patient details view
    const currentPatientId = patients[patients.length - 1].id;
    showPatientDetails(currentPatientId.toString());
}

function savePatientEdit(event, patientId) {
    event.preventDefault();

    // Find patient index
    const patientIndex = patients.findIndex(p => p.id === patientId);
    if (patientIndex === -1) return;

    // Get current patient to preserve other data
    const patient = {...patients[patientIndex]};

    // Update basic information
    patient.name = document.getElementById('editName').value;
    patient.age = document.getElementById('editAge').value;
    patient.gender = document.getElementById('editGender').value;
    patient.phone = document.getElementById('editPhone').value;
    patient.address = document.getElementById('editAddress').value;

    // Update glass prescription
    patient.glassPrescription = {
        right: {
            sph: document.getElementById('editRightSph').value,
            cyl: document.getElementById('editRightCyl').value,
            axis: document.getElementById('editRightAxis').value,
            add: document.getElementById('editRightAdd').value,
            prism: patient.glassPrescription.right.prism // Preserve existing prism value
        },
        left: {
            sph: document.getElementById('editLeftSph').value,
            cyl: document.getElementById('editLeftCyl').value,
            axis: document.getElementById('editLeftAxis').value,
            add: document.getElementById('editLeftAdd').value,
            prism: patient.glassPrescription.left.prism // Preserve existing prism value
        },
        pd: document.getElementById('editPD').value,
        comments: document.getElementById('editComments').value
    };

    // Update patient in array
    patients[patientIndex] = patient;
    
    // Save to localStorage
    savePatients();

    // Show success message
    alert('Patient details updated successfully!');

    // Refresh the patient details view
    showPatientDetails(patientId.toString());
}

// Add this new function to hide patient details
function hidePatientDetails() {
    const detailsContainer = document.getElementById('patientDetailsContainer');
    detailsContainer.classList.remove('show');
}

// Update the searchPatients function
function searchPatients() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filters = Array.from(document.querySelectorAll('input[name="searchFilter"]:checked'))
        .map(checkbox => checkbox.value);
    
    const filteredPatients = patients.filter(patient => {
        if (searchInput === '') return true;
        
        return filters.some(filter => {
            switch(filter) {
                case 'id':
                    return patient.patientId.toLowerCase().includes(searchInput);
                case 'name':
                    return patient.name.toLowerCase().includes(searchInput);
                case 'phone':
                    return patient.phone.toLowerCase().includes(searchInput);
                case 'age':
                    return patient.age.toString().toLowerCase().includes(searchInput);
                default:
                    return false;
            }
        });
    });

    // Hide patient details when searching
    hidePatientDetails();
    
    // Update both the quick list and detailed view
    updateQuickList(filteredPatients);
    // Don't display filtered patients immediately
    // displayFilteredPatients(filteredPatients);
}

// Update the displayFilteredPatients function
function displayFilteredPatients(filteredPatients) {
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = '';

    if (filteredPatients.length === 0) {
        patientsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <p>No patients found matching your search criteria</p>
            </div>
        `;
        return;
    }

    filteredPatients.forEach(patient => {
        const visitDate = new Date(patient.visitDateTime);
        const formattedDate = visitDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedTime = visitDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const patientCard = document.createElement('div');
        patientCard.className = 'patient-card';
        patientCard.innerHTML = `
            <div class="card-header">
                <div class="timestamp">
                    <div class="date">
                        <i class="far fa-calendar"></i>
                        ${formattedDate}
                    </div>
                    <div class="time">
                        <i class="far fa-clock"></i>
                        ${formattedTime}
                    </div>
                </div>
                <div class="header-buttons">
                    <button class="delete-btn" onclick="deletePatient(${patient.id})">Delete</button>
                </div>
            </div>
            
            <div class="patient-info">
                <div class="info-item">
                    <h4>Patient ID</h4>
                    <p>${patient.patientId}</p>
                </div>
                <div class="info-item">
                    <h4>Name</h4>
                    <p>${patient.name}</p>
                </div>
                <div class="info-item">
                    <h4>Age</h4>
                    <p>${patient.age}</p>
                </div>
                <div class="info-item">
                    <h4>Gender</h4>
                    <p>${patient.gender || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <h4>Phone</h4>
                    <p>${patient.phone}</p>
                </div>
                <div class="info-item full-width">
                    <h4>Address</h4>
                    <p>${patient.address || 'N/A'}</p>
                </div>
            </div>

            <div class="details-grid">
                <div class="detail-section">
                    <h4>Main Complaint</h4>
                    ${patient.mainComplaint.selected && patient.mainComplaint.selected.length > 0 
                        ? `<p class="history-tags">${patient.mainComplaint.selected.map(item => 
                            `<span class="history-tag">${item}</span>`).join('')}</p>` 
                        : ''}
                    ${patient.mainComplaint.other 
                        ? `<p class="other-history">Other: ${patient.mainComplaint.other}</p>` 
                        : ''}
                </div>
                
                <div class="detail-section">
                    <h4>Ocular History</h4>
                    ${patient.ocularHistory.selected && patient.ocularHistory.selected.length > 0 
                        ? `<p class="history-tags">${patient.ocularHistory.selected.map(item => 
                            `<span class="history-tag">${item}</span>`).join('')}</p>` 
                        : ''}
                    ${patient.ocularHistory.other 
                        ? `<p class="other-history">Other: ${patient.ocularHistory.other}</p>` 
                        : ''}
                </div>
                
                <div class="detail-section">
                    <h4>Medical History</h4>
                    ${patient.medicalHistory.selected && patient.medicalHistory.selected.length > 0 
                        ? `<p class="history-tags">${patient.medicalHistory.selected.map(item => 
                            `<span class="history-tag">${item}</span>`).join('')}</p>` 
                        : ''}
                    ${patient.medicalHistory.other 
                        ? `<p class="other-history">Other: ${patient.medicalHistory.other}</p>` 
                        : ''}
                </div>

                <div class="detail-section">
                    <h4>Visual Acuity</h4>
                    <p>Right Eye: ${patient.visualAcuity.rightEye.ucva || 'N/A'}</p>
                    <p>Left Eye: ${patient.visualAcuity.leftEye.ucva || 'N/A'}</p>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Previous Glass Prescription (PGP)</h4>
                    <div class="prescription-container">
                        <h5>Right Eye (OD)</h5>
                        <table class="prescription-display">
                            <thead>
                                <tr>
                                    <th>Rx</th>
                                    <th>Sphere</th>
                                    <th>Cylinder</th>
                                    <th>Axis</th>
                                    <th>VA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.pgp.right.distance.sph || 'N/A'}</td>
                                    <td>${patient.pgp.right.distance.cyl || 'N/A'}</td>
                                    <td>${patient.pgp.right.distance.axis || 'N/A'}</td>
                                    <td>${patient.pgp.right.distance.va || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.pgp.right.near.sph || 'N/A'}</td>
                                    <td>${patient.pgp.right.near.cyl || 'N/A'}</td>
                                    <td>${patient.pgp.right.near.axis || 'N/A'}</td>
                                    <td>${patient.pgp.right.near.va || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h5>Left Eye (OS)</h5>
                        <table class="prescription-display">
                            <thead>
                                <tr>
                                    <th>Rx</th>
                                    <th>Sphere</th>
                                    <th>Cylinder</th>
                                    <th>Axis</th>
                                    <th>VA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.pgp.left.distance.sph || 'N/A'}</td>
                                    <td>${patient.pgp.left.distance.cyl || 'N/A'}</td>
                                    <td>${patient.pgp.left.distance.axis || 'N/A'}</td>
                                    <td>${patient.pgp.left.distance.va || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.pgp.left.near.sph || 'N/A'}</td>
                                    <td>${patient.pgp.left.near.cyl || 'N/A'}</td>
                                    <td>${patient.pgp.left.near.axis || 'N/A'}</td>
                                    <td>${patient.pgp.left.near.va || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Auto Refraction</h4>
                    <div class="prescription-container">
                        <h5>Right Eye (OD)</h5>
                        <table class="prescription-display">
                            <thead>
                                <tr>
                                    <th>Rx</th>
                                    <th>Spherical</th>
                                    <th>Cylindrical</th>
                                    <th>Axis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.autoRefraction.right.distance.sph || 'N/A'}</td>
                                    <td>${patient.autoRefraction.right.distance.cyl || 'N/A'}</td>
                                    <td>${patient.autoRefraction.right.distance.axis || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.autoRefraction.right.near.sph || 'N/A'}</td>
                                    <td>${patient.autoRefraction.right.near.cyl || 'N/A'}</td>
                                    <td>${patient.autoRefraction.right.near.axis || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h5>Left Eye (OS)</h5>
                        <table class="prescription-display">
                            <thead>
                                <tr>
                                    <th>Rx</th>
                                    <th>Spherical</th>
                                    <th>Cylindrical</th>
                                    <th>Axis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.autoRefraction.left.distance.sph || 'N/A'}</td>
                                    <td>${patient.autoRefraction.left.distance.cyl || 'N/A'}</td>
                                    <td>${patient.autoRefraction.left.distance.axis || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.autoRefraction.left.near.sph || 'N/A'}</td>
                                    <td>${patient.autoRefraction.left.near.cyl || 'N/A'}</td>
                                    <td>${patient.autoRefraction.left.near.axis || 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Subjective Refraction</h4>
                    <div class="prescription-container">
                        <div class="prescription-section">
                            <h5>Right Eye (OD)</h5>
                            <table class="prescription-display">
                                <tr>
                                    <th>Rx</th>
                                    <th>Sphere</th>
                                    <th>Cylinder</th>
                                    <th>Axis</th>
                                    <th>VA</th>
                                </tr>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.subjectiveRefraction.right.distance.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.distance.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.distance.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.distance.va || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.subjectiveRefraction.right.near.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.near.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.near.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.right.near.va || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="prescription-section">
                            <h5>Left Eye (OS)</h5>
                            <table class="prescription-display">
                                <tr>
                                    <th>Rx</th>
                                    <th>Sphere</th>
                                    <th>Cylinder</th>
                                    <th>Axis</th>
                                    <th>VA</th>
                                </tr>
                                <tr>
                                    <td>Distance</td>
                                    <td>${patient.subjectiveRefraction.left.distance.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.distance.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.distance.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.distance.va || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Near</td>
                                    <td>${patient.subjectiveRefraction.left.near.sph || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.near.cyl || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.near.axis || 'N/A'}</td>
                                    <td>${patient.subjectiveRefraction.left.near.va || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Glass Prescription</h4>
                    <div class="prescription-container">
                        <table class="prescription-display">
                            <tr>
                                <th>Rx</th>
                                <th>Sphere</th>
                                <th>Cylinder</th>
                                <th>Axis</th>
                                <th>Prism</th>
                                <th>Add</th>
                            </tr>
                            <tr>
                                <td>Right (OD)</td>
                                <td>${patient.glassPrescription.right.sph || 'N/A'}</td>
                                <td>${patient.glassPrescription.right.cyl || 'N/A'}</td>
                                <td>${patient.glassPrescription.right.axis || 'N/A'}</td>
                                <td>${patient.glassPrescription.right.prism || '-'}</td>
                                <td>${patient.glassPrescription.right.add || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Left (OS)</td>
                                <td>${patient.glassPrescription.left.sph || 'N/A'}</td>
                                <td>${patient.glassPrescription.left.cyl || 'N/A'}</td>
                                <td>${patient.glassPrescription.left.axis || 'N/A'}</td>
                                <td>${patient.glassPrescription.left.prism || '-'}</td>
                                <td>${patient.glassPrescription.left.add || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                                <td>PD</td>
                                <td>${patient.glassPrescription.pd || 'N/A'}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="detail-section prescription-box">
                    <h4>Comments</h4>
                    <div class="comments-box">
                        <p>${patient.glassPrescription.comments || 'No comments'}</p>
                    </div>
                </div>
            </div>
        `;
        patientsList.appendChild(patientCard);
    });
}

// Add these event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Existing event listeners...

    // Add search input event listener
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchPatients);

    // Add filter change event listeners
    document.querySelectorAll('input[name="searchFilter"]').forEach(checkbox => {
        checkbox.addEventListener('change', searchPatients);
    });

    // Initial quick list update
    updateQuickList();
});

// Add some styles for the close button
const styles = `
.card-header {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 15px;
}

.close-btn {
    padding: 8px 15px;
    background: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: #e0e0e0;
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function printPrescription(patient) {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get formatted date and time
    const visitDate = new Date(patient.visitDateTime);
    const formattedDate = visitDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = visitDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Create the print content
    const printContent = `
        <html>
        <head>
            <title>Prescription - ${patient.name}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .clinic-name {
                    color: #1e3c72;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .clinic-subtitle {
                    color: #333;
                    font-size: 16px;
                }
                .divider {
                    border-top: 1px solid #1e3c72;
                    margin: 20px 0;
                }
                .patient-info {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 30px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }
                .info-item {
                    display: flex;
                    gap: 10px;
                }
                .info-label {
                    color: #1e3c72;
                    font-weight: bold;
                    min-width: 100px;
                }
                .info-value {
                    color: #333;
                }
                .prescription-title {
                    color: #1e3c72;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: center;
                }
                th {
                    background: #f8f9fa;
                    color: #666;
                }
                .notes-section {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 50px;
                }
                .notes-label {
                    color: #1e3c72;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .signature-section {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    margin-top: 50px;
                }
                .signature-line {
                    border-top: 1px solid #333;
                    width: 200px;
                    margin-bottom: 10px;
                }
                .clinic-name-bottom {
                    color: #333;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                    button {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="clinic-name">Sarafath Opticals</div>
                <div class="clinic-subtitle">Eye Care & Contact Lens Clinic</div>
            </div>
            <div class="divider"></div>

            <div class="patient-info">
                <div class="info-item">
                    <span class="info-label">Patient ID:</span>
                    <span class="info-value">${patient.patientId}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Date & Time:</span>
                    <span class="info-value">${formattedDate}, ${formattedTime}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${patient.name}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Age:</span>
                    <span class="info-value">${patient.age}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Gender:</span>
                    <span class="info-value">${patient.gender || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">${patient.phone}</span>
                </div>
                <div class="info-item" style="grid-column: 1 / -1;">
                    <span class="info-label">Address:</span>
                    <span class="info-value">${patient.address || 'N/A'}</span>
                </div>
            </div>

            <div class="prescription-title">Glass Prescription</div>
            <table>
                <tr>
                    <th>Rx</th>
                    <th>Sphere</th>
                    <th>Cylinder</th>
                    <th>Axis</th>
                    <th>Prism</th>
                    <th>Add</th>
                </tr>
                <tr>
                    <td>Right (OD)</td>
                    <td>${patient.glassPrescription.right.sph || 'N/A'}</td>
                    <td>${patient.glassPrescription.right.cyl || 'N/A'}</td>
                    <td>${patient.glassPrescription.right.axis || 'N/A'}</td>
                    <td>${patient.glassPrescription.right.prism || '-'}</td>
                    <td>${patient.glassPrescription.right.add || 'N/A'}</td>
                </tr>
                <tr>
                    <td>Left (OS)</td>
                    <td>${patient.glassPrescription.left.sph || 'N/A'}</td>
                    <td>${patient.glassPrescription.left.cyl || 'N/A'}</td>
                    <td>${patient.glassPrescription.left.axis || 'N/A'}</td>
                    <td>${patient.glassPrescription.left.prism || '-'}</td>
                    <td>${patient.glassPrescription.left.add || 'N/A'}</td>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td>PD</td>
                    <td>${patient.glassPrescription.pd || 'N/A'}</td>
                </tr>
            </table>

            <div class="notes-section">
                <div class="notes-label">Additional Notes:</div>
                <div>${patient.glassPrescription.comments || 'No additional notes'}</div>
            </div>

            <div class="signature-section">
                <div class="signature-line"></div>
                <div>Doctor's Signature</div>
                <div class="clinic-name-bottom">Sarafath Opticals</div>
            </div>

            <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px;">Print</button>
        </body>
        </html>
    `;

    // Write the content to the new window and trigger print
    printWindow.document.write(printContent);
    printWindow.document.close();
}

function printPatientDetails(patient) {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get formatted date and time
    const visitDate = new Date(patient.visitDateTime);
    const formattedDate = visitDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = visitDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Create the print content
    const printContent = `
        <html>
        <head>
            <title>Patient Details - ${patient.name}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .clinic-name {
                    color: #1e3c72;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .clinic-subtitle {
                    color: #333;
                    font-size: 16px;
                }
                .divider {
                    border-top: 1px solid #1e3c72;
                    margin: 20px 0;
                }
                .section {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .section-title {
                    color: #1e3c72;
                    font-weight: bold;
                    margin-bottom: 15px;
                    font-size: 18px;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }
                .info-item {
                    display: flex;
                    gap: 10px;
                }
                .info-label {
                    color: #1e3c72;
                    font-weight: bold;
                    min-width: 150px;
                }
                .info-value {
                    color: #333;
                }
                .full-width {
                    grid-column: 1 / -1;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 15px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: center;
                }
                th {
                    background: #f8f9fa;
                    color: #666;
                }
                .history-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }
                .history-tag {
                    background: #1e3c72;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 15px;
                    font-size: 12px;
                }
                .signature-section {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    margin-top: 50px;
                }
                .signature-line {
                    border-top: 1px solid #333;
                    width: 200px;
                    margin-bottom: 10px;
                }
                @media print {
                    body { padding: 0; }
                    button { display: none; }
                    .section { break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="clinic-name">Sarafath Opticals</div>
                <div class="clinic-subtitle">Eye Care & Contact Lens Clinic</div>
            </div>
            <div class="divider"></div>

            <div class="section">
                <div class="section-title">Patient Information</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Patient ID:</span>
                        <span class="info-value">${patient.patientId}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Visit Date & Time:</span>
                        <span class="info-value">${formattedDate}, ${formattedTime}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${patient.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Age:</span>
                        <span class="info-value">${patient.age}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Gender:</span>
                        <span class="info-value">${patient.gender || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Phone:</span>
                        <span class="info-value">${patient.phone}</span>
                    </div>
                    <div class="info-item full-width">
                        <span class="info-label">Address:</span>
                        <span class="info-value">${patient.address || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Patient History</div>
                <div class="info-grid">
                    <div class="info-item full-width">
                        <span class="info-label">Main Complaint:</span>
                        <div class="info-value">
                            ${patient.mainComplaint.selected && patient.mainComplaint.selected.length > 0 
                                ? `<div class="history-tags">${patient.mainComplaint.selected.map(item => 
                                    `<span class="history-tag">${item}</span>`).join('')}</div>` 
                                : 'None'}
                            ${patient.mainComplaint.other 
                                ? `<div>Other: ${patient.mainComplaint.other}</div>` 
                                : ''}
                        </div>
                    </div>
                    <div class="info-item full-width">
                        <span class="info-label">Ocular History:</span>
                        <div class="info-value">
                            ${patient.ocularHistory.selected && patient.ocularHistory.selected.length > 0 
                                ? `<div class="history-tags">${patient.ocularHistory.selected.map(item => 
                                    `<span class="history-tag">${item}</span>`).join('')}</div>` 
                                : 'None'}
                            ${patient.ocularHistory.other 
                                ? `<div>Other: ${patient.ocularHistory.other}</div>` 
                                : ''}
                        </div>
                    </div>
                    <div class="info-item full-width">
                        <span class="info-label">Medical History:</span>
                        <div class="info-value">
                            ${patient.medicalHistory.selected && patient.medicalHistory.selected.length > 0 
                                ? `<div class="history-tags">${patient.medicalHistory.selected.map(item => 
                                    `<span class="history-tag">${item}</span>`).join('')}</div>` 
                                : 'None'}
                            ${patient.medicalHistory.other 
                                ? `<div>Other: ${patient.medicalHistory.other}</div>` 
                                : ''}
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Visual Acuity</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Right Eye:</span>
                        <span class="info-value">${patient.visualAcuity.rightEye.ucva || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Left Eye:</span>
                        <span class="info-value">${patient.visualAcuity.leftEye.ucva || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Previous Glass Prescription (PGP)</div>
                <table>
                    <tr>
                        <th>Eye</th>
                        <th>Sphere</th>
                        <th>Cylinder</th>
                        <th>Axis</th>
                        <th>VA</th>
                    </tr>
                    <tr>
                        <td>Right (OD) - Distance</td>
                        <td>${patient.pgp.right.distance.sph || 'N/A'}</td>
                        <td>${patient.pgp.right.distance.cyl || 'N/A'}</td>
                        <td>${patient.pgp.right.distance.axis || 'N/A'}</td>
                        <td>${patient.pgp.right.distance.va || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Right (OD) - Near</td>
                        <td>${patient.pgp.right.near.sph || 'N/A'}</td>
                        <td>${patient.pgp.right.near.cyl || 'N/A'}</td>
                        <td>${patient.pgp.right.near.axis || 'N/A'}</td>
                        <td>${patient.pgp.right.near.va || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Left (OS) - Distance</td>
                        <td>${patient.pgp.left.distance.sph || 'N/A'}</td>
                        <td>${patient.pgp.left.distance.cyl || 'N/A'}</td>
                        <td>${patient.pgp.left.distance.axis || 'N/A'}</td>
                        <td>${patient.pgp.left.distance.va || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Left (OS) - Near</td>
                        <td>${patient.pgp.left.near.sph || 'N/A'}</td>
                        <td>${patient.pgp.left.near.cyl || 'N/A'}</td>
                        <td>${patient.pgp.left.near.axis || 'N/A'}</td>
                        <td>${patient.pgp.left.near.va || 'N/A'}</td>
                    </tr>
                </table>
            </div>

            <div class="section">
                <div class="section-title">Auto Refraction</div>
                <table>
                    <tr>
                        <th>Eye</th>
                        <th>Sphere</th>
                        <th>Cylinder</th>
                        <th>Axis</th>
                    </tr>
                    <tr>
                        <td>Right (OD) - Distance</td>
                        <td>${patient.autoRefraction.right.distance.sph || 'N/A'}</td>
                        <td>${patient.autoRefraction.right.distance.cyl || 'N/A'}</td>
                        <td>${patient.autoRefraction.right.distance.axis || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Right (OD) - Near</td>
                        <td>${patient.autoRefraction.right.near.sph || 'N/A'}</td>
                        <td>${patient.autoRefraction.right.near.cyl || 'N/A'}</td>
                        <td>${patient.autoRefraction.right.near.axis || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Left (OS) - Distance</td>
                        <td>${patient.autoRefraction.left.distance.sph || 'N/A'}</td>
                        <td>${patient.autoRefraction.left.distance.cyl || 'N/A'}</td>
                        <td>${patient.autoRefraction.left.distance.axis || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Left (OS) - Near</td>
                        <td>${patient.autoRefraction.left.near.sph || 'N/A'}</td>
                        <td>${patient.autoRefraction.left.near.cyl || 'N/A'}</td>
                        <td>${patient.autoRefraction.left.near.axis || 'N/A'}</td>
                    </tr>
                </table>
            </div>

            <div class="section">
                <div class="section-title">Subjective Refraction</div>
                <table>
                    <tr>
                        <th>Eye</th>
                        <th>Sphere</th>
                        <th>Cylinder</th>
                        <th>Axis</th>
                        <th>VA</th>
                    </tr>
                    <tr>
                        <td>Right (OD) - Distance</td>
                        <td>${patient.subjectiveRefraction.right.distance.sph || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.right.distance.cyl || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.right.distance.axis || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.right.distance.va || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Right (OD) - Near</td>
                        <td>${patient.subjectiveRefraction.right.near.sph || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.right.near.cyl || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.right.near.axis || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.right.near.va || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Left (OS) - Distance</td>
                        <td>${patient.subjectiveRefraction.left.distance.sph || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.left.distance.cyl || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.left.distance.axis || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.left.distance.va || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Left (OS) - Near</td>
                        <td>${patient.subjectiveRefraction.left.near.sph || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.left.near.cyl || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.left.near.axis || 'N/A'}</td>
                        <td>${patient.subjectiveRefraction.left.near.va || 'N/A'}</td>
                    </tr>
                </table>
            </div>

            <div class="section">
                <div class="section-title">Final Glass Prescription</div>
                <table>
                    <tr>
                        <th>Eye</th>
                        <th>Sphere</th>
                        <th>Cylinder</th>
                        <th>Axis</th>
                        <th>Prism</th>
                        <th>Add</th>
                    </tr>
                    <tr>
                        <td>Right (OD)</td>
                        <td>${patient.glassPrescription.right.sph || 'N/A'}</td>
                        <td>${patient.glassPrescription.right.cyl || 'N/A'}</td>
                        <td>${patient.glassPrescription.right.axis || 'N/A'}</td>
                        <td>${patient.glassPrescription.right.prism || '-'}</td>
                        <td>${patient.glassPrescription.right.add || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Left (OS)</td>
                        <td>${patient.glassPrescription.left.sph || 'N/A'}</td>
                        <td>${patient.glassPrescription.left.cyl || 'N/A'}</td>
                        <td>${patient.glassPrescription.left.axis || 'N/A'}</td>
                        <td>${patient.glassPrescription.left.prism || '-'}</td>
                        <td>${patient.glassPrescription.left.add || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                        <td>PD</td>
                        <td>${patient.glassPrescription.pd || 'N/A'}</td>
                    </tr>
                </table>
            </div>

            <div class="section">
                <div class="section-title">Additional Notes</div>
                <div>${patient.glassPrescription.comments || 'No additional notes'}</div>
            </div>

            <div class="signature-section">
                <div class="signature-line"></div>
                <div>Doctor's Signature</div>
                <div>Sarafath Opticals</div>
            </div>

            <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px;">Print</button>
        </body>
        </html>
    `;

    // Write the content to the new window and trigger print
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Add this after showSection function
function showProfileSettings() {
    const storedCredentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    
    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.innerHTML = `
        <div class="settings-content">
            <div class="settings-header">
                <h3>Profile Settings</h3>
                <button onclick="closeProfileSettings()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="profileSettingsForm" onsubmit="saveProfileSettings(event)">
                <div class="form-section">
                    <h4>Clinic Information</h4>
                    <div class="form-group">
                        <label for="clinicName">Clinic Name</label>
                        <input type="text" id="clinicName" value="${profileData.clinicName || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="doctorName">Doctor Name</label>
                        <input type="text" id="doctorName" value="${profileData.doctorName || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="qualification">Qualification</label>
                        <input type="text" id="qualification" value="${profileData.qualification || ''}">
                    </div>
                    <div class="form-group">
                        <label for="regNumber">Registration Number</label>
                        <input type="text" id="regNumber" value="${profileData.regNumber || ''}">
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Contact Information</h4>
                    <div class="form-group">
                        <label for="clinicPhone">Clinic Phone</label>
                        <input type="tel" id="clinicPhone" value="${profileData.clinicPhone || ''}">
                    </div>
                    <div class="form-group">
                        <label for="clinicEmail">Email</label>
                        <input type="email" id="clinicEmail" value="${profileData.clinicEmail || ''}">
                    </div>
                    <div class="form-group">
                        <label for="clinicAddress">Clinic Address</label>
                        <textarea id="clinicAddress">${profileData.clinicAddress || ''}</textarea>
                    </div>
                </div>

                <div class="credentials-section">
                    <h4>Login Credentials</h4>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" value="${storedCredentials.username || ''}" required>
                    </div>
                    <div class="form-group password-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" value="${storedCredentials.password || ''}" required>
                        <i class="fas fa-eye toggle-password" onclick="togglePassword(this)"></i>
                    </div>
                    <div class="form-group password-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" value="${storedCredentials.password || ''}" required>
                        <i class="fas fa-eye toggle-password" onclick="togglePassword(this)"></i>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="save-btn">Save Changes</button>
                    <button type="button" class="cancel-btn" onclick="closeProfileSettings()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function togglePassword(icon) {
    const input = icon.previousElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Update the saveProfileSettings function
function saveProfileSettings(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Save individual items to localStorage
    localStorage.setItem('clinicName', document.getElementById('clinicName').value);
    localStorage.setItem('doctorName', document.getElementById('doctorName').value);
    localStorage.setItem('qualification', document.getElementById('qualification').value);
    localStorage.setItem('registrationNumber', document.getElementById('regNumber').value);
    localStorage.setItem('clinicPhone', document.getElementById('clinicPhone').value);
    localStorage.setItem('clinicEmail', document.getElementById('clinicEmail').value);
    localStorage.setItem('clinicAddress', document.getElementById('clinicAddress').value);

    // Save credentials separately
    const credentials = {
        username: document.getElementById('username').value,
        password: password
    };
    localStorage.setItem('credentials', JSON.stringify(credentials));

    // Update the profile section immediately
    const profileSection = document.getElementById('profileSection');
    profileSection.innerHTML = `
        <div class="profile-header">
            <h2>Profile</h2>
            <button class="settings-btn" onclick="showProfileSettings()">
                <i class="fas fa-cog"></i> Settings
            </button>
        </div>
        <div class="profile-content">
            <div class="profile-card">
                <div class="profile-info">
                    <div class="clinic-details">
                        <h3>${localStorage.getItem('clinicName') || 'Sarafath Opticals'}</h3>
                        <p class="qualification">${localStorage.getItem('qualification') || 'Add your qualification'}</p>
                        <p class="doctor-name">Dr. ${localStorage.getItem('doctorName') || 'Add doctor name'}</p>
                        <p class="registration">Reg. No: ${localStorage.getItem('registrationNumber') || 'Add registration number'}</p>
                    </div>
                    <div class="contact-details">
                        <p><i class="fas fa-phone"></i> ${localStorage.getItem('clinicPhone') || 'Add phone number'}</p>
                        <p><i class="fas fa-envelope"></i> ${localStorage.getItem('clinicEmail') || 'Add email'}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${localStorage.getItem('clinicAddress') || 'Add clinic address'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    closeProfileSettings();
    alert('Settings saved successfully!');
}

function closeProfileSettings() {
    const settingsModal = document.querySelector('.settings-modal');
    if (settingsModal) {
        settingsModal.remove();
    }
}

// Add at the beginning of the file
function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Get stored credentials
    const storedCredentials = JSON.parse(localStorage.getItem('credentials') || '{}');
    
    if (!storedCredentials.username) {
        // First time login - set default credentials
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('credentials', JSON.stringify({ username: 'admin', password: 'admin' }));
            showDashboard();
            return false;
        }
    } else if (username === storedCredentials.username && password === storedCredentials.password) {
        showDashboard();
        return false;
    }

    alert('Invalid username or password');
    return false;
}

function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboardContainer').style.display = 'flex';
    updateDashboardStats();
}

function logout() {
    document.getElementById('dashboardContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('loginForm').reset();
} 