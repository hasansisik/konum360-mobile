import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { COLORS, TEXT } from '../../constants/theme';
import ReusableText from './ReusableText';

const ReusableSettings = ({ icon, title, onPress, iconColor = COLORS.black, textColor = COLORS.black, iconType = "Ionicons" }) => {
  const IconComponent = iconType === "AntDesign" ? AntDesign : Ionicons;

  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <IconComponent name={icon} size={22} color={iconColor} />
        <ReusableText
          text={title}
          family={"regular"}
          size={TEXT.medium}
          color={textColor}
        />
      </View>
      <Feather name="chevron-right" size={20} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});

export default ReusableSettings;