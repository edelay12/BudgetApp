const BillsApiService = {
  addBill: (bill) => {
    return fetch(`https://budgetserver-6ti7.onrender.com/bills`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        date: bill.date,
        name: bill.name,
        type: bill.type,
        amount: bill.amount,
        category: bill.category,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getBills: () => {
    return fetch(`https://budgetserver-6ti7.onrender.com/bills`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteBill: (id) => {
    return fetch(`https://budgetserver-6ti7.onrender.com/bills/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      res.ok ? Promise.resolve() : res.json().then((e) => Promise.reject(e))
    );
  },
};

export default BillsApiService;
