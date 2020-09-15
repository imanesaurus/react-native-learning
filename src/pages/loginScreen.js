import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import * as AuthActions from '../../store/actions/auth';
import ButtonTemplate from '../components/buttonTemplate';
import Colors from '../components/colors';
import TextInp from '../components/inputTemplate';
import {scrHeight, scrWidth} from '../components/screenSize';

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userid, setUserid] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState();
  const HOME_SCREEN = 'HomeScr';
  const userGuest = 'Guest';
  const tabPos = '10';
  const isloaded = true;
  const dispatch = useDispatch();
  // const ListUsers = useSelector(state =>
  //   state.login.login.find(user => user.id === userid),
  // );
  const ListUsers = useSelector((state) =>
    state.user.availableUsers.find((user) => user.id === userid),
  );

  onPressLoginUsers = async () => {
    let action;
    action = AuthActions.login(userid, pass);
    setError(null);
    setIsLoading(!isLoading);
    try {
      await dispatch(action);
      props.navigation.navigate(HOME_SCREEN, {
        screen: 'Home',
        params: {
          userId: userid,
        },
      });
      setIsLoading(!isLoading);
    } catch (err) {}
  };

  // if (isLoading) {
  //   return (
  //     <Modal hardwareAccelerated={true} visible={true}>
  //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //         <ActivityIndicator size={'small'} />
  //       </View>
  //     </Modal>
  //   );
  // }

  return (
    <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
      {/* <ScrollView> */}
      <View style={styles.mainWrapper}>
        <View>
          <Image
            source={require('../assets/background/authBackground.png')}
            style={styles.imageStyles}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 150,
          }}> 
          {/* Logo Image Here */}
        </View>
        <View>
          <TextInp
            value={userid}
            placeholderText="Username"
            onChange={(text) => setUserid(text)}
            heightSize={scrHeight * 0.07}
          />
          <TextInp
            placeholderText="Password"
            value={pass}
            secureTextEntry
            placeholderText="Password"
            onChange={(text) => setPass(text)}
            heightSize={scrHeight * 0.07}
          />
          <ButtonTemplate
            title="Login"
            bgcolor="gold"
            textColor="#303030"
            onPress={() => {
              onPressLoginUsers(userid, pass);
            }}
          />
          <TouchableOpacity
            onPress={async () => {
              await setIsLoading(true);
              props.navigation.replace(HOME_SCREEN, {
                screen: 'Home',
                params: {
                  userGuest,
                  pass,
                  isloaded,
                  tabPos
                },
              });
              setIsLoading(false);
            }}>
            {isLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <ActivityIndicator size={'small'} color={'red'} />
              </View>
            ) : (
              <Text style={{textAlign: 'center', color: 'gray', marginTop: 10}}>
                Skip
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: scrWidth * 0.9,
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <ButtonTemplate
            title="Create New Account"
            buttonSty={{width: '48%', elevation: 2}}
            bgcolor="gold"
            textColor={Colors.TextColor}
          />
          <ButtonTemplate
            title="Forgot Password"
            buttonSty={{width: '48%', elevation: 2}}
            type="clear"
            bgcolor="lightgray"
            textColor={Colors.TextColor}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    height: scrHeight * 0.5,
    width: scrWidth,
    resizeMode: 'stretch',
    // position: 'relative',
  },
});
