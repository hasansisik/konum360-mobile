import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { COLORS, SHADOWS, TEXT } from "../../constants/theme";
import ReusableText from "./ReusableText";

const ToolBar = ({ onZoomIn, onZoomOut, onGoToCurrentLocation }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("Konum aranıyor...");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Konum izni verilmedi');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (reverseGeocode.length > 0) {
        const { street, subregion } = reverseGeocode[0];
        setAddress(street && subregion ? `${street}, ${subregion}` : 'Adres bulunamadı');
      } else {
        setAddress('Adres bulunamadı');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={[styles.circle, styles.touchableArea]}
          onPress={() => navigation.navigate('Notifications')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="message-badge-outline"
            size={24}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.circle, styles.touchableArea]}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}
        >
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
            text={address}
            family={"medium"}
            size={TEXT.xSmall}
            color={COLORS.black}
            maxLength={25}
          />
        </View>
      </View>
      <View style={styles.middleRow}>
        <TouchableOpacity
          style={styles.circle}
          onPress={onZoomIn}
        >
          <MaterialIcons name="add" size={24} color={COLORS.lightBlack} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circle}
          onPress={onZoomOut}
        >
          <MaterialIcons
            name="horizontal-rule"
            size={24}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circle}
          onPress={onGoToCurrentLocation}
        >
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
    paddingHorizontal: 20,
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