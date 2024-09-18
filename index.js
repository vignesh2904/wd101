let userForm = document.getElementById("frm");
let userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
const setDOBRange = () => {
    const dobField = document.getElementById("dob");
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const formatDate = (date) => date.toISOString().split('T')[0];
    dobField.min = formatDate(minDate);
    dobField.max = formatDate(maxDate);
}
const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
const saveEntries = () => {
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
}

const displayEntries = () => {
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";
    userEntries.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTerms}</td>
        `;
        tableBody.appendChild(row);
    });
}

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

const saveUserForm = (event) => {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("terms").checked;
    
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    if (!validateAge(dob)) {
        alert("You must be between 18 and 55 years old to register.");
        return;
    }
    
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };
    
    userEntries.push(entry);
    saveEntries();
    displayEntries();
    userForm.reset();
}

userForm.addEventListener("submit", saveUserForm);

window.onload = () => {
    displayEntries();
};
