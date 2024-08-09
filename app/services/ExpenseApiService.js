import ApiUrl from "../../constants/ApiUrl";

const ExpenseApiService = {
  addExpense: (expense) => {
    return fetch(`https://budgetserver-6ti7.onrender.com/expenses`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        date: expense.date,
        name: expense.name,
        type: expense.type,
        amount: expense.amount,
        category: expense.category,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getExpenses: () => {
    return fetch(`https://budgetserver-6ti7.onrender.com/expenses`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  resetMonth: () => {
    return fetch(`https://budgetserver-6ti7.onrender.com/expenses/reset`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      res.ok ? Promise.resolve() : res.json().then((e) => Promise.reject(e))
    );
  },
  deleteExpense: (id) => {
    return fetch(`https://budgetserver-6ti7.onrender.com/expenses/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      res.ok ? Promise.resolve() : res.json().then((e) => Promise.reject(e))
    );
  },
};

export default ExpenseApiService;
