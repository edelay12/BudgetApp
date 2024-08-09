import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState, useEffect } from "react";
import ExpenseApiService from "../services/ExpenseApiService";
export default function Settings() {
  const [showAllowence, setShowAllowance] = useState(false);
  const [allowance, setAllowance] = useState(500);
  const [reset, setReset] = useState(false);

  const handleAmountChange = (text) => {
    console.log(text);
  };
  const handleSaveAmount = () => {
    // setAllowance(Number(allowance));
    // setShowAllowance(false);
    // setReset(true);
  };

  const handleReset = () => {
    ExpenseApiService.resetMonth()
      .then((res) => {
        setReset(true);
        setTimeout(() => {
          setReset(false);
        }, 3000);
      })
      .catch((err) => console.error("Error resetting month: ", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={() => handleReset()}>
        Reset for new month
      </Text>
      {reset && (
        <Text style={styles.resetMessage}>Month reset successfully!</Text>
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text
        style={styles.title}
        onPress={() => setShowAllowance(!showAllowence)}
      >
        Change allowence amount
      </Text>
      {showAllowence && (
        <>
          <TextInput
            style={styles.amountMain}
            keyboardType="numeric"
            placeholder="00.00"
            placeholderTextColor="#42374D"
            onChangeText={handleAmountChange}
          />
          <Text style={styles.saveButton} onPress={() => handleSaveAmount}>
            Save amount
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  resetMessage: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    padding: 20,
    width: "80%",
    fontWeight: "bold",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  saveButton: {
    padding: 20,
    width: "80%",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  amountMain: {
    height: 50,
    width: "80%",
    borderRadius: 10,
    color: "#ffffff",
    fontSize: 25,
    height: "100%",
  },
});
