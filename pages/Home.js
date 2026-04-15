import React, { useState, useEffect, useMemo, useRef} from "react";
import { View, Text, StyleSheet, SafeAreaView, 
TouchableOpacity, 
ScrollView, 
FlatList,
Alert, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


const initialHistory = [
  { id: "1", course: "Mobile Programming", date: "2024-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2024-03-02", status: "Present" },
];

const Home = () => {
  const [historyData, setHistoryData] = useState(initialHistory);

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [currentTime, setCurrentTime] = useState("Memuat jam...");

  const [note, setNote] = useState("");
  const noteInputRef = useRef(null);

  const attendanceStats = useMemo ( () => {

    console.log("Menghitung ulang statistik kehadiran...");

    const presentCount = historyData.filter(item => item.status === 'Present').length;
    const absentCount = historyData.filter(item => item.status === 'Absent').length;

    return { totalPresent: presentCount, totalAbsent: absentCount};
  }, [historyData]); // dependencies: hanya akan dihitung ulang jika historyData berubah

  useEffect(() => {

    const timer = setInterval(() => {
        const timeString = new Date().toLocaleTimeString( 'id-ID', {
            hour: '2-digit', minute: '2-digit', second: '2-digit' 
        });
        setCurrentTime(timeString);
        }, 1000);

        return () =>clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        if (isCheckedIn) {
            Alert.alert("Perhatian", "Anda sudah melakukan Check in untuk kelas ini.");
            return;
        }

        if (note.trim() === '') {
          Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
          noteInputRef.current.focus();
          return;
        }

        const newAttendance = {
            id: Date.now().toString(),
            course: "Mobile Programming",
            date: new Date().toLocaleDateString("id-ID"),
            status: "Present",
        };

        setHistoryData([newAttendance, ...historyData]);

        setIsCheckedIn(true);
        Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
    };

  // TASK 5: Update renderItem dengan icon
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons
          name={item.status === "Present" ? "check-circle" : "cancel"}
          size={18}
          color={item.status === "Present" ? "green" : "red"}
          style={{ marginRight: 5 }}
        />
        <Text style={item.status === "Present" ? styles.present : styles.absent}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Attendance App</Text>
                {/* Tampilkan State Jam Digital */}
                <Text style={styles.clockText}>{currentTime}</Text>
            </View>
            {/* Student Card */}
            <View style={styles.card}>
                <View style={styles.icon}>
                    <MaterialIcons name="person" size={40} color="#555" />
            </View>
                <View>
                    <Text style={styles.name}>Abdul Jabbar Arrahman</Text>
                    <Text>NIM : 0920240018</Text>
                    <Text>Class : RPL-2B</Text>
                </View>
        </View>

        {/* Section Today's Class */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>

          {/*Fitur baru: kolom input catatan dengan useRef*/}
          {!isCheckedIn && (
          <TextInput
            ref={noteInputRef}
            style={styles.inputCatatan}
            placeholder="Tulis catatan (cth: Hadir lab)"
            value={note}
            onChangeText={setNote}
          />
          )}

        {/* Modifikasi Tombol Check In */}
          <TouchableOpacity
            style={[styles.button, isCheckedIn? styles.buttonDisabled: styles.buttonActive]}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
            </Text>
          </TouchableOpacity>
        </View>


        {/* Attendance History */}
        <View style={styles.classCard}>
            <Text style={styles.subtitle}>Attendance History</Text>

            <FlatList
            data={historyData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false} // Dimatikan karena di dalam ScrollView
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  clockText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    fontVariant: ["tabular-nums"],
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#007AFF",
  },
  buttonDisabled: {
    backgroundColor: "#A0C4FF", // Warna lebih pucat saat disable
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  historySection: {
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  course: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  present: {
    color: "green",
    fontWeight: "bold",
  },
  absent: {
    color: "red",
    fontWeight: "bold",
  },
  inputCatatan: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#fafafa",
  },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'green',
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
});