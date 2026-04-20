import { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./Row.styles";

type RowProps = {
  children: ReactNode;
};

export function Row({ children }: RowProps) {
  return <View style={styles.row}>{children}</View>;
}
