import { Text, View } from "@/components/Themed";
import { useTheme } from "@/hooks/useTheme";
import { fetchUserDetails } from "@/services/api";
import { ApiUser } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) => {
  const colors = useTheme();
  return (
    <View style={[styles.infoRow, { backgroundColor: colors.card }]}>
      <Ionicons
        name={icon}
        size={20}
        color={colors.textSecondary}
        style={styles.infoIcon}
      />
      <View
        style={[styles.infoTextContainer, { backgroundColor: colors.card }]}
      >
        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
          {label}
        </Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
};

const UserDetailsScreen = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const colors = useTheme();

  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError(null);
        const data = await fetchUserDetails(Number(userId));
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
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text>Error: {error || "User not found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Stack.Screen
        options={{ headerTitleStyle: { fontFamily: "Outfit_600SemiBold" } }}
      />
      <View style={styles.header}>
        <View
          style={[styles.avatar, { backgroundColor: colors.avatarBackground }]}
        >
          <Ionicons name="person" size={40} color={colors.tint} />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={[styles.username, { color: colors.textSecondary }]}>
          @{user.username}
        </Text>
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={styles.cardTitle}>Contact Info</Text>
          <InfoRow icon="mail-outline" label="Email" value={user.email} />
          <InfoRow icon="call-outline" label="Phone" value={user.phone} />
          <InfoRow icon="globe-outline" label="Website" value={user.website} />
        </View>

        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <Text style={styles.cardTitle}>Address</Text>
          <InfoRow
            icon="location-outline"
            label="Location"
            value={`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
          />
        </View>

        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
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
    paddingTop: 0,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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

export default UserDetailsScreen;
