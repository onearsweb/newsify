import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Footer from "./footer";

const App = () => {
  // State untuk mengatur konten yang ditampilkan
  const [activeSection, setActiveSection] = useState("about");

  const teamMembers = [
    {
      id: 1,
      name: "Rifki Ainul Yaqin",
      studentId: "17221009",
      image: require("../source/assets/img/profile/Rifki_profil.png"),
    },
    {
      id: 2,
      name: "Wilda Agustina",
      studentId: "17223005",
      image: require("../source/assets/img/profile/Wilda_profil.png"),
    },
    {
      id: 3,
      name: "Redis Angel",
      studentId: "17223016",
      image: require("../source/assets/img/profile/Redis_profil.png"),
    },
    {
      id: 4,
      name: "Yafi Fahriza Akhsan",
      studentId: "17221027",
      image: require("../source/assets/img/profile/Yafi_profil.png"),
    },
    {
      id: 5,
      name: "Azilma Nuzul Yasinta",
      studentId: "17221028",
      image: require("../source/assets/img/profile/Azilma_profil.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.backgroundShape}></View>
          <Text style={styles.headerTitle}>Newsify</Text>
          <Text style={styles.headerSubtitle}>All the news you need, in one app.</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require("../source/assets/img/profile/profil.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={activeSection === "about" ? styles.buttonPrimary : styles.buttonSecondary}
              onPress={() => setActiveSection("about")}
            >
              <Text style={activeSection === "about" ? styles.buttonTextPrimary : styles.buttonTextSecondary}>
                About us
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={activeSection === "team" ? styles.buttonPrimary : styles.buttonSecondary}
              onPress={() => setActiveSection("team")}
            >
              <Text style={activeSection === "team" ? styles.buttonTextPrimary : styles.buttonTextSecondary}>
                Our Team
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Konten Berdasarkan State */}
        {activeSection === "about" && (
          <View style={styles.combinedSection}>
            <Text style={styles.aboutText}>
              Welcome to Newsify! At Newsify, we believe staying informed should be simple, enjoyable, and accessible for
              everyone. That's why we provide the latest news from a wide range of categories, such as business,
              technology, sports, entertainment, health, and science—all in one app.
            </Text>
            <Text style={styles.listItem}>
              ✅ Diverse Categories: Find news on business, tech, sports, entertainment, health, and more.
            </Text>
            <Text style={styles.listItem}>✅ Easy to Use: Enjoy a clean, modern design for effortless navigation.</Text>
            <Text style={styles.listItem}>✅ Real-Time Updates: Always stay ahead with the latest news as it happens.</Text>
            <Text style={styles.aboutText}>Let’s stay informed together!</Text>
          </View>
        )}

        {activeSection === "team" && (
          <>
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
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContent: { flex: 1 },
  scrollContentContainer: {
    paddingBottom: 80, // Memberikan ruang di bawah konten agar footer tidak terhalang
  },
  headerContainer: { alignItems: "center", position: "relative", marginBottom: 20 },
  backgroundShape: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: "#003366",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#fff", marginTop: 40 },
  headerSubtitle: { fontSize: 16, color: "#dfeaff", marginTop: 5, marginBottom: 15 },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    zIndex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  logoImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "60%" },
  buttonPrimary: {
    backgroundColor: "#0066cc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#0066cc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonTextPrimary: { color: "#fff", fontWeight: "bold" },
  buttonTextSecondary: { color: "#0066cc", fontWeight: "bold" },
  combinedSection: { marginVertical: 20, padding: 15 },
  aboutText: { fontSize: 16, color: "#333", marginBottom: 10, lineHeight: 24, textAlign: "justify" },
  listItem: { fontSize: 14, marginVertical: 5, color: "#555", lineHeight: 22 },
  teamDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24, // Menambah keterbacaan teks
    paddingHorizontal: 10, // Agar teks tidak mepet dengan sisi layar
  },
  teamGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10, // Tambahan padding agar grid tidak terlalu ke tepi layar
  },
  teamCard: {
    alignItems: "center",
    marginBottom: 20,
    width: "45%", // Membagi lebar untuk 2 kolom
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15, // Tambahkan sedikit padding untuk memberi ruang
    elevation: 3,
    shadowColor: "#000", // Menambahkan shadow agar terlihat elegan
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  teamImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: "cover",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 5, // Tambahkan sedikit jarak antar elemen
  },
  teamId: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default App;