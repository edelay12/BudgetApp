import {
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Pressable,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import SelectDropdown from "react-native-select-dropdown";

export default function KeyboardInput({ postItem }) {
  const [inputText, setInputText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  //default values for dropdowns
  // dismiss keyboard on screen press
  //
  const categorys = [
    { title: "Shopping" },
    { title: "Gas" },
    { title: "Food" },
  ];
  const types = [
    { title: "Expense" },
    { title: "Bill" },
    { title: "Subscription" },
  ];
  const createItem = (item) => {
    if (inputText && amount && category && type) {
      postItem({
        name: inputText,
        amount: amount,
        category: category,
        type: type,
        date: date.toISOString().slice(0, 10),
      });
      Keyboard.dismiss();
      setInputText(""), setAmount(""), setCategory(""), setType("");
    } else {
      // set button color red or show error message
      console.log("Please fill all fields");
    }
  };

  const handleInputChange = (text) => {
    setInputText(text);
  };
  const handleAmountChange = (num) => {
    // handleAmountChange() function
    setAmount(num);
  };

  useEffect(() => {
    Keyboard.dismiss();
    setInputText(""), setAmount(""), setCategory(""), setType("");
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={inputText}
          onChangeText={(txt) => handleInputChange(txt)}
          style={styles.input}
          placeholder="Enter item name"
          autoCapitalize="words"
          autoCorrect={false}
          placeholderTextColor="#42374D"
          returnKeyType="done"
          onSubmitEditing={() => {
            // onSubmitEditing() function
          }}
        />
        <View style={styles.amountContainer}>
          <Text
            style={{
              fontSize: 75,
              color: amount === "" ? "#42374D" : "#FFFFFF",
            }}
          >
            $
          </Text>
          <TextInput
            style={styles.amountMain}
            keyboardType="numeric"
            placeholder="00.00"
            placeholderTextColor="#42374D"
            onChangeText={handleAmountChange}
          />
        </View>
      </View>

      <View style={styles.selectContainer}>
        <View style={styles.categoryContainer}>
          <SelectDropdown
            data={categorys}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setCategory(selectedItem.title);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || "Category"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View style={styles.typeContainer}>
          <SelectDropdown
            data={types}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setType(selectedItem.title);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || "Type"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
      </View>

      <Pressable style={styles.addButton} onPress={() => createItem()}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "95%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    alignSelf: "flex-end",
    elevation: 5,
  },
  input: {
    marginTop: 70,
    marginBottom: 25,
    width: 300,
    height: 50,
    borderRadius: 10,
    color: "#ffffff",
    fontSize: 20,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "space-between",
    width: "100%",
  },
  amountLabel: {
    fontSize: 75,
  },
  amountMain: {
    height: 50,
    borderRadius: 10,
    color: "#ffffff",
    fontSize: 75,
    height: "100%",
  },
  addButton: {
    backgroundColor: "#FDFDFD",
    width: "90%",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  addButtonText: {
    color: "#42374D",
  },
  selectContainer: {
    backgroundColor: "#1D1820",
    width: "90%",
    height: 100,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    width: "50%",
    height: 100,
    backgroundColor: "#1D1820",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  typeContainer: {
    paddingHorizontal: 5,
    width: "50%",
    height: 100,
    backgroundColor: "#1D1820",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownButtonStyle: {
    width: "100%",
    height: 60,
    backgroundColor: "#0D0A0F",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#FFFFFF",
    textAlign: "center",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
    width: "auto",
    maxHeight: 200,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItemStyle: {
    width: "90%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
