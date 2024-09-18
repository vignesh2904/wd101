localStorage.clear();
let userForm = document.getElementById("frm");
let userEntries = JSON.parse(localStorage.getItem("usersss")) || [];
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
    const today = new Date();
    const minYear = today.getFullYear() - 55;
    const maxYear = today.getFullYear() - 18;
    if (dob) {
        const dobYear = new Date(dob).getFullYear();
        if (dobYear > maxYear) {
            dobField.setCustomValidity(`Year should be earlier than or equal to ${maxYear}.`);
        } else if (dobYear < minYear) {
            dobField.setCustomValidity(`Year should be later than or equal to ${minYear}.`);
        } else {
            dobField.setCustomValidity("");
        }
    }
    dobField.reportValidity();
}
const saveUserForm = (event) => {
    event.preventDefault();
    validateAge();

    const dobField = document.getElementById("dob");
    if (!dobField.checkValidity()) {
        return;
    }
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;
    const entry = {
        name,
        email,
        pass,
        dob,
        terms
    };
    userEntries.push(entry);
    localStorage.setItem("usersss", JSON.stringify(userEntries));
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
        <td>${entry.terms ? "Yes" : "No"}</td>
    `;
    tableBody.appendChild(row);
}
const loadUserEntries = () => {
    userEntries.forEach(entry => {
        addEntryToTable(entry);
    });
}
const dobField = document.getElementById("dob");
dobField.addEventListener("input", validateAge);
userForm.addEventListener("submit", saveUserForm);
window.onload = () => {
    loadUserEntries();
    setDOBRange();
};
