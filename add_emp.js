
function togglePopup() {
    let overlay = document.getElementById("popupOverlay");
    let form = document.getElementById("addEmployeeForm");

    if (overlay.classList.contains("show")) {
        overlay.classList.remove("show");
        form.classList.remove("show");
    } else {
        overlay.classList.add("show");
        setTimeout(() => form.classList.add("show"), 10);
    }
}

// Close when clicking outside the form
function closePopup(event) {
    let form = document.getElementById("addEmployeeForm");

    if (!form.contains(event.target)) {
        togglePopup();
    }
}

// Close when pressing ESC key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        let overlay = document.getElementById("popupOverlay");
        if (overlay.classList.contains("show")) {
            togglePopup();
        }
    }
});

function openUpdateForm(employeeId) {
    
    document.getElementById("updatePopupOverlay").style.display = "flex";
    
    // Pre-fill the form with dummy values
    let index = document.getElementById("id-" + employeeId).innerText;
    let fullName = document.getElementById("fullname-" + employeeId).innerText;
    let email = document.getElementById("email-" + employeeId).innerText;
    let dob = document.getElementById("dob-" + employeeId).innerText;
    let gender = document.getElementById("gender-" + employeeId).innerText;
    let department = document.getElementById("department-" + employeeId).innerText;
    let designation = document.getElementById("designation-" + employeeId).innerText;
    let reportingTo = document.getElementById("reporting-to-" + employeeId).innerText;
    let experience = document.getElementById("experience-" + employeeId).innerText;

    console.log(index,gender,dob,department,designation,reportingTo,experience)
    
    document.getElementById("index").value = index;
    document.getElementById("update-full-name").value = fullName;
    document.getElementById("update-email").value = email;
    document.getElementById("update-dob").value = dob;
    document.getElementById("update-gender").value = gender;
    document.getElementById("update-department").value = department;
    document.getElementById("update-designation").value = designation;
    document.getElementById("update-reporting-to").value = reportingTo;
    document.getElementById("update-experience").value = experience;
}

// Close Update Form
function toggleUpdateForm() {
    document.getElementById("updatePopupOverlay").style.display = "none";
}

