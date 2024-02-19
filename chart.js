// Assuming Chart.js is correctly imported in your HTML or through a module bundler
import { getIncome, getExpenses } from './data.js';

let budgetChart; // Variable to store the Chart.js chart instance

// Function to initialize or update the chart with dynamic data
export function initializeChart(chartType, ctx) {
    if (budgetChart) {
        budgetChart.destroy(); // Destroy the current chart instance if it exists
    }
    budgetChart = new Chart(ctx, {
        type: chartType,
        data: getChartData(chartType),
        options: getChartOptions(chartType)
    });
}

// Function to generate chart data based on the chart type
function getChartData(chartType) {
    let expenses = getExpenses();
    let totalIncome = getIncome(); // Use getIncome() to fetch the latest total income
    let data = { labels: [], datasets: [] };

    switch (chartType) {
        case 'pie':
            data.labels = expenses.map(expense => expense.name);
            data.datasets.push({
                data: expenses.map(expense => expense.amount),
                backgroundColor: expenses.map((_, index) => `hsl(${index * 360 / expenses.length}, 70%, 50%)`),
            });
            break;
        case 'line':
            let cumulativeExpenses = expenses.reduce((acc, curr, i) => {
                if (i === 0) acc.push(curr.amount);
                else acc.push(acc[i-1] + curr.amount);
                return acc;
            }, []);
            data.labels = expenses.map(expense => expense.name);
            data.datasets.push({
                label: 'Cumulative Expenses',
                data: cumulativeExpenses,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            });
            data.datasets.push({
                label: 'Total Income',
                data: Array(expenses.length).fill(totalIncome),
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderDash: [5, 5]
            });
            break;
        case 'bar':
            data.labels = ['Total Income'].concat(expenses.map(expense => expense.name));
            let incomeData = [totalIncome];
            let expenseData = expenses.map(expense => -expense.amount);
            data.datasets.push({
                label: 'Financial Overview',
                data: incomeData.concat(expenseData),
                backgroundColor: ['rgba(54, 162, 235, 0.7)'].concat(expenses.map(_ => 'rgba(255, 99, 132, 0.7)')),
                borderColor: ['rgba(54, 162, 235, 1)'].concat(expenses.map(_ => 'rgba(255, 99, 132, 1)')),
                borderWidth: 1
            });
            break;
    }

    return data;
}

// Function to generate chart options based on the chart type
function getChartOptions(chartType) {
    let options = {
        scales: chartType === 'pie' ? {} : {
            y: { beginAtZero: true }
        },
        plugins: {
            legend: { display: chartType !== 'bar' }
        }
    };

    return options;
}

// Function to update the chart data dynamically
export function updateChartData(chartType) {
    if (budgetChart) {
        // Ensure to fetch the latest data for the chart
        budgetChart.data = getChartData(chartType);
        budgetChart.update();
    }
}
