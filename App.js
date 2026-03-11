import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Praktikum Pemrograman Mobile</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3640',
    alignItems: 'center',
    justifyContent: 'center',
  },
  judul: {
    fontSize: 24,
    color: '#fbc531',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
