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
                if (selectedRole === 'student') {
                    emailLabel.textContent = 'Email Address';
                    emailInput.placeholder = 'Enter your email';
                    emailInput.type = 'email';
                } else if (selectedRole === 'instructor') {
                    emailLabel.textContent = 'Email Address';
                    emailInput.placeholder = 'Enter your email';
                    emailInput.type = 'email';
                } else if (selectedRole === 'admin') {
                    emailLabel.textContent = 'Admin Email';
                    emailInput.placeholder = 'Enter admin email';
                    emailInput.type = 'email';
                }
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

        // Demo login functionality
        const demoButtons = document.querySelectorAll('.demo-login');
        demoButtons.forEach(button => {
            button.addEventListener('click', function () {
                const email = this.dataset.email;
                const password = this.dataset.password;
                const role = this.dataset.role;

                // Fill form with demo data
                document.getElementById('email').value = email;
                document.getElementById('password').value = password;

                // Select appropriate role tab
                roleTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.role === role) {
                        tab.classList.add('active');
                        selectedRole = role;
                    }
                });
            });
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

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
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

                // Simulate API call
                setTimeout(() => {
                    // Check demo credentials
                    const demoAccounts = {
                        'student@demo.com': { password: 'demo123', role: 'student' },
                        'instructor@demo.com': { password: 'demo123', role: 'instructor' },
                        'admin@demo.com': { password: 'demo123', role: 'admin' }
                    };

                    if (demoAccounts[email] && demoAccounts[email].password === password && demoAccounts[email].role === selectedRole) {
                        // Successful login
                        successMessage.classList.remove('hidden');

                        // In a real application, you would redirect to the appropriate dashboard
                        setTimeout(() => {
                            console.log('Login successful:', {
                                email: email,
                                role: selectedRole,
                                remember: remember,
                                timestamp: new Date().toISOString()
                            });

                            // Redirect based on role
                            if (selectedRole === 'student') {
                                console.log('Redirecting to Student Dashboard...');
                            } else if (selectedRole === 'instructor') {
                                console.log('Redirecting to Instructor Dashboard...');
                            } else if (selectedRole === 'admin') {
                                console.log('Redirecting to Admin Dashboard...');
                            }
                        }, 2000);

                    } else {
                        // Failed login
                        errorMessage.classList.remove('hidden');
                        document.getElementById('errorText').textContent = 'Invalid credentials for the selected role. Try the demo accounts above.';

                        // Reset button state
                        loginText.textContent = 'Sign In';
                        loginLoader.classList.add('hidden');
                        loginBtn.disabled = false;
                    }
                }, 1500);
            }
        });

        // Real-time email validation
        document.getElementById('email').addEventListener('blur', function () {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errorEl = document.getElementById('emailError');

            if (email && !emailRegex.test(email)) {
                errorEl.classList.remove('hidden');
            } else {
                errorEl.classList.add('hidden');
            }
        });