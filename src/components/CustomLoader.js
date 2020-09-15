import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import {scrWidth, scrHeight} from './screenSize';

const CustomLoader = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 20,
      }}>
      <ContentLoader
        active
        avatar
        avatarStyles={{
          width: scrWidth / 4,
          height: scrWidth / 4,
          marginLeft: 50,
        }}
        pRows={1}
        pHeight={[80]}
        pWidth={[200]}
        containerStyles={{flex: 1, marginTop: 50}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ContentLoader
          active
          pRows={2}
          pHeight={[, 80]}
          pWidth={[, 200]}
          containerStyles={{flex: 1, justifyContent: 'center'}}
        />
        <ContentLoader
          active
          pRows={2}
          pHeight={[, 80]}
          pWidth={[, 200]}
          containerStyles={{flex: 1}}
        />
      </View>
      <ContentLoader
        pRows={2}
        pHeight={[20, 150]}
        pWidth={[100, 400]}
        containerStyles={{flex: 1}}
      />
      <ContentLoader
        pRows={2}
        pHeight={[20, 80]}
        pWidth={[100, 290]}
        containerStyles={{flex: 1, marginTop: 100}}
      />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({});
