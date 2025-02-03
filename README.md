Employee Management System
Project Overview
This project is a responsive Employee Management System built using HTML, CSS, and JavaScript. The system allows users to:

View a list of employees.
Add new employees.
Edit existing employee details.
Delete employees.
Search and filter employees dynamically.
Features
Employee List Page: View all employees in a table with columns: ID, Name, Email, Department, Designation, and Actions (Edit/Delete).
Add Employee Form: Add new employees with validated fields (Name, Email, Department, Designation).
Edit & Delete: Modify or remove employee details with confirmation before deletion.
Search & Filter: Search employees by name, email, department, or designation. Filter by department.
Local Storage / API Integration: Store employee data in local storage for persistence.
Project Setup
To run this project locally, follow the steps below:

1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
2. Open the project in your browser
Simply open the index.html file in your browser.

3. Make sure JavaScript is enabled in your browser.
How to Use
1. User Authentication
Sign Up:

Open the login page.
Click on the "Account don't have signup" link.
Enter your username, email, password, and confirm the password.
After successful signup, you will be redirected to the login page.
Login:

Use your email and password to log in.
After successful login, you will be redirected to the dashboard.
2. Employee Management
Add Employee:

On the dashboard, click the "Add Employee" button.
Fill in the details (Name, Email, Department, Designation).
Once you submit, the employee is added to the list.
Edit Employee:

Click on the "Edit" icon next to an employee.
Modify the details and click "Save".
Delete Employee:

Click on the "Delete" icon next to an employee.
A confirmation popup will appear. Confirm the deletion to remove the employee from the list.
3. Search & Filter
Use the search bar to search for employees by name, email, department, or designation.
Use the dropdown to filter employees by department.
4. Logout
Click on the "Logout" icon to log out from the system. You will be redirected back to the login page.
Technologies Used
HTML for the structure of the page.
CSS for styling and responsiveness.
JavaScript for functionality (e.g., dynamic employee list, search, filter, and local storage).
Local Storage
All employee data is stored in the browser’s local storage. The data persists even after the browser is closed and reopened, but it will be cleared if you clear the browser's local storage.
