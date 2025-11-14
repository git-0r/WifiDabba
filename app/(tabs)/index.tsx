import { Text, View } from "@/components/Themed";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { user } = useAuth();
  const colors = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/onboarding1.svg")}
          style={styles.image}
          contentFit="contain"
        />
        <Text style={styles.title}>Welcome, {user?.name || "User"}!</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          It's great to see you.
        </Text>

        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Ionicons
            name="mail"
            size={24}
            color={colors.textSecondary}
            style={styles.icon}
          />
          <View>
            <Text style={styles.cardTitle}>Your Email</Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              {user?.email}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Outfit_600SemiBold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Outfit_500Medium",
    marginBottom: 30,
  },
  infoCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Outfit_600SemiBold",
    marginBottom: 2,
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Outfit_400Regular",
  },
});

export default HomeScreen;
