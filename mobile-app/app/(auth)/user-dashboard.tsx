import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { dataSource } from '../../constants/mockData';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';

interface DataItem {
  id: number;
  itemType: string;
  company: string;
  amount: number;
}

const UserDashboardScreen = () => {
  const { user, logout } = useAuth();

  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.itemType}</Text>
      <Text style={styles.cell}>{item.company}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
    </View>
  );

  return (
    <ProtectedRoute allowedLevel="user">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {user?.username}</Text>
          <Button title="Logout" onPress={logout} color="#ff4d4f" />
        </View>
        <Text style={styles.title}>User Dashboard</Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Item Type</Text>
            <Text style={styles.headerCell}>Company</Text>
            <Text style={styles.headerCell}>Amount</Text>
          </View>
          <FlatList
            data={dataSource}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default UserDashboardScreen;