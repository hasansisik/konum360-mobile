import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS, SHADOWS, TEXT } from "../../constants/theme";
import ReusableText from "./ReusableText";

const ToolBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.circle} onPress={() => console.log("Message icon pressed")}>
          <MaterialCommunityIcons
            name="message-badge-outline"
            size={24}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle} onPress={() => console.log("Settings icon pressed")}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topMiddle}>
        <View style={styles.Adress}>
          <ReusableText
            text={"Eyüp,İstanbulsadasd"}
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
            maxLength={15}
          />
        </View>
      </View>
      <View style={styles.middleRow}>
        <TouchableOpacity style={styles.circle} onPress={() => console.log("Add icon pressed")}>
          <MaterialIcons name="add" size={24} color={COLORS.lightBlack} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle} onPress={() => console.log("Horizontal rule icon pressed")}>
          <MaterialIcons
            name="horizontal-rule"
            size={24}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle} onPress={() => console.log("Navigation icon pressed")}>
          <Feather name="navigation" size={24} color={COLORS.lightBlack} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 15,
    right: 15,
    zIndex: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  middleRow: {
    position: "absolute",
    top: 225,
  },
  topMiddle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  Adress: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
    ...SHADOWS.large,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    ...SHADOWS.large,
  },
});

export default ToolBar;