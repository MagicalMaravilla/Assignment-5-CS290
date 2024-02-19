// main.js
import { setupUI } from './ui.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    setupUI(ctx); // Pass the chart context to the UI setup
});