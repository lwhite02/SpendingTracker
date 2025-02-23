// Retrieve data from local storage or initialize an empty object
let expenses = JSON.parse(localStorage.getItem('expenses')) || {};

// Function to add expense
function addExpense() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    if (amount && date) {
        const [year, month] = date.split('-');
        if (!expenses[year]) expenses[year] = {};
        if (!expenses[year][month]) expenses[year][month] = [];
        expenses[year][month].push({ amount: parseFloat(amount), description });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        updateView();
    }
}

let income = parseFloat(localStorage.getItem('income')) || 0;

// Function to update income
function updateIncome() {
    income = parseFloat(document.getElementById('income').value) || 0;
    localStorage.setItem('income', income);
    updateView();
}
// Function to reset expenses
function resetExpenses() {
    if (confirm('Are you sure you want to reset all expenses?')) {
        expenses = {};
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateView();
    }
}

// Function to update the view based on selected month and year
function updateView() {
    const filterDate = document.getElementById('filterDate').value;
    const [filterYear, filterMonth] = filterDate ? filterDate.split('-') : [null, null];
    let currentExpenses = [];

    if (filterYear && filterMonth && expenses[filterYear] && expenses[filterYear][filterMonth]) {
        currentExpenses = expenses[filterYear][filterMonth];
    }

    updateTotal(currentExpenses);
    updateExpenseList(currentExpenses);
    updatePieChart(currentExpenses);
    updateBalance(); // New function to update balance
}
// Function to update the total amount spent
function updateTotal(currentExpenses) {
    const total = currentExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Function to update the expense list
function updateExpenseList(currentExpenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    currentExpenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <span>${expense.description || 'No Description'}</span>
            <span>R${expense.amount.toFixed(2)}</span>
        `;
        expenseList.appendChild(expenseItem);
    });
}

// Function to update the pie chart
function updatePieChart(currentExpenses) {
    const ctx = document.getElementById('expensePieChart').getContext('2d');
    if (window.myPieChart) {
        window.myPieChart.destroy();
    }
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: currentExpenses.map(expense => expense.description || 'No Description'),
            datasets: [{
                label: 'Amount Spent',
                data: currentExpenses.map(expense => expense.amount),
                backgroundColor: currentExpenses.map((_, index) => `hsl(${index * 360 / currentExpenses.length}, 70%, 50%)`),
                borderWidth: 1
            }]
        }
    });
}
// Function to update the balance
function updateBalance() {
    const totalSpent = parseFloat(document.getElementById('total').textContent) || 0;
    const balance = income - totalSpent;
    document.getElementById('totalIncome').textContent = income.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Initialize the total and charts on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('income').value = income;
    updateView();
});
// Initialize the total and charts on page load
document.addEventListener('DOMContentLoaded', () => {
    updateView();
});
