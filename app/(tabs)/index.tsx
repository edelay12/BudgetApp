import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import AllowenceApiService from '../services/AllowenceApiService';
import PieGraph from '../../components/PieGraph';
export default function Home() {

  const [allowence, setAllowence] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  let day = new Date().getDate()
  let month = 0; // January
  let d = new Date(2024, month + 1, 0);
  const daysLeftInMonth = Number(d.toString().split(" ")[2]) - day;
  const dailyAllowance = allowence / daysLeftInMonth;
  // last day in January
 // const availableDays = lastDayOfMonth(today.getMonth(), today.getFullYear()) - day;
  //const lastDayOfMonth = (m, y) => {
 //   return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
//}
 // Date.prototype.monthStart= function(){
  //  var d= new Date(this.getFullYear(), this.getMonth(), 1);
  //  return d.getDay();

 
  const pieData = [
    { value: 54, color: "#177AD5", text: "54%" },
    { value: 40, color: "#79D2DE", text: "30%" },
    { value: 20, color: "#ED6665", text: "26%" },
  ];
  const [data, setData] = useState(pieData);

  useEffect(() => {
    AllowenceApiService.getAllowence().then(data => setAllowence(data)).catch(() => console.error('Failed to fetch allowance'));
    // Add any necessary setup here
    // Example: fetch data from an API and update the pieData state
    AllowenceApiService.getGraphData()
      .then((data2) => {
        console.log("pieData", data);
        const pieData = [
          {
            value: data2.datasets[0].data[0],
            color: "#rgb(84,219,234)",
            text: `$${data2.datasets[0].data[0]}`,
          },
          {
            value: data2.datasets[0].data[1],
            color: "lightgreen",
            text: `$${data2.datasets[0].data[1]}`,
          },
          {
            value: data2.datasets[0].data[2],
            color: "orange",
            text: `$${data2.datasets[0].data[2]}`,
          },
        ];
        setData(pieData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform data fetching or any other necessary task
    AllowenceApiService.getAllowence().then(data => {
      setAllowence(data)
      setRefreshing(false);
  }).catch(() => console.error('Failed to fetch allowance'));

  AllowenceApiService.getGraphData()
      .then((data2) => {
        console.log("pieData", data);
        const pieData = [
          {
            value: data2.datasets[0].data[0],
            color: "#rgb(84,219,234)",
            text: `$${data2.datasets[0].data[0]}`,
          },
          {
            value: data2.datasets[0].data[1],
            color: "lightgreen",
            text: `$${data2.datasets[0].data[1]}`,
          },
          {
            value: data2.datasets[0].data[2],
            color: "orange",
            text: `$${data2.datasets[0].data[2]}`,
          },
        ];
        setData(pieData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.allowenceList} refreshControl={
         <RefreshControl
         refreshing={refreshing}
         onRefresh={onRefresh}
         tintColor="#fff"
       />
      }
      >
      <View style={styles.allowenceContainer}>
         <View style={styles.availableContainer}>
          <Text style={styles.available}>
            Available
          </Text>
          <Text style={styles.total}>
            ${allowence}
          </Text>
          </View>
          <View style={styles.daysLeftContainer}>
          <Text style={styles.available}>
            Left in month
          </Text>
          <Text style={styles.total}>
            {daysLeftInMonth} days
          </Text>
          </View>
        </View>
        <View style={styles.dailyContainer}>
          <Text style={styles.available}>Daily Available</Text>
          <Text style={styles.availableTotal}>${dailyAllowance.toFixed(0)}</Text>
        </View>
        <View style={styles.chartContainer}>
            <PieGraph pieData={data}/>
        </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingBottom: 20,
  },
  allowenceList: {
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  allowenceContainer: {
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: 'space-around',
    height: 140,
  },
  daysLeftContainer: {
    backgroundColor: '#1E1E1E',
  },
  availableContainer: { 
    backgroundColor: '#1E1E1E',
  },
  available: {
    color: '#8A8A8A',
    fontSize: 18,
  },
  total: { 
    color: "#FFFFFF",
    fontSize: 42,
    marginBottom: 10,
  },
  dailyContainer: {
    padding: 20,
    width: '50%',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    alignSelf: 'flex-start',
    height: 140,
  },
  availableTotal: {
    color: "#FFFFFF",
    fontSize: 20,
    marginVertical: 10,
  },
  chartContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    height: '100%',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  }
});
