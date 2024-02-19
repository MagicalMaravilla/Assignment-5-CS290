// ui.js
import { addIncome, addExpense, resetData } from './data.js';
import { initializeChart, updateChartData } from './chart.js';

// Assuming the initialization of the chart happens elsewhere and the context is passed here
let ctx; // Context for the chart

// Function to handle income form submission
export function handleIncomeFormSubmit(e) {
    e.preventDefault();
    const incomeInput = document.getElementById('income');
    const incomeValue = parseFloat(incomeInput.value);
    if (incomeValue > 0) {
        addIncome(incomeValue);
        updateUI();
        updateChartData();
    } else {
        alert('Please enter a positive number for income.');
    }
}

// Function to handle expense form submission
export function handleExpenseFormSubmit(e) {
    e.preventDefault();
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    if (expenseAmount > 0) {
        addExpense(expenseName, expenseAmount);
        updateUI();
        updateChartData();
    } else {
        alert('Please enter a positive number for the expense amount.');
    }
}

// Function to reset all financial data and input fields
export function handleReset() {
    resetData();
    updateUI();
    // Assuming the chart type is stored or passed as needed
    initializeChart('bar', ctx);
}

// Function to change the chart type based on user selection
export function handleChangeChartType() {
    const selectedChartType = document.getElementById('chartType').value;
    initializeChart(selectedChartType, ctx);
}

// Function to update the UI with the latest financial data
export function updateUI() {
    // Assuming functions to get the total income, expenses, and balance are available
    document.getElementById('total-income').textContent = `Total Income: $${getTotalIncome()}`;
    document.getElementById('total-expenses').textContent = `Total Expenses: $${getTotalExpenses()}`;
    document.getElementById('balance').textContent = `Balance: $${getBalance()}`;
}

// Initialization function to set up event listeners
export function setupUI(chartContext) {
    ctx = chartContext; // Set the chart context
    document.getElementById('income-form').addEventListener('submit', handleIncomeFormSubmit);
    document.getElementById('expense-form').addEventListener('submit', handleExpenseFormSubmit);
    document.getElementById('reset-button').addEventListener('click', handleReset);
    document.getElementById('changeChartType').addEventListener('click', handleChangeChartType);
}

