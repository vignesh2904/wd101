let userForm = document.getElementById("frm");
let userEntries = JSON.parse(sessionStorage.getItem("usersss")) || [];

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

const validateAge = () => {
    const dobField = document.getElementById("dob");
    const dob = dobField.value;
    const age = calculateAge(dob);
    if (dob) {
        if (age < 18 || age > 55) {
            dobField.setCustomValidity("You must be between 18 and 55 years old.");
        } else {
            dobField.setCustomValidity("");
        }
    }
    dobField.reportValidity();
}

const validateEmail = () => {
    const emailField = document.getElementById("email");
    const email = emailField.value;
    if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailField.setCustomValidity(`Please include an '@' in the email address. '${email.toString()}' is missing an '@'.`);
        } else {
            emailField.setCustomValidity("");
        }
    }
    emailField.reportValidity();
}

const saveUserForm = (event) => {
    event.preventDefault();
    validateAge();
    validateEmail();

    const dobField = document.getElementById("dob");
    const emailField = document.getElementById("email");
    if (!dobField.checkValidity() || !emailField.checkValidity()) {
        return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    if (!terms) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    const entry = {
        name,
        email,
        pass,
        dob,
        terms
    };

    userEntries.push(entry);
    sessionStorage.setItem("usersss", JSON.stringify(userEntries));
    addEntryToTable(entry);
}

const addEntryToTable = (entry) => {
    const tableBody = document.querySelector("#userTable tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.pass}</td>
        <td>${entry.dob}</td>
        <td>${entry.terms}</td>
    `;
    tableBody.appendChild(row);
}

const loadUserEntries = () => {
    userEntries.forEach(entry => {
        addEntryToTable(entry);
    });
}

const dobField = document.getElementById("dob");
const emailField = document.getElementById("email");

dobField.addEventListener("input", validateAge);
emailField.addEventListener("input", validateEmail);
userForm.addEventListener("submit", saveUserForm);

window.onload = () => {
    loadUserEntries();
    setDOBRange();
};
