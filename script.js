// Role tab functionality
const roleTabs = document.querySelectorAll('.role-tab');
const emailLabel = document.getElementById('emailLabel');
const emailInput = document.getElementById('email');
let selectedRole = 'student';

roleTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        // Remove active class from all tabs
        roleTabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        this.classList.add('active');

        // Update selected role
        selectedRole = this.dataset.role;

        // Update email label and placeholder based on role
        if (selectedRole === 'admin') {
            emailLabel.textContent = 'Admin Email';
            emailInput.placeholder = 'Enter admin email';
        } else {
            emailLabel.textContent = 'Email Address';
            emailInput.placeholder = 'Enter your email';
        }
        emailInput.type = 'email';
    });
});

// Password toggle functionality
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Form validation and submission
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginLoader = document.getElementById('loginLoader');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset error messages
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('passwordError').classList.add('hidden');
    errorMessage.classList.add('hidden');

    let isValid = true;

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Basic validation - check if fields are not empty
    if (!email) {
        document.getElementById('emailError').classList.remove('hidden');
        isValid = false;
    }

    // Validate password
    if (!password) {
        document.getElementById('passwordError').classList.remove('hidden');
        isValid = false;
    }

    if (isValid) {
        // Show loading state
        loginText.textContent = 'Signing In...';
        loginLoader.classList.remove('hidden');
        loginBtn.disabled = true;

        // Here you would make an actual API call to your backend
        // Example: 
        // fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password, role: selectedRole, remember })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         // Successful login
        //         successMessage.classList.remove('hidden');
        //         // Redirect to dashboard
        //         window.location.href = data.redirectUrl;
        //     } else {
        //         // Failed login
        //         errorMessage.classList.remove('hidden');
        //         document.getElementById('errorText').textContent = data.message || 'Invalid credentials.';
        //         // Reset button state
        //         loginText.textContent = 'Sign In';
        //         loginLoader.classList.add('hidden');
        //         loginBtn.disabled = false;
        //     }
        // })
        // .catch(error => {
        //     console.error('Login error:', error);
        //     errorMessage.classList.remove('hidden');
        //     document.getElementById('errorText').textContent = 'An error occurred. Please try again.';
        //     // Reset button state
        //     loginText.textContent = 'Sign In';
        //     loginLoader.classList.add('hidden');
        //     loginBtn.disabled = false;
        // });

        // For now, just reset the form (remove this in production)
        setTimeout(() => {
            loginText.textContent = 'Sign In';
            loginLoader.classList.add('hidden');
            loginBtn.disabled = false;
            alert('Please implement backend API call for actual login functionality.');
        }, 1500);
    }
});