const AllowenceApiService = {
  getAllowence: () => {
    return fetch(`https://budgetserver-6ti7.onrender.com/allowence`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getGraphData: () => {
    return fetch(`https://budgetserver-6ti7.onrender.com/piegraph`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default AllowenceApiService;
