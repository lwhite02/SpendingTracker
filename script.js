// Retrieve data from local storage or initialize an empty object
let expenses = JSON.parse(localStorage.getItem('expenses')) || {};

// Function to add expense
function addExpense() {
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    if (amount && date) {
        const [year, month] = date.split('-');
        if (!expenses[year]) expenses[year] = {};
        if (!expenses[year][month]) expenses[year][month] = [];
        expenses[year][month].push(parseFloat(amount));
        localStorage.setItem('expenses', JSON.stringify(expenses));
        document.getElementById('amount').value = '';
        updateView();
    }
}

// Function to reset expenses
function resetExpenses() {
    if (confirm('Are you sure you want to reset all expenses?')) {
        expenses = {};
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateView();
    }
}

// Function to update the view based on the selected month and year
function updateView() {
    const filterDate = document.getElementById('filterDate').value;
    const [filterYear, filterMonth] = filterDate ? filterDate.split('-') : [null, null];
    let currentExpenses = [];
    
    if (filterYear && filterMonth && expenses[filterYear] && expenses[filterYear][filterMonth]) {
        currentExpenses = expenses[filterYear][filterMonth];
    }

    updateTotal(currentExpenses);
    updateChart(currentExpenses);
}

// Function to update the total amount
function updateTotal(currentExpenses) {
    const total = currentExpenses.reduce((acc, expense) => acc + expense, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Function to update the chart
function updateChart(currentExpenses) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: currentExpenses.map((_, index) => `Expense ${index + 1}`),
            datasets: [{
                label: 'Amount Spent',
                data: currentExpenses,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize the total and chart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateView();
});
