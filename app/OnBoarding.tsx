import OnboardingFooter from "@/components/Onboarding/OnboardingFooter";
import OnboardingSlide from "@/components/Onboarding/OnboardingSlide";
import { Text, View, useThemeColor } from "@/components/Themed";
import { OnboardingStep } from "@/types";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const onboardingSteps: OnboardingStep[] = [
  {
    id: "1",
    image: require("../assets/images/onboarding1.svg"),
    title: "Welcome to Your New App",
    description:
      "Your hub for everything you need — simplified and beautifully organized.",
  },
  {
    id: "2",
    image: require("../assets/images/onboarding2.svg"),
    title: "Discover Powerful Features",
    description:
      "Stay productive, track what matters, and enjoy a seamless experience.",
  },
  {
    id: "3",
    image: require("../assets/images/onboarding3.svg"),
    title: "You're All Set",
    description: "Create your account and start exploring in just a few taps.",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const backgroundColor = useThemeColor({}, "background");
  const textSecondaryColor = useThemeColor({}, "textSecondary");

  const handleGetStarted = useCallback(() => {
    // navigation.navigate("Login");
    console.log("Navigate to Login");
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < onboardingSteps.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    handleGetStarted();
  }, [handleGetStarted]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {currentIndex < onboardingSteps.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipButtonText, { color: textSecondaryColor }]}>
            Skip
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={onboardingSteps}
          renderItem={({ item }) => <OnboardingSlide item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </View>

      <OnboardingFooter
        scrollX={scrollX}
        currentIndex={currentIndex}
        data={onboardingSteps}
        onNextPress={handleNext}
        onGetStartedPress={handleGetStarted}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipButtonText: {
    fontFamily: "Outfit_500Medium",
    fontSize: 16,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingScreen;
