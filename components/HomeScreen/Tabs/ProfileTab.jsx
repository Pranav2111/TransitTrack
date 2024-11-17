import React from 'react';
import {Text, Image, StyleSheet, ScrollView, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

const ProfileTab = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    profilePic: 'https://avatar.iran.liara.run/public/boy',
    location: 'New York, USA',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image source={{uri: user.profilePic}} style={styles.profilePic} />
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faEnvelope} size={20} color="#555" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faPhone} size={20} color="#555" />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={20} color="#555" />
            <Text style={styles.infoText}>{user.location}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
});

export default ProfileTab;