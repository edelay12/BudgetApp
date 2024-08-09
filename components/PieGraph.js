import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import AllowenceApiService from "@/app/services/AllowenceApiService";
export default function PieGraph({ pieData }) {
  //const [data, setData] = useState(pieData);

  /*useEffect(() => {
    // Add any necessary setup here
    // Example: fetch data from an API and update the pieData state
    AllowenceApiService.getGraphData()
      .then((data2) => {
        console.log("pieData", data);
        const pieData = [
          {
            value: data2.datasets[0].data[0],
            color: "#rgb(84,219,234)",
            text: data2.datasets[0].data[0],
          },
          {
            value: data2.datasets[0].data[1],
            color: "lightgreen",
            text: data2.datasets[0].data[1],
          },
          {
            value: data2.datasets[0].data[2],
            color: "orange",
            text: data2.datasets[0].data[2],
          },
        ];
        setData(pieData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); */

  const renderLegend = (text, color) => {
    return (
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || "white",
          }}
        />
        <Text style={{ color: "white", fontSize: 16 }}>{text || ""}</Text>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 30,
          borderRadius: 10,
          paddingVertical: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*********************    Custom Header component      ********************/}
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "500",
            marginBottom: 12,
          }}
        >
          Monthly Expenses
        </Text>
        {/****************************************************************************/}

        <PieChart
          strokeColor="white"
          strokeWidth={4}
          donut
          data={pieData}
          innerCircleColor="#414141"
          innerCircleBorderWidth={4}
          innerCircleBorderColor={"white"}
          showValuesAsLabels={true}
          showText
          textSize={18}
          showTextBackground={false}
          centerLabelComponent={() => {
            return (
              <View>
                {
                  //<Text style={{ color: "white", fontSize: 36 }}>90</Text>
                  //<Text style={{ color: "white", fontSize: 18 }}>Total</Text>
                }
              </View>
            );
          }}
        />

        {/*********************    Custom Legend component      ********************/}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {renderLegend("Expenses", "rgb(84,219,234)")}
          {renderLegend("Bills", "lightgreen")}
          {renderLegend("Subscriptions", "orange")}
        </View>
        {/****************************************************************************/}
      </View>
    </View>
  );
}
