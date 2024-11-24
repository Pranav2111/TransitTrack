import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {useRecoilState} from 'recoil';
import {jwt, user} from '../../../atom/authAtom';
import {useNavigation} from '@react-navigation/native';

const ProfileTab = () => {
  const [_t, setToken] = useRecoilState(jwt);
  const [userDetails, setUserDetails] = useRecoilState(user);

  const navigation = useNavigation();

  const handleLogOut = () => {
    navigation.navigate('login-signup');
    setToken(null);
    setUserDetails({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{uri: 'https://avatar.iran.liara.run/public/boy'}}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{userDetails.name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faEnvelope} size={20} color="#555" />
            <Text style={styles.infoText}>{userDetails.email}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f5f7',
  },
  profileCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoContainer: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 100,
    backgroundColor: '#4699c9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 120,
  },
  logoutButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 500,
    fontSize: 16,
  },
});

export default ProfileTab;
