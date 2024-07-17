import './bootstrap';
// app.js
function showAddStudentModal() {
    var modal = document.getElementById('addStudentModal');
    modal.style.display = 'block';
}

function closeAddStudentModal() {
    var modal = document.getElementById('addStudentModal');
    modal.style.display = 'none';
}

function checkDuplicate() {
var name = document.getElementById('name').value;
var subject = document.getElementById('subject').value;
var marks = document.getElementById('marks').value;

// Perform AJAX request to check if student already exists
axios.post('{{ route("students.checkDuplicate") }}', {
    name: name,
    subject: subject
})
.then(function (response) {
    if (response.data.exists) {
        // Student with same name and subject exists, confirm update
        if (confirm('Student with the same name and subject exists. Do you want to update marks?')) {
            // Set operation type to update
            document.getElementById('operationType').value = 'update';
            // Submit form
            document.getElementById('addStudentForm').submit();
        }
    } else {
        // No existing student found, submit form for addition
        document.getElementById('operationType').value = 'add';
        document.getElementById('addStudentForm').submit();
    }
})
.catch(function (error) {
    console.error('Error checking duplicate:', error);
    // Handle error scenario
});
}
function validateForm() {
var name = document.getElementById('name').value.trim();
var subject = document.getElementById('subject').value.trim();
var marks = document.getElementById('marks').value.trim();

// Basic validation
if (name === '' || subject === '' || marks === '') {
    alert('Please fill in all fields.');
    return false;
}

// Additional validation (e.g., marks should be a number)
if (isNaN(marks)) {
    alert('Marks must be a number.');
    return false;
}

return true; // Form submission allowed
}
function editStudent(button) {
    var row = button.parentNode.parentNode;
    var editRow = document.getElementById('editRow' + row.dataset.id);
    
    // Hide current row, show edit form row
    row.style.display = 'none';
    editRow.style.display = 'table-row';
}

function cancelEdit(studentId) {
    var editRow = document.getElementById('editRow' + studentId);
    var originalRow = editRow.previousElementSibling;
    
    // Show original row, hide edit form row
    originalRow.style.display = 'table-row';
    editRow.style.display = 'none';
}

