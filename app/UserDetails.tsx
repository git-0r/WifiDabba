import { Text, View, useThemeColor } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) => {
  const secondaryText = useThemeColor({}, "textSecondary");
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={20}
        color={secondaryText}
        style={styles.infoIcon}
      />
      <View style={styles.infoTextContainer}>
        <Text style={[styles.infoLabel, { color: secondaryText }]}>
          {label}
        </Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
};

const UserDetails = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const tint = useThemeColor({}, "tint");
  const cardColor = useThemeColor(
    { light: "#FFFFFF", dark: "#1C1C1E" },
    "background"
  );
  const shadowColor = useThemeColor(
    { light: "#000", dark: "#000" },
    "background"
  );
  const secondaryText = useThemeColor({}, "textSecondary");

  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={tint} />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error || "User not found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{ headerTitleStyle: { fontFamily: "Outfit_600SemiBold" } }}
      />
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={tint} />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={[styles.username, { color: secondaryText }]}>
          @{user.username}
        </Text>
      </View>

      <View style={styles.content}>
        <View
          style={[styles.infoCard, { backgroundColor: cardColor, shadowColor }]}
        >
          <Text style={styles.cardTitle}>Contact Info</Text>
          <InfoRow icon="mail-outline" label="Email" value={user.email} />
          <InfoRow icon="call-outline" label="Phone" value={user.phone} />
          <InfoRow icon="globe-outline" label="Website" value={user.website} />
        </View>

        <View
          style={[styles.infoCard, { backgroundColor: cardColor, shadowColor }]}
        >
          <Text style={styles.cardTitle}>Address</Text>
          <InfoRow
            icon="location-outline"
            label="Location"
            value={`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
          />
        </View>

        <View
          style={[styles.infoCard, { backgroundColor: cardColor, shadowColor }]}
        >
          <Text style={styles.cardTitle}>Company</Text>
          <InfoRow
            icon="business-outline"
            label="Company"
            value={user.company.name}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0,122,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontFamily: "Outfit_600SemiBold",
  },
  username: {
    fontSize: 18,
    fontFamily: "Outfit_500Medium",
  },
  content: {
    padding: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Outfit_600SemiBold",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoIcon: {
    width: 30,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "Outfit_400Regular",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: "Outfit_500Medium",
  },
});

export default UserDetails;