// Close Popup When Clicking Outside
function closeUpdatePopup(event) {
    if (event.target.id === "updatePopupOverlay") {
        toggleUpdateForm();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Get all user data from localStorage (assuming it's stored as an array of user objects)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Loop through the users array to display the first user's data (or you can modify it to display a specific user's data)
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // get the login user 

        const storedLoginUser = localStorage.getItem("login_user");

        // Parse the JSON string back into an object
        const login_user = JSON.parse(storedLoginUser);

        // Check if the user is the one currently logged in (you can check this based on user session, email, etc.)
        if (user.email === login_user.email) { // Replace with the actual logged-in user condition
            document.getElementById("user-name").textContent = user.userName;
            document.getElementById("user-email").textContent = user.email;
            document.getElementById("user-role").textContent = user.role;
            break; // Exit the loop once the matching user is found
        }
    }
});

function handleFormSubmit(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Call the function to get the form data
    const formData = getFormData();

}

function getFormData() {
    // Create an empty object to store the form data
    const data = {};

    // Get the values of each form element using their IDs
    data.fullName = document.getElementById('full-name').value;
    data.email = document.getElementById('email').value;
    data.dob = document.getElementById('dob').value;
    data.gender = document.getElementById('gender').value;
    data.department = document.getElementById('department').value;
    data.designation = document.getElementById('designation').value;
    data.reportingTo = document.getElementById('reporting-to').value;
    data.experience = document.getElementById('experience').value;

    const storedLoginUser = localStorage.getItem("login_user");
    // Parse the JSON string back into an object
    const login_user = JSON.parse(storedLoginUser);

    data.added_by = login_user.email


    const users = JSON.parse(localStorage.getItem("users")) || [];

    const Employee = users.some(employee => employee.email === data.email);

    if (Employee){

        alert('Admin Employee Email Exist!');
        return
    }

    const userData = {
        userName: data.fullName,
        email: data.email,
        password: "mtm@123",
        role:"employee",
    };

    users.push(userData);

    // Store the updated employee data back in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Check if employeeData already exists in localStorage
    let employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

    const existingEmployee = employeeData.some(employee => employee.email === data.email);

    if (existingEmployee){

        alert('Employee Email Exist!');
        return
    }
    else{
        // Add the new employee data to the array
        employeeData.push(data);

        // Store the updated employee data back in localStorage
        localStorage.setItem("employeeData", JSON.stringify(employeeData));

        alert('Employee added Successfully!');

    }

    function closePopup() {
        document.getElementById("popupOverlay").style.display = "none";
    }

    // Display employee data in the table
    DisplayEmployeeData(employeeData);

    // Return the collected data
    return data;
}

function DisplayEmployeeData(employeeData) {
    // Get the table body element
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ''; // Clear the existing rows

    // Loop through employee data and add rows to the table
    employeeData.forEach((employee, index) => {

        const storedLoginUser = localStorage.getItem("login_user");

        // Parse the JSON string back into an object
        const login_user = JSON.parse(storedLoginUser);

        // Check if added_by matches the login user's email
        if (employee.added_by === login_user.email) {
            
            // Create a new row for the table
            const row = document.createElement("tr");

            // Create each cell in the row
            row.innerHTML = `
                <td id="id-${index}">${index + 1}</td>
                <td id="fullname-${index}">${employee.fullName}</td>
                <td id="email-${index}">${employee.email}</td>
                <td id="dob-${index}">${employee.dob}</td>
                <td id="gender-${index}">${employee.gender}</td>
                <td id="department-${index}">${employee.department}</td>
                <td id="designation-${index}">${employee.designation}</td>
                <td id="reporting-to-${index}">${employee.reportingTo}</td>
                <td id="experience-${index}">${employee.experience}</td>
                <td>
                    <a href="#" class="edit-icon" onclick="openUpdateForm(${index})"><i class="fas fa-edit"></i></a>
                    <a href="#" class="delete-icon" onclick="deleteEmployee(${index})"><i class="fas fa-trash-alt"></i></a>
                </td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row);
        }

    });

}



// Function to delete employee data
function deleteEmployee(index) {
    let employeeData = JSON.parse(localStorage.getItem("employeeData"));

    // Show the delete confirmation popup
    document.getElementById("deletePopup").style.display = "flex";

    // Handle "Yes" button click
    document.getElementById("confirmDelete").onclick = function () {
        // Remove the employee from the array
        employeeData.splice(index, 1);

        // Update localStorage with the new employee data
        localStorage.setItem("employeeData", JSON.stringify(employeeData));

        // Re-display the employee data in the table
        DisplayEmployeeData(employeeData);

        // Hide the popup
        document.getElementById("deletePopup").style.display = "none";
    };

    // Handle "No" button click
    document.getElementById("cancelDelete").onclick = function () {
        // Just hide the popup without deleting
        document.getElementById("deletePopup").style.display = "none";
    };
}


// Call the DisplayEmployeeData function when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];
    DisplayEmployeeData(employeeData);
});


function handleUpdateFormSubmit(event) {
    // Prevent form submission
    event.preventDefault();

    // Call function to get form data
    getUpdateFormData();
}

function getUpdateFormData() {
    // Get index and convert to an integer
    let index = parseInt(document.getElementById('index').value, 10);

    // Ensure index is a valid number
    if (isNaN(index) || index < 1) {
        alert("Invalid employee index!");
        return;
    }

    // Retrieve employee data from localStorage
    let employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

    // Ensure index exists within the array
    if (index - 1 >= employeeData.length) {
        alert("Employee does not exist!");
        return;
    }
    
    // Create an object with updated form values
    const data = {
        fullName: document.getElementById('update-full-name').value,
        email: document.getElementById('update-email').value,
        dob: document.getElementById('update-dob').value,
        gender: document.getElementById('update-gender').value,
        department: document.getElementById('update-department').value,
        designation: document.getElementById('update-designation').value,
        reportingTo: document.getElementById('update-reporting-to').value,
        experience: document.getElementById('update-experience').value,
        added_by:employeeData[index - 1].added_by,

    };

    console.log("Updating employee at index:", index, typeof index, data);


    // Update the specific employee entry
    employeeData[index - 1] = data;

    // Save updated employee data back to localStorage
    localStorage.setItem("employeeData", JSON.stringify(employeeData));

    // Alert user and refresh UI
    alert("Employee Updated Successfully!");

    DisplayEmployeeData(employeeData);
}

// Function to search employees based on input
function searchEmployee() {
    // Get search input value (convert to lowercase for case-insensitive search)
    const searchValue = document.getElementById("emp-search").value.toLowerCase();

    // Get employee data from localStorage
    let employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

    // Filter employees based on name, email, department, or designation
    const filteredEmployees = employeeData.filter(employee =>
        employee.fullName.toLowerCase().includes(searchValue) ||
        employee.email.toLowerCase().includes(searchValue) ||
        employee.department.toLowerCase().includes(searchValue) ||
        employee.designation.toLowerCase().includes(searchValue)
    );

    // Display the filtered employee data
    DisplayEmployeeData(filteredEmployees);
}

// Attach event listener to search input field
document.getElementById("emp-search").addEventListener("input", searchEmployee);


// Function to search employees based on input
function FilterEmployee() {
    // Get search input value (convert to lowercase for case-insensitive search)
    const searchValue = document.getElementById("filter-department").value.toLowerCase();

    // Get employee data from localStorage
    let employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

    // Filter employees based on name, email, department, or designation
    const filteredEmployees = employeeData.filter(employee =>
        employee.department.toLowerCase().includes(searchValue)
    );

    // Display the filtered employee data
    DisplayEmployeeData(filteredEmployees);
}

// Attach event listener to search input field
document.getElementById("filter-department").addEventListener("input", FilterEmployee);









  
        