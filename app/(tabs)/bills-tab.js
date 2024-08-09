import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import { Text, View } from "@/components/Themed";
import Expense from "@/components/Expense";
import BillsApiService from "../services/BillsApiService";
import SubscriptionsApiService from "../services/SubscriptionsApiService";
export default function Bills() {
  const [bills, setBillsData] = useState([
    // Example expense data
    // Add more expenses here
  ]);
  const [subscriptions, setSubsData] = useState([
    // Example expense data
    // Add more expenses here
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform data fetching or any other necessary task
    BillsApiService.getBills()
      .then((data) => {
        setBillsData(data.reverse());
        setRefreshing(false);
      })
      .catch((error) => console.error("Error:", error));

    SubscriptionsApiService.getSubscriptions()
      .then((data) => {
        console.log("Subscriptions: ", data);
        setSubsData(data.reverse());
        setRefreshing(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    // TODO: fech expenses data here
    // Example: fetch('https://example.com/api/expenses')
    //.then(response => response.json())
    //.then(data => setData(data))
    //.catch(error => console.error('Error:', error));
    BillsApiService.getBills()
      .then((data) => {
        setBillsData(data.reverse());
      })
      .catch((error) => console.error("Error:", error));

    SubscriptionsApiService.getSubscriptions()
      .then((data) => {
        setSubsData(data.reverse());
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const deleteBill = (id) => {
    BillsApiService.deleteBill(id)
      .then((data) => (data ? setBillsData(data.reverse()) : []))
      .catch((error) => console.error("Error:", error));
  };
  const deleteSubscription = (id) => {
    console.log("Deleting subscription: ", id);
    SubscriptionsApiService.deleteSubscription(id)
      .then((data) => (data ? setSubsData(data.reverse()) : []))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.expenseList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        <Text style={styles.typeTitle}>Bills</Text>

        {bills &&
          bills.map((bill, i) => {
            return (
              <Expense
                key={i}
                deleteItem={() => deleteBill(bill.id)}
                id={bill.id}
                name={bill.name}
                amount={bill.amount}
                date={bill.date}
                type={bill.type}
                category={bill.category}
              />
            );
          })}

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.typeTitle}>Subscriptions</Text>
        {subscriptions &&
          subscriptions.map((subscription, i) => {
            return (
              <Expense
                key={i}
                id={subscription.id}
                deleteItem={() => deleteSubscription(subscription.id)}
                name={subscription.name}
                amount={subscription.amount}
                date={subscription.date}
                type={subscription.type}
                category={subscription.category}
              />
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expenseList: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  typeTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    paddingRight: 5,
  },
});
