import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ExpenseSuccess(props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.successIcon}>
          <FontAwesome name="check-circle" size={100} color="#50B060" />
        </Text>
        <Text style={styles.successMessage}>Item added successfully!</Text>
        <Text style={styles.returnMessage} onPress={props.returnToExpenses}>
          Return to add another item
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A2CF5",
  },

  iconContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#5A2CF5",
  },
  successIcon: {
    marginBottom: 10,
  },
  returnMessage: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    fontSize: 20,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
