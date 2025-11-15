import { useTheme } from "@/hooks/useTheme";
import { Text as DefaultText, View as DefaultView } from "react-native";

export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const colors = useTheme();

  return (
    <DefaultText style={[{ color: colors.text }, style]} {...otherProps} />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const colors = useTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
