import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import Colors from '../components/colors';
import { scrHeight } from '../components/screenSize';

const LeaderboardScreen = () => {
  //   const [user, setUser] = useState([]);
  return (
    <View style={{marginTop: 10}}>
      <Card style={styles.container}>
        <View
          style={{
            backgroundColor: 'gold',
            height: scrHeight / 12,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Text style={styles.textTitle}>Steve Jabs</Text>
          <Text style={{...styles.textTitle, color: 'white'}}>11.457 Points</Text>
        </View>
      </Card>
      <Card style={styles.container}>
        <View
          style={{
            backgroundColor: 'silver',
            height: scrHeight / 12,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Text style={styles.textTitle}>Mark Sukaberg</Text>
          <Text style={{...styles.textTitle, color: 'white'}}>11.457 Points</Text>
        </View>
      </Card>
      <Card style={styles.container}>
        <View
          style={{
            backgroundColor: '#cd7f32',
            height: scrHeight / 12,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Text style={styles.textTitle}>Bill Doors</Text>
          <Text style={{...styles.textTitle, color: 'white'}}>11.457 Points</Text>
        </View>
      </Card>
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  textTitle: {
    fontSize: 20,
    marginHorizontal: 10,
    color: Colors.TextColor,
  },
});
