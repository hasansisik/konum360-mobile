import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppBar, HeightSpacer, ReusableText, ReusableSettings } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import homeStyles from "../screens.style";
import { MaterialIcons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { toggleVisibility } from "../../redux/userActions";

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.user.deviceId);
  const user = useSelector((state) => state.user.user); 
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = async () => {
    const newVisibility = !isSwitchOn;
    setIsSwitchOn(newVisibility);
    await dispatch(toggleVisibility({ deviceId, visibility: newVisibility }));
  };

  useEffect(() => {
    if (user && user.visibility !== undefined) {
      setIsSwitchOn(user.visibility);
    }
  }, [user]);

  return (
    <SafeAreaView
      style={[
        homeStyles.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <View style={homeStyles.header}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.lightBack}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <ReusableText
          text={"Ayarlar"}
          family={"bold"}
          size={TEXT.xLarge}
          color={COLORS.lightBlack}
        />
        <HeightSpacer height={20} />
        <View style={{ paddingBottom: 5 }}>
          <ReusableText
            text="Genel"
            family={"regular"}
            size={TEXT.small}
            color={COLORS.description}
          />
        </View>
        <View style={styles.settingsBox}>
          <TouchableOpacity style={styles.box}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <MaterialIcons name="location-history" size={24} color="black" />
              <ReusableText
                text={"Bulunabilir ol"}
                family={"regular"}
                size={TEXT.medium}
                color={COLORS.black}
              />
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
        <HeightSpacer height={20} />
        <View style={{ paddingBottom: 5 }}>
          <ReusableText
            text="Politikalar"
            family={"regular"}
            size={TEXT.small}
            color={COLORS.description}
          />
        </View>
        <View style={styles.settingsBox}>
          <ReusableSettings
            icon={"document-lock-outline"}
            title="Gizlilik Politikası"
            onPress={() => navigation.navigate("PrivacyPoliticy")}
          />
          <View
            style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }}
          />
          <ReusableSettings
            icon={"receipt-outline"}
            title="Kullanım Koşulları"
            onPress={() => navigation.navigate("TermsPoliticy")}
          />
          <View
            style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }}
          />
          <ReusableSettings
            icon={"cash-outline"}
            title="İade ve Geri Ödeme Politikası"
            onPress={() => navigation.navigate("SubscriptionPolitcy")}
          />
          <View
            style={{ borderTopWidth: 1, borderColor: COLORS.lightBorder }}
          />
          <ReusableSettings
            icon={"card-outline"}
            title="Abonelik ve Üyelik"
            onPress={() => navigation.navigate("RefundPolitcy")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsBox: {
    backgroundColor: COLORS.lightInput,
    borderRadius: 10,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  switchContainer: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
  },
});