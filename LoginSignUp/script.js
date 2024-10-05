// Signup form validation
document.getElementById('signupForm').addEventListener('submit', function(event) {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const firstnameError = document.getElementById("firstname-error");
    const lastnameError = document.getElementById("lastname-error");
    const mobileError = document.getElementById("mobile-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirmPassword-error");

    // Clear previous error messages
    firstnameError.textContent = "";
    lastnameError.textContent = "";
    mobileError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    // Firstname validation: letters only
    if (firstname === "" || !/^[A-Za-z]+$/.test(firstname)) {
        firstnameError.textContent = "Please enter a valid first name (letters only).";
        isValid = false;
    }

    // Lastname validation: letters only
    if (lastname === "" || !/^[A-Za-z]+$/.test(lastname)) {
        lastnameError.textContent = "Please enter a valid last name (letters only).";
        isValid = false;
    }

    // Mobile number validation: 10 digits only
    if (mobile === "" || !/^\d{10}$/.test(mobile)) {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        isValid = false;
    }

    // Email validation
    if (email === "" || !email.includes("@")) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Password validation
    if (password === "" || password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long, contain an uppercase letter, and a number.";
        isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});

// Reset functionality
document.getElementById('resetForm').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default behavior of the reset link
    document.getElementById('signupForm').reset();  // Reset all form fields
});
