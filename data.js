// data.js

// Initialize global financial data variables
let income = { amount: 0 };
let expenses = [];
let totalIncome = 0;
let totalExpenses = 0;
let balance = 0;

// Function to calculate total income, expenses, and balance
export function calculateTotals() {
    totalIncome = income.amount; // Assuming income.amount is the total income
    totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    balance = totalIncome - totalExpenses;
}

// Function to add an income
export function addIncome(amount) {
    if (amount > 0) {
        income.amount += amount;
        calculateTotals();
    } else {
        console.error('Income amount must be positive.');
    }
}

// Function to add an expense
export function addExpense(name, amount) {
    if (amount > 0) {
        expenses.push({ name, amount });
        calculateTotals();
    } else {
        console.error('Expense amount must be positive.');
    }
}

// Function to reset all financial data
export function resetData() {
    income = { amount: 0 };
    expenses = [];
    totalIncome = 0;
    totalExpenses = 0;
    balance = 0;
}

// Getter functions to access the financial data
export function getIncome() {
    return totalIncome;
}

export function getExpenses() {
    return expenses;
}

export function getTotalExpenses() {
    return totalExpenses;
}

export function getBalance() {
    return balance;
}
