import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { AppBar, HeightSpacer, ReusableText } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import { TermsPoliticy } from "../Data/TermsPoliticy";
import homeStyles from "../screens.style";

const TermsPoliticyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={homeStyles.container}>
      {/* Header */}
      <View style={homeStyles.header}>
        <AppBar
          top={50}
          left={20}
          right={20}
          color={COLORS.lightBack}
          onPress={() => navigation.goBack()}
        />
      </View>
      <HeightSpacer height={25} />
      {/* Scrollable Content */}
      <ScrollView style={styles.textContainer}>
        <ReusableText
          text={TermsPoliticy} //
          family={"medium"}
          size={TEXT.xSmall}
          color={COLORS.black}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
  },
});

export default TermsPoliticyScreen;
