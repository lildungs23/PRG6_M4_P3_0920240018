import { View,Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Home = () => {
    const renderItem = ({ item }) => (
    <View style={styles.item}>

    <View>
      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>

    <View style={{flexDirection:'row', alignItems:'center'}}>

    <MaterialIcons
    name={item.status === "Present" ? "check-circle" : "cancel"}
    size={20}
    color={item.status === "Present" ? "green" : "red"}
    style={{marginRight:5}}
    />

    <Text
    style={
    item.status === "Present"
    ? styles.present
    : styles.absent
    }
    >
    {item.status}
    </Text>

    </View>

  </View>
);
const presentCount = history.filter(item => item.status === "Present").length;
const absentCount = history.filter(item => item.status === "Absent").length;

    return (
        <SafeAreaView style={styles.container}>  
                <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Attendance App</Text>


        <View style={styles.card}>
            <View style={styles.icon}>
                    <MaterialIcons name="person" size={40} color="#555" /> 
            </View>

            <View>
            <Text style={styles.name}>Abdul Jabbar Arrahman</Text>
            <Text>NIM: 0920240018</Text>  
            <Text>Class : RPL-2B</Text>
            </View>
        </View>  

        <View style={styles.classCard}>
            <Text style={styles.name}>Today's Class</Text>
            <Text>Mobile Programming</Text>
            <Text>08:00 - 10:00</Text>
            <Text>Lab 3</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>CHECK IN</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.classCard}>
            <Text style={styles.name}>Upcoming Class</Text>
            <Text>Database Systems</Text>
            <Text>10:00 - 12:00</Text>
            <Text>Room 201</Text>
        </View>

        <View style={styles.classCard}>
            <Text style={styles.name}>Attendance Summary</Text>
            <Text>Present : {presentCount}</Text>
            <Text>Absent : {absentCount}</Text>
        </View>

        <Text style={styles.subtitle}>Attendance History</Text>
            <FlatList 
                data={history} 
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
                />  

            </ScrollView>
        </SafeAreaView>
    );
};

const history = [
    { id: "1", course: "Mobile Programming", date: "2026-03-01", status: "Present" },
    { id: "2", course: "Database Systems", date: "2026-03-02", status: "Present" },
    { id: "3", course: "Operating Systems", date: "2026-03-03", status: "Absent" },
    { id: "4", course: "Computer Networks", date: "2026-03-04", status: "Present" },
    { id: "5", course: "Software Engineering", date: "2026-03-05", status: "Present" },
    { id: "6", course: "Data Structures", date: "2026-03-06", status: "Absent" },
    { id: "7", course: "Algorithms", date: "2026-03-07", status: "Present" },
    { id: "8", course: "Artificial Intelligence", date: "2026-03-08", status: "Present" },
    { id: "9", course: "Machine Learning", date: "2026-03-09", status: "Absent" },
    { id: "10", course: "Human-Computer Interaction", date: "2026-03-10", status: "Present" },
    { id: "11", course: "Computer Graphics", date: "2026-03-11", status: "Present" },
    { id: "12", course: "Cybersecurity", date: "2026-03-12", status: "Absent" },
    { id: "13", course: "Cloud Computing", date: "2026-03-13", status: "Present" },
    { id: "14", course: "Big Data Analytics", date: "2026-03-14", status: "Present" },
    { id: "15", course: "Internet of Things", date: "2026-03-15", status: "Absent" },
    { id: "16", course: "Blockchain Technology", date: "2026-03-16", status: "Present" },
    { id: "17", course: "Virtual Reality", date: "2026-03-17", status: "Present" },
    { id: "18", course: "Augmented Reality", date: "2026-03-18", status: "Absent" },
    { id: "19", course: "Data Mining", date: "2026-03-19", status: "Present" },
    { id: "20", course: "Natural Language Processing", date: "2026-03-20", status: "Present" },
];

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    icon: {
        width: 60,
        height: 60,
        backgroundColor: '#eee',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    classCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },

    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        },

    button: {
        marginTop: 10,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white'
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },

    course: {
        fontSize: 16,
    },

    date: {
        fontSize: 12,
        color: 'gray',
    },

    present: {
        color: 'green',
        fontWeight: 'bold',
    },

    absent: {
        color: 'red',
        fontWeight: 'bold',
    },
});
