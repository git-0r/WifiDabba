import { Text, View } from "@/components/Themed";
import { OnboardingStep } from "@/types";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";

const { width } = Dimensions.get("window");
const blurhashLight = "L4RyseofRjt7~qt7j[j[t7Rja#j[";
const blurhashDark = "L00000_20000_20000_20000";

interface OnboardingSlideProps {
  item: OnboardingStep;
}

const OnboardingSlide = ({ item }: OnboardingSlideProps) => {
  const colorScheme = useColorScheme() ?? "light";

  const blurhash = colorScheme === "dark" ? blurhashDark : blurhashLight;
  return (
    <View style={[styles.slide, { width }]}>
      <Image
        style={styles.image}
        source={item.image}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={500}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    maxHeight: 340,
    marginBottom: 40,
  },
  textContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Outfit_600SemiBold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "Outfit_500Medium",
  },
});

export default React.memo(OnboardingSlide);
