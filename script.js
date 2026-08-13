let expenses = [];


// Get HTML elements

const expenseForm = document.getElementById("expenseForm");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const categoryInput =
    document.getElementById("category");

const expenseList =
    document.getElementById("expenseList");

const totalAmount =
    document.getElementById("totalAmount");

const expenseCount =
    document.getElementById("expenseCount");


// Add expense

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const description =
        descriptionInput.value.trim();

    const amount =
        Number(amountInput.value);

    const category =
        categoryInput.value;


    if (description === "" || amount <= 0) {
        return;
    }


    const expense = {

        id: Date.now(),

        description: description,

        amount: amount,

        category: category

    };


    expenses.push(expense);


    expenseForm.reset();


    displayExpenses();

});


// Display expenses

function displayExpenses() {

    expenseList.innerHTML = "";


    if (expenses.length === 0) {

        expenseList.innerHTML =
            '<p id="emptyMessage">No expenses yet.</p>';

        updateSummary();

        return;
    }


    expenses.forEach(function(expense) {

        const expenseItem =
            document.createElement("div");


        expenseItem.className =
            "expense-item";


        expenseItem.innerHTML = `

            <div class="expense-info">

                <h3>${expense.description}</h3>

                <p>${expense.category}</p>

            </div>


            <div>

                <span class="expense-amount">
                    Rs. ${expense.amount.toLocaleString()}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>

            </div>

        `;


        expenseList.appendChild(expenseItem);

    });


    updateSummary();

}


// Delete expense

function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {

        return expense.id !== id;

    });


    displayExpenses();

}


// Update summary

function updateSummary() {

    let total = 0;


    expenses.forEach(function(expense) {

        total += expense.amount;

    });


    totalAmount.textContent =
        "Rs. " + total.toLocaleString();


    expenseCount.textContent =
        expenses.length;

}
