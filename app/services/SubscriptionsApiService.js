const SubscriptionsApiService = {
  addSubscription: (subscription) => {
    return fetch(`https://budgetserver-6ti7.onrender.com/subscriptions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        date: subscription.date,
        name: subscription.name,
        type: subscription.type,
        amount: subscription.amount,
        category: subscription.category,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getSubscriptions: () => {
    return fetch(`https://budgetserver-6ti7.onrender.com/subscriptions`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteSubscription: (id) => {
    return fetch(`https://budgetserver-6ti7.onrender.com/subscriptions/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      res.ok ? Promise.resolve() : res.json().then((e) => Promise.reject(e))
    );
  },
};

export default SubscriptionsApiService;
