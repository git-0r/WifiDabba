import { Text, View, useThemeColor } from "@/components/Themed";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const { signUp } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const tintColor = useThemeColor({}, "tint");
  const buttonTextColor = useThemeColor({}, "buttonText");
  const textColor = useThemeColor({}, "text");
  const placeholderColor = useThemeColor({}, "textSecondary");
  const borderColor = useThemeColor({}, "tint");

  const handleSignUp = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Please fill in both name and email.");
      return;
    }

    const success = await signUp(name, email);

    if (success) {
      onSuccess();
    } else {
      Alert.alert("Error", "Sign up failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Account</Text>

      <TextInput
        style={[styles.input, { color: textColor, borderColor }]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={placeholderColor}
      />

      <TextInput
        style={[styles.input, { color: textColor, borderColor }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={placeholderColor}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: tintColor, shadowColor: tintColor },
        ]}
        onPress={handleSignUp}
      >
        <Text style={[styles.buttonText, { color: buttonTextColor }]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Outfit_600SemiBold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "Outfit_500Medium",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
  },
});

export default SignUpForm;
