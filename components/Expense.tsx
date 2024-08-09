import { StyleSheet,  Animated, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Expense(props) {
  const fAIcon = {
    Shopping: {
      icon: "shopping-bag",
      color: "#50B060",
    },
    Gas: {
      icon: "car",
      color: "#F44336",
    },
    Food: {
      icon: "cutlery",
      color: "#50B060",
    },
  };

  const toggleDelete = () => {
    console.log("Delete expense", props.id);
  }
 

  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={props.deleteItem}>
        <View style={styles.titleContainer}>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              marginRight: 10,
              backgroundColor:
                props.category === "Gas"
                  ? "#50B060"
                  : props.category === "Shopping"
                  ? "#D64E80"
                  : "#ECCB56",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {
              <FontAwesome
                name={fAIcon[props.category].icon}
                size={24}
                color="#FFFFFF"
              />
            }
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.type}>{props.type}</Text>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amount}>${props.amount}</Text>
            <Text style={styles.category}>{props.category}</Text>
          </View>
        </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "flex-start",
    flexDirection: "column",
    width: "100%",
    marginVertical: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    marginRight: 10,
    backgroundColor: "#D64E80",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  bodyContainer: {
    flexDirection: "row",
    width: "100%",
  },
  nameContainer: {
    justifyContent: "center",
  },
  date: {
    fontSize: 16,
    color: "#8A8A8A",
    paddingLeft: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  type: {
    color: "#60636B",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  category: {
    color: "#60636B",
    alignSelf: "flex-end",
    paddingRight: 3,
  },
  amountContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 3,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
