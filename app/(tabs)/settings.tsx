import { Text, View } from "@/components/Themed";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { fetchUsers } from "@/services/api";
import { ApiUser } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const SettingsScreen = () => {
  const colors = useTheme();
  const router = useRouter();
  const { user: loggedInUser, signOut } = useAuth();

  const [users, setUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  const renderUserItem = ({ item }: { item: ApiUser }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: colors.card }]}
      onPress={() =>
        router.navigate({
          pathname: "/UserDetails",
          params: { userId: item.id },
        })
      }
    >
      <View
        style={[styles.avatar, { backgroundColor: colors.avatarBackground }]}
      >
        <Ionicons name="person" size={18} color={colors.tint} />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={[styles.itemEmail, { color: colors.textSecondary }]}>
          {item.email}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Your Account</Text>
      <View
        style={[
          styles.accountCard,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        <View style={styles.accountInfo}>
          <Text style={styles.itemName}>{loggedInUser?.name}</Text>
          <Text style={[styles.itemEmail, { color: colors.textSecondary }]}>
            {loggedInUser?.email}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>All Users (from API)</Text>
    </View>
  );

  if (isLoading && !refreshing) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text>Error: {error}</Text>
        <TouchableOpacity onPress={loadData} style={{ marginTop: 10 }}>
          <Text style={{ color: colors.tint }}>Tap to Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={renderUserItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderListHeader}
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.listContentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.tint}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Outfit_600SemiBold",
    marginTop: 10,
    marginBottom: 10,
  },
  accountCard: {
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountInfo: {
    flex: 1,
  },
  logoutButton: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: "Outfit_500Medium",
  },
  itemEmail: {
    fontSize: 14,
    fontFamily: "Outfit_400Regular",
  },
});

export default SettingsScreen;
