import {StyleSheet, Text, View} from 'react-native';

const TitleBar = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>TransitTrack</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    display: 'flex',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    height: 'auto',
    fontWeight: 700,
    color: '#5b7c99',
    marginLeft: 10,
  },
});

export default TitleBar;
