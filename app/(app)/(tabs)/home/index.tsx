import { useState } from 'react';
import { Text, View, StyleSheet, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Link, Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

export default function Page() {
  const [user, setUser] = useState({
    rideName: 'Sampar 01',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, Springfield, USA',
    thumbnail: 'https://via.placeholder.com/150',
    bio: "I am a bad man rider!!!",
    state: "Lagos",
    country: "Nigeria"
  });

  const handleEditProfile = () => {
    // Add your edit profile logic here
    console.log('Edit Profile');
  };
  return (
    <>
      <View>
        <Stack.Screen options={{ headerShown: false, title: "Home" }} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.name}>{user.rideName}</Text>
            <Text style={styles.email}>{user.bio}</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailValue}>{user.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Address:</Text>
              <Text style={styles.detailValue}>{user.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>State:</Text>
              <Text style={styles.detailValue}>{user.state}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Country:</Text>
              <Text style={styles.detailValue}>{user.country}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailLabel: {
    fontSize: 16,
    color: 'gray',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settings: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 16,
  },
});
