import { Text, useThemeColor } from "@/components/Themed";
import Colors from "@/constants/Colors";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import SignUpForm from "./SignUpForm";

export interface AuthSheetRef {
  present: () => void;
}

type ModalContentState = "options" | "signUp";

const AuthSheet = forwardRef<AuthSheetRef>((props, ref) => {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const buttonTextColor = useThemeColor({}, "buttonText");

  // Bottom Sheet state
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const [modalContent, setModalContent] =
    useState<ModalContentState>("options");

  useImperativeHandle(ref, () => ({
    present: () => {
      setModalContent("options");
      bottomSheetRef.current?.present();
    },
  }));

  const renderModalContent = () => {
    if (modalContent === "options") {
      return (
        <BottomSheetView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Get Started</Text>
          <Text
            style={styles.modalSubtitle}
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}
          >
            Choose how you'd like to sign up.
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: tintColor }]}
            onPress={() => setModalContent("signUp")}
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>
              Sign Up with Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => alert("Login not implemented yet")}
          >
            <Text style={[styles.secondaryButtonText, { color: tintColor }]}>
              Or Login
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      );
    }

    if (modalContent === "signUp") {
      return <SignUpForm onSuccess={() => bottomSheetRef.current?.dismiss()} />;
    }

    return null;
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor }}
        style={styles.modalContainer}
        enableDynamicSizing={false}
        // handleIndicatorStyle={{ display: "none" }}
      >
        {renderModalContent()}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.0,
    elevation: 20,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Outfit_600SemiBold",
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "Outfit_500Medium",
    textAlign: "center",
    marginBottom: 25,
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
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
  },
});

export default AuthSheet;
