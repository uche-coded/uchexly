import { Stack } from "expo-router";
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function SettingsPage() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Settings" }} />
      <View style={styles.settings}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
        <Link href={"settings/about"} style={{ marginTop: 16 }} >
          <Text style={styles.settingLabel}>About</Text>
        </Link>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  settings: {
    marginTop: 20,
    padding: 16,
    flex: 1
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
