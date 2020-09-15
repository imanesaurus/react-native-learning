import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonTemplate from '../components/buttonTemplate';
import Colors from '../components/colors';
import TextInp from '../components/inputTemplate';
import {scrHeight, scrWidth} from '../components/screenSize';
import {COURSES} from '../data/dummy-data';

const BUTTON_SIZE = scrWidth * 0.5;
const CompanyScreen = ({navigation}) => {
  const COMPANY_ID = '0001';
  const USER_ID = 'Guest';
  const NAME = 'Firmansyah Otoluwa';
  const GUEST_USER = COURSES.id === 'Admin';
  const [compId, setCompId] = useState('');

  const onPressCompany = () => {
    if (compId === COMPANY_ID) {
      props.navigation.replace('LoginScr', {
        companyId: compId,
      });
    } else {
      Alert.alert('Login Error', 'Please Insert Valid Company ID');
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <View>
        <Image
          source={require('../assets/background/authBackground.png')}
          style={{
            height: scrHeight * 0.5,
            width: scrWidth,
            resizeMode: 'stretch',
          }}
        />
      </View>
      <View>
        <TextInp
          placeholderText="Please Insert Company ID"
          onChange={(text) => setCompId(text)}
          type="number-pad"
        />
        <ButtonTemplate
          title="Submit"
          bgcolor={Colors.PrimaryColor}
          onPress={onPressCompany}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeScr', {
            usertits: 11,
            userName: 'Admin',
            companyName: 'PT Company',
          });
        }}>
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompanyScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
