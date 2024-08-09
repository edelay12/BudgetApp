import { StyleSheet } from "react-native";
import { useState } from "react";
import { Text, View } from "@/components/Themed";
import KeyboardInput from "../../components/KeyboardInput";
import ExpenseApiService from "../services/ExpenseApiService";
import ExpenseSuccess from "../../components/ExpenseSuccess";
import BillsApiService from "../services/BillsApiService";
import SubscriptionsApiService from "../services/SubscriptionsApiService";

export default function AddTabScreen() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const returnToExpenses = () => {
    setShowMessage(false);
  };

  const postItem = (item) => {
    //check item
    if (item.type === "Expense") {
      // add expense to expenses array
      ExpenseApiService.addExpense(item)
        .then((res) => {
          console.log("Added expense", res);
          setShowMessage(true);
        })
        .catch((err) => console.log("Error adding expense", err));
      // update total expenses
      //ExpenseApiService.updateTotalExpenses(item.amount);
      //add success message with state and add option to return then !state of success message
    } else if (item.type === "Bill") {
      // add bill to bills array
      BillsApiService.addBill(item)
        .then((res) => {
          console.log("Added bill", res);
          setShowMessage(true);
        })
        .catch((err) => console.log("Error adding bill", err));
    } else if (item.type === "Subscription") {
      // add subscription to subscriptions array
      SubscriptionsApiService.addSubscription(item)
        .then((res) => {
          console.log("Added subscription", res);
          setShowMessage(true);
        })
        .catch((err) => console.log("Error adding subscription", err));
    } else {
      console.log("Invalid type");
    }
    console.log("Adding tab", item);
  };

  return (
    <View style={styles.container}>
      {showMessage ? (
        <ExpenseSuccess returnToExpenses={() => returnToExpenses()} />
      ) : (
        <KeyboardInput postItem={postItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#5A2CF5",
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
});
