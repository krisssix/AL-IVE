import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SkenovaniScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  return (
    <View style={[styles.container, { paddingTop: topPad + 16 }]}>
      <Text style={styles.title}>Skenování</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F3F7", alignItems: "center" },
  title: { fontFamily: "Inter_600SemiBold", fontSize: 22, color: "#1C1B2E" },
});
