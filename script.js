// Retrieve data from local storage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to add expense
function addExpense() {
    const amount = document.getElementById('amount').value;
    if (amount) {
        expenses.push(parseFloat(amount));
        localStorage.setItem('expenses', JSON.stringify(expenses));
        document.getElementById('amount').value = '';
        updateTotal();
        updateChart();
    }
}

// Function to update the total amount
function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + expense, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Function to update the chart
function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: expenses.map((_, index) => `Expense ${index + 1}`),
            datasets: [{
                label: 'Amount Spent',
                data: expenses,
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
    updateTotal();
    updateChart();
});
