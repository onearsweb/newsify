import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const App = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Rifki Ainul Yaqin",
      studentId: "17221009",
      image: require("./source/assets/img/profile/Rifki_profil.png"),
    },
    {
      id: 2,
      name: "Wilda Agustina",
      studentId: "17223005",
      image: require("./source/assets/img/profile/Wilda_profil.png"),
    },
    {
      id: 3,
      name: "Redis Angel",
      studentId: "17223016",
      image: require("./source/assets/img/profile/Redis_profil.png"), 
    },
    {
      id: 4,
      name: "Yafi Fahriza Akhsan",
      studentId: "17221027",
      image: require("./source/assets/img/profile/Yafi_profil.png"),
    },
    {
      id: 5,
      name: "Azilma Nuzul Yasinta",
      studentId: "17221028",
      image: require("./source/assets/img/profile/Azilma_profil.png"),
    },
  ];
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./source/assets/img/header.png')}
          style={styles.logo}
        />
        <Image
          source={require('./source/assets/img/profil.png')}
          style={styles.headerImage}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.activeButton]}>
            <Text style={[styles.buttonText, styles.activeButtonText]}>Our Team</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutText}>
          Welcome to Newsify! At Newsify, we believe staying informed should be simple, enjoyable, and accessible for
          everyone. That's why we provide the latest news from a wide range of categories, such as business,
          technology, sports, entertainment, health, and science—all in one app.
        </Text>
        <Text style={styles.listItem}>
          ✅ Diverse Categories: Find news on business, tech, sports, entertainment, health, and more.
        </Text>
        <Text style={styles.listItem}>✅ Easy to Use: Enjoy a clean, modern design for effortless navigation.</Text>
        <Text style={styles.listItem}>
          ✅ Real-Time Updates: Always stay ahead with the latest news as it happens.
        </Text>
        <Text style={styles.aboutText}>Let’s stay informed together!</Text>
      </View>
      {/* Team Section */}
      <View style={styles.teamSection}>
        <Text style={styles.teamDescription}>
          We are students of the Informatics Engineering at ARS University. Through Newsify, we aim to deliver all the
          news you need in one app.
        </Text>
        <View style={styles.teamGrid}>
          {teamMembers.map((member) => (
            <View key={member.id} style={styles.teamCard}>
              <Image source={member.image} style={styles.teamImage} />
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamId}>{member.studentId}</Text>
              <View style={styles.iconContainer}>
              <FontAwesome name="facebook" size={20} style={styles.icon} />
              <FontAwesome name="linkedin" size={20} style={styles.icon} />
              <FontAwesome name="instagram" size={20} style={styles.icon} />
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* User Information */}
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>Reddis Angel</Text>
        <Text style={styles.infoText}>Wilda Agustina</Text>
        <Text style={styles.infoText}>Rifki Ainul Yaqin</Text>
        <Text style={styles.infoText}>Yafi Fahriza Akhsan</Text>
        <Text style={styles.infoText}>Azilma Nuzul Yasinta</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Icon name="home" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="person" size={24} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  headerImage: { width: "100%", height: 50, resizeMode: "contain", marginBottom: 20 },
  buttonContainer: { flexDirection: "row", marginBottom: 20 },
  button: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: "#f0f0f0", marginHorizontal: 5 },
  buttonText: { fontWeight: "bold", color: "#000" },
  activeButton: { backgroundColor: "#007bff" },
  activeButtonText: { color: "#fff" },
  aboutSection: { paddingHorizontal: 20, paddingBottom: 20 },
  aboutText: { fontSize: 16, color: "#333", marginBottom: 10 },
  listItem: { fontSize: 14, marginVertical: 5, color: "#555" },
  teamSection: { paddingHorizontal: 20, paddingBottom: 20 },
  teamDescription: { fontSize: 16, color: "#333", marginBottom: 20, textAlign: "center" },
  teamGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  teamCard: { alignItems: "center", marginBottom: 20, width: "48%" },
  teamImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  teamName: { fontSize: 16, fontWeight: "bold" },
  teamId: { fontSize: 14, color: "gray", marginBottom: 10 },
  iconContainer: { flexDirection: "row" },
  icon: { marginHorizontal: 5 },
  footer: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10, borderTopWidth: 1, borderColor: "#e0e0e0" },
});

export default App;
