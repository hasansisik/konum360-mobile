import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { AppBar, ReusableButton, ReusableText } from '../../components';
import { COLORS, SIZES, TEXT } from '../../constants/theme';
import homeStyles from '../screens.style';

const Payment = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const targetDate = new Date(currentYear, currentMonth, 5);

      if (now > targetDate) {
        targetDate.setMonth(currentMonth + 1);
      }

      const difference = targetDate - now;

      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      setTimeLeft(
        `${timeLeft.days} gün ${timeLeft.hours} saat ${timeLeft.minutes} dakika ${timeLeft.seconds} saniye`
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView
      style={[
        homeStyles.paycontainer,
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
          text={"Ödeme"}
          family={"bold"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableText
          text={"Ödeme işlemleri burada gerçekleşmektedir."}
          family={"regular"}
          size={TEXT.medium}
          color={COLORS.lightBlack}
        />
        <View style={styles.counterContainer}>
        <ReusableText
          text={"Kampanya Bitişine Kalan Süre"}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.lightBlack}
          align={"center"}
        />
          <Text style={styles.counterTime}>
            {timeLeft}
          </Text>
        </View>
      </View>
      <View style={homeStyles.footer}>
        <ReusableText
          text={"Konumları görmek için ödeme yapın ve hemen başlayın."}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.lightBlack}
          align={"center"}
        />
        <ReusableButton
          btnText={"Satın Al"}
          width={SIZES.width - 40}
          height={50}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.lightBlack}
          textColor={COLORS.white}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    marginVertical: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    alignItems: 'center',
  },
  counterText: {
    fontSize: TEXT.medium,
    color: COLORS.black,
    marginBottom: 5,
  },
  counterTime: {
    fontSize: TEXT.large,
    color: "red",
    fontWeight: 'bold',
  },
});

export default Payment;