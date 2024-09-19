let userForm = document.getElementById("frm");
const tableBody = document.querySelector("#userTable tbody");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
}

const displayEntries = () => {
    const entries = retrieveEntries();
    
    tableBody.innerHTML = entries.map(entry => `
        <tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTerms}</td>
        </tr>
    `).join("");
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("terms").checked;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years old.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };
    
    const userEntries = retrieveEntries();
    userEntries.push(entry);
    
    localStorage.setItem('user-entries', JSON.stringify(userEntries));
    displayEntries();
    userForm.reset(); 
}

userForm.addEventListener("submit", saveUserForm);
document.addEventListener("DOMContentLoaded", displayEntries);
