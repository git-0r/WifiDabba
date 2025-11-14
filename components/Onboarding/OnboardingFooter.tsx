import { Text, View } from "@/components/Themed";
import { useTheme } from "@/hooks/useTheme";
import { OnboardingStep } from "@/types";
import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

interface OnboardingFooterProps {
  scrollX: Animated.Value;
  currentIndex: number;
  data: OnboardingStep[];
  onNextPress: () => void;
  onGetStartedPress: () => void;
}

const OnboardingFooter = ({
  scrollX,
  currentIndex,
  data,
  onNextPress,
  onGetStartedPress,
}: OnboardingFooterProps) => {
  const colors = useTheme();
  const isLastSlide = currentIndex === data.length - 1;

  const renderAnimatedPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 25, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity, backgroundColor: colors.tint },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.footer}>
      {renderAnimatedPagination()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.tint, shadowColor: colors.shadow },
          ]}
          onPress={isLastSlide ? onGetStartedPress : onNextPress}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            {isLastSlide ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {},
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Outfit_600SemiBold",
  },
});

export default React.memo(OnboardingFooter);
