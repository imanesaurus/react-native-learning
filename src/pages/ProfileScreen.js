import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ButtonTemplate from '../components/buttonTemplate';
import Colors from '../components/colors';
import {UserContext} from '../components/Context';
import {scrWidth} from '../components/screenSize';

const TextBottomCard = (props) => {
  // const {route} = props;
  // // const {Userid} = route.params;
  // const {userGuest} = route.params;

  return (
    <TouchableOpacity>
      <View
        style={{
          ...styles.textBottom,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.TextColor, fontSize: 20}}>
          {props.title}
        </Text>
        <Image
          style={{width: 20, height: 20}}
          source={require('../assets/icons/right-arrow.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = (props) => {
  const userGuest = useContext(UserContext);
  // const {navigation, route} = props;

  // const {userGuest} = route.params;
  // const {userId} = route.params;

  // const availableUser = useSelector((state) =>
  //   state.user.availableUsers.find((user) => user.id === userId),
  // );

  return (
    <ScrollView style={styles.content}>
      <View style={styles.content}>
        <View style={styles.upperCard}>
          <View style={styles.mainWrapper}>
            <Image
              style={styles.image}
              source={require('../assets/icons/profile.png')}
            />
          </View>
          <View style={styles.textCard}>
            <Text numberOfLines={2} style={styles.name}>
              {userGuest}
            </Text>
            <Text
              numberOfLines={2}
              style={{...styles.name, fontSize: 10, color: 'gray'}}>
              Company Name
            </Text>
          </View>
        </View>
        <View style={styles.cardWrapper}>
          <Text style={{...styles.textBottom, color: 'gray'}}>
            Account Settings
          </Text>
          <TextBottomCard title="Edit details" />
          <TextBottomCard title="Account Settings" />
          <TextBottomCard title="Privacy" />
          <TextBottomCard title="Notifications" />
        </View>
        <ButtonTemplate
          bgcolor={Colors.AccentColor}
          title="Logout"
          textColor="white"
          widthstyle={scrWidth * 0.7}
          buttonSty={{
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fcf2bb',
    flex: 1,
    paddingTop: 40,
    paddingBottom: 50,
  },
  upperCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: scrWidth,
  },
  mainWrapper: {
    width: scrWidth / 4,
    height: scrWidth / 4,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 15,
    textAlign: 'left',
    color: Colors.TextColor,
  },
  cardWrapper: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
    height: '100%',
    backgroundColor: 'white',
    marginTop: 30,
    borderRadius: 15,
    elevation: 2,
    paddingTop: 20,
    paddingBottom: 40,
  },
  textBottom: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  textCard: {
    paddingLeft: 20,
    backgroundColor: 'white',
    elevation: 1,
    width: scrWidth / 2,
    height: scrWidth / 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 5,
  },
});

export default ProfileScreen;
