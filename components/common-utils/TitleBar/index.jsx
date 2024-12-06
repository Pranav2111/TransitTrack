import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {jwt, user} from '../../../atom/authAtom';
import {toTitleCase} from '../commonMethods';
import {useNavigation} from '@react-navigation/native';

const TitleBar = () => {
  const [_t, setToken] = useRecoilState(jwt);
  const [userDetails, setUserDetails] = useRecoilState(user);

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleProfileClick = () => {
    setIsProfileModalVisible(prev => !prev);
  };

  const closeModal = () => {
    setIsProfileModalVisible(false);
  };

  const handleLogOut = () => {
    navigation.navigate('login-signup');
    setToken(null);
    setUserDetails({});
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>TransitTrack</Text>
      </View>
      <TouchableOpacity style={styles.profilePic} onPress={handleProfileClick}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://avatar.iran.liara.run/public/boy',
          }}
          alt="Profile Avatar"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        visible={isProfileModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View
            style={styles.modalContainer}
            onStartShouldSetResponder={e => e.stopPropagation()}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <FontAwesomeIcon icon={faX} />
            </TouchableOpacity>
            <Image
              source={{uri: 'https://avatar.iran.liara.run/public/boy'}}
              style={styles.profileImage}
            />
            <Text style={styles.nameText}>
              {toTitleCase(userDetails?.name || '')}
            </Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogOut}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    top: 200,
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 10},
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ccc',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TitleBar;
