import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { dataSource, itemTypeSource, historySource } from '../../constants/mockData';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';

interface DataItem {
  id: number;
  itemType: string;
  company: string;
  amount: number;
  note: string;
  user: string;
  status: string;
}

interface ItemType {
  id: number;
  name: string;
  user: string;
}

interface HistoryItem {
  id: number;
  action: string;
  content: string;
  user: string;
}

const AdminDashboardScreen = () => {
  const { user, logout } = useAuth();

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.itemType}</Text>
      <Text style={styles.cell}>{item.company}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.note}</Text>
      <Text style={styles.cell}>{item.user}</Text>
      <Text style={styles.cell}>{item.status}</Text>
    </View>
  );

  const renderItemType = ({ item }: { item: ItemType }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.user}</Text>
    </View>
  );

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.action}</Text>
      <Text style={styles.cell}>{item.content}</Text>
      <Text style={styles.cell}>{item.user}</Text>
    </View>
  );

  return (
    <ProtectedRoute allowedLevel="admin">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {user?.username}</Text>
          <Button title="Logout" onPress={logout} color="#ff4d4f" />
        </View>
        <Text style={styles.title}>Admin Dashboard</Text>

        <Text style={styles.sectionTitle}>Data</Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Item Type</Text>
            <Text style={styles.headerCell}>Company</Text>
            <Text style={styles.headerCell}>Amount</Text>
            <Text style={styles.headerCell}>Note</Text>
            <Text style={styles.headerCell}>User</Text>
            <Text style={styles.headerCell}>Status</Text>
          </View>
          <FlatList
            data={dataSource}
            renderItem={renderDataItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <Text style={styles.sectionTitle}>Item Types</Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>User</Text>
          </View>
          <FlatList
            data={itemTypeSource}
            renderItem={renderItemType}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <Text style={styles.sectionTitle}>History</Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Action</Text>
            <Text style={styles.headerCell}>Content</Text>
            <Text style={styles.headerCell}>User</Text>
          </View>
          <FlatList
            data={historySource}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    marginBottom: 20,
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

export default AdminDashboardScreen;