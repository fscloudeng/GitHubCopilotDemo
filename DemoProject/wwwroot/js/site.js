// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Dark/Light mode toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙';
    } else {
        htmlElement.removeAttribute('data-theme');
        themeIcon.textContent = '☀️';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function () {
        const theme = htmlElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            // Switch to light mode
            htmlElement.removeAttribute('data-theme');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    });
});
