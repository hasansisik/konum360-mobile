import { View, Text, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { AppBar, ReusableText } from '../../components';
import { COLORS, TEXT } from '../../constants/theme';
import homeStyles from '../screens.style';

const Payment = ({ navigation }) => {

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
          text={"item.nam"}
          family={"bold"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableText
          text={"item.address"}
          family={"regular"}
          size={TEXT.medium}
          color={COLORS.description}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;