import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useEffect, useState } from "react";
import { Text, View } from '@/components/Themed';
import Expense from '@/components/Expense';
import ExpenseApiService from "../services/ExpenseApiService";

export default function Expenses() {
  const [expenses, setData] = useState([
    // Example expense data
    // Add more expenses here
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform data fetching or any other necessary task
    ExpenseApiService.getExpenses().then(data => {
      setData(data.reverse())
      setRefreshing(false);
  }).catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    // TODO: fech expenses data here
    // Example: fetch('https://example.com/api/expenses')
    //.then(response => response.json())
    //.then(data => setData(data))
    //.catch(error => console.error('Error:', error));
      ExpenseApiService.getExpenses().then(data => setData(data.reverse())).catch(error => console.error('Error:', error));
    }, []);

    const deleteExpense = (id) => {
        ExpenseApiService.deleteExpense(id).then(data => data ? setData(data.reverse()) : []).catch(error => console.error('Error:', error));
    }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.expenseList} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        {expenses && expenses.map((expense, i) => {
          return <Expense key={i} deleteItem={() => deleteExpense(expense.id)} id={expense.id} name={expense.name} amount={expense.amount} date={expense.date} type={expense.type} category={expense.category}/>
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  expenseList: { 
    width: '100%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
