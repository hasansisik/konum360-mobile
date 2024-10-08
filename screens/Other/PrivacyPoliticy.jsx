import {
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import { AppBar, ReusableText, HeightSpacer } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import { Feather } from "@expo/vector-icons";
import { PrivacyPoliticy } from "../Data"; // Doğru yolu kontrol edin
import homeStyles from "../screens.style";

const PrivacyPoliticyScreen = ({ navigation }) => {
  const scrollViewRef = useRef();

  return (
    <SafeAreaView
      style={[
        homeStyles.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      {/* Header */}
      <View style={homeStyles.header}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.lightBack}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={50} />
        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReusableText
            text={"header"}
            family={"regular"}
            size={TEXT.medium}
            color={COLORS.description}
          />
          <ReusableText
            text={"title"}
            family={"medium"}
            size={TEXT.xLarge}
            color={COLORS.black}
          />
          <HeightSpacer height={25} />
          <ScrollView style={styles.content} ref={scrollViewRef}>
            <ReusableText
              text={PrivacyPoliticy}
              family={"regular"}
              size={TEXT.small}
              color={COLORS.black}
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.bottom}
          onPress={() =>
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
          }
        >
          <Feather name="chevron-up" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPoliticyScreen;

const styles = StyleSheet.create({
  content: {
    marginBottom: 55,
  },
  bottom: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 15,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    height: 40,
    width: 80,
    borderRadius: 20,
  },
});
