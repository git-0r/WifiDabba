import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

export const useTheme = () => {
  const colorScheme = useColorScheme() ?? "light";

  return Colors[colorScheme];
};
