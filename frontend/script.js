// Get DOM Elements
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signUpForm = document.getElementById('signup');
const signInForm = document.getElementById('signIn');
const recoverPasswordLink = document.querySelector('.recover a');

// Toggle Forms
signUpButton.addEventListener('click', () => {
    signUpForm.style.display = 'block';
    signInForm.style.display = 'none';
});

signInButton.addEventListener('click', () => {
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
});

// Handle Recover Password
recoverPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Enter your email to recover your password:');
    if (email) {
        alert(`Password recovery instructions have been sent to ${email}`);
    } else {
        alert('Please enter a valid email address.');
    }
});

// Form Submissions
const apiUrl = 'http://localhost:5000';

// Handle Sign-Up
document.querySelector('#signup form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        firstName: document.getElementById('fName').value,
        lastName: document.getElementById('lName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            alert('User registered successfully!');
            signUpForm.style.display = 'none';
            signInForm.style.display = 'block'; // Redirect to login form
        } else {
            alert('Error registering user');
        }
    } catch (error) {
        console.error(error);
    }
});

// Handle Sign-In
document.querySelector('#signIn form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value,
    };
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            alert('Login successful!');
            const userName = document.getElementById('loginEmail').value.split('@')[0]; // Example, extract username from email
            window.location.href = `home.html?user=${userName}`; // Redirect to home page with the user's name
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
    }
});
