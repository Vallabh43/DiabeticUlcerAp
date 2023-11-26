import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Title, DataTable, Button, Text } from 'react-native-paper';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { FIREBASE_RTDB, FIREBASE_AUTH } from './FirebaseConfig';
import { onValue, off, ref } from 'firebase/database';

export default function HistoryScreen({ navigation }) {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    const historyRef = ref(FIREBASE_RTDB, `user_predictions/${user.uid}`);
    
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const historyArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        setHistoryData(historyArray);
      }
    });

    return () => {
      off(historyRef, 'value');
    };
  }, []);

  const calculatePieData = () => {
    const ulcerCount = historyData.filter((entry) => entry.prediction === 'Ulcer').length;
    const normalCount = historyData.filter((entry) => entry.prediction === 'Healthy').length;
    return [
      { x: 'Ulcer', y: ulcerCount },
      { x: 'Healthy', y: normalCount },
    ];
  };

  if (historyData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
        <Title style={{ fontSize: 24, marginBottom: 20 }}>Diagnosis History</Title>
        <Text>No diagnosis history available</Text>
        <Button mode="contained" onPress={() => navigation.navigate('ImageCapture')}>
          Make a Diagnosis
        </Button>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingTop: 16 }}>
      <Title style={{ fontSize: 24, marginBottom: 20 }}>Diagnosis History</Title>

      <DataTable style={{ borderWidth: 1, borderColor: '#ddd' }}>
        <DataTable.Header>
          <DataTable.Title style={{ color: 'white', fontWeight: 'bold' }}>Prediction</DataTable.Title>
          <DataTable.Title style={{ color: 'white', fontWeight: 'bold' }}>Timestamp</DataTable.Title>
        </DataTable.Header>

        {historyData.map((item) => (
          <DataTable.Row
            key={item.id}
            style={{
              backgroundColor: item.prediction === 'Ulcer' ? 'rgba(255, 87, 51, 0.7)' : 'rgba(51, 255, 132, 0.7)',
            }}
          >
            <DataTable.Cell style={{ color: 'white' }}>{item.prediction}</DataTable.Cell>
            <DataTable.Cell style={{ color: 'white' }}>{new Date(item.timestamp).toLocaleString()}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <VictoryPie
          data={calculatePieData()}
          colorScale={['#FF5733', '#33FF84']}
          width={300}
          height={300}
          style={{ labels: { fontSize: 16, fontWeight: 'bold' } }}
          labelPlacement={({ index }) => (index === 0 ? 'vertical' : 'parallel')}
          labelPosition={({ index }) => (index === 0 ? 'endAngle' : 'startAngle')}
          labels={() => ''}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
            <View style={{ width: 10, height: 10, backgroundColor: '#FF5733', marginRight: 5 }} />
            <Text style={{ fontSize: 14 }}>Ulcer</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, backgroundColor: '#33FF84', marginRight: 5 }} />
            <Text style={{ fontSize: 14 }}>Healthy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
