import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const TitleBar = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>TransitTrack</Text>
      </View>
      <View style={styles.profilePic}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://avatar.iran.liara.run/public/boy',
          }}
          alt="Profile Avatar"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5b7c99',
    marginLeft: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 35,
    overflow: 'hidden',
    borderColor: 'gray',
    borderWidth: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});

export default TitleBar;
