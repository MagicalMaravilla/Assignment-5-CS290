// Define global variables to store financial data and the chart instance
let income = { amount: 0 };
let expenses = [];
let totalIncome = 0;
let totalExpenses = 0;
let balance = 0;
let budgetChart; // Holds the instance of the Chart.js chart

// Add event listener to the income form to handle submissions
document.getElementById('income-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    const incomeInput = document.getElementById('income');
    totalIncome = parseFloat(incomeInput.value); // Parse the input value to a float
    updateUI(); // Update the UI with the new data
});

// Add event listener to the expense form to handle submissions
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    expenses.push({ name: expenseName, amount: expenseAmount }); // Add the new expense to the array
    calculateTotals(); // Recalculate totals
    updateUI(); // Update the UI with the new data
});

// Function to calculate total expenses and balance
function calculateTotals() {
    totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0); // Sum up all expenses
    balance = totalIncome - totalExpenses; // Calculate the balance
}

// Function to update the UI elements with the latest financial data
function updateUI() {
    document.getElementById('total-income').textContent = `Total Income: $${totalIncome}`;
    document.getElementById('total-expenses').textContent = `Total Expenses: $${totalExpenses}`;
    document.getElementById('balance').textContent = `Balance: $${balance}`;

    // Update chart data if the chart has been initialized
    if (budgetChart) {
        budgetChart.data.datasets[0].data = [totalIncome, totalExpenses, balance]; // Update the chart data
        budgetChart.update(); // Refresh the chart to display the new data
    }
}

// Function to initialize the Chart.js chart
function initializeChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d'); // Get the context of the canvas element
    budgetChart = new Chart(ctx, {
        type: 'bar', // Define the type of chart
        data: {
            labels: ['Income', 'Expenses', 'Balance'], // Set the labels for the chart
            datasets: [{
                label: 'Budget Overview',
                data: [totalIncome, totalExpenses, balance], // Initial data set to 0
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Ensure the y-axis starts at 0
                }
            }
        }
    });
}

// Function to initialize the application
function initializeApp() {
    initializeChart(); // Initialize the chart when the app starts
    // Any other initialization code can go here
}

initializeApp(); // Call initializeApp to start the app
