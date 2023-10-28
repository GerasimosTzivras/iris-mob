import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export default function Label({ label }) {
  return <Text style={styles.title}>{label}</Text>;
}
