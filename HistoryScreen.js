import React from 'react';
import { View, Text, FlatList } from 'react-native';

// Sample history data
const historyData = [
  { id: '1', prediction: 'Mild', timestamp: '2023-09-02 12:00 PM' },
  { id: '2', prediction: 'Moderate', timestamp: '2023-09-01 10:30 AM' },
  // Add more history entries as needed
];

export default function HistoryScreen() {
  return (
    <View>
      <Text>History</Text>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Prediction: {item.prediction}</Text>
            <Text>Timestamp: {item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
}
