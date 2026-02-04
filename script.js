// Form fields
let nameField = document.getElementById("name");
let numberField = document.getElementById("number");
let departmentField = document.getElementById("department");
let selectDepartment = document.getElementById("selectdepartment");
let salaryField = document.getElementById("address");
let joinField = document.getElementById("email");
let saveBtn = document.getElementById("saveBtn");
let employeeTable = document.getElementById("employeeTable");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = null;

// Sync select with department input
selectDepartment.addEventListener("change", function () {
    departmentField.value = this.value;
});

// Show table data
function showData() {
    employeeTable.innerHTML = "";
    employees.forEach((emp, index) => {
        employeeTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.number}</td>
                <td>${emp.department}</td>
                <td>${emp.address}</td>
                <td>${emp.email}</td>
                <td>
                    <button onclick="editEmployee(${index})">Update</button>
                    <button onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
    // Clear form
    nameField.value = "";
    numberField.value = "";
    departmentField.value = "";
    salaryField.value = "";
    joinField.value = "";
    saveBtn.innerText = "Save Employee";
}

// Save or Update
saveBtn.addEventListener("click", () => {
    let name = nameField.value;
    let number = numberField.value;
    let department = departmentField.value;
    let address = salaryField.value;
    let email = joinField.value;

    if (!name || !number || !department || !address || !email) {
        alert("Please fill all details!");
        return;
    }

    if (editIndex !== null) {
        // Update
        employees[editIndex] = { name, number, department, address, email };
        editIndex = null;
    } else {
        // Save new
        employees.push({ name, number, department, address, email });
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    showData();

    // Send Email
    emailjs.send("service_naoycqy", "template_mee34dc", { name, number, department, address, email })
        .then(() => {
            alert("Employee details sent via email!");
        })
        .catch((err) => {
            console.error("Email failed", err);
            alert("Failed to send email!");
        });
});

// Edit function
function editEmployee(index) {
    let emp = employees[index];
    nameField.value = emp.name;
    numberField.value = emp.number;
    departmentField.value = emp.department;
    salaryField.value = emp.address;
    joinField.value = emp.email;
    editIndex = index;
    saveBtn.innerText = "Update Employee";
}

// Delete function
function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employees));
        showData();
    }
}

// Initial load
showData();

// Search by join date
function search() {
    let date = document.getElementById("Join1").value;
    employeeTable.innerHTML = "";
    employees.forEach((emp, index) => {
        if (emp.email === date) {
            employeeTable.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${emp.name}</td>
                    <td>${emp.number}</td>
                    <td>${emp.department}</td>
                    <td>${emp.address}</td>
                    <td>${emp.email}</td>
                    <td>
                        <button onclick="editEmployee(${index})">Update</button>
                        <button onclick="deleteEmployee(${index})">Delete</button>
                    </td>
                </tr>
            `;
        }
    });
}
