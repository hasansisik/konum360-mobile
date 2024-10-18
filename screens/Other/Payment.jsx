import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { AppBar, ReusableButton, ReusableText } from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import homeStyles from "../screens.style";
import Countdown from "react-native-countdown-component";
import { HeightSpacer } from "../../components";

const Payment = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(0);

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
      setTimeLeft(Math.floor(difference / 1000));
    };

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000); // Her saniye güncelle
    return () => clearInterval(interval); // Bileşen unmount olduğunda interval'ı temizle
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
      <View style={styles.content}>
        <ReusableText
          text={"Ödeme işlemleri burada gerçekleşmektedir."}
          family={"bold"}
          size={TEXT.large}
          color={COLORS.lightBlack}
          align={"center"}
        />
        <HeightSpacer height={10} />
        <ReusableText
          text={"Kampanya Bitişine Kalan Süre"}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.lightBlack}
          align={"center"}
        />
        {timeLeft > 0 && (
          <Countdown
            until={timeLeft}
            size={30}
            onFinish={() => alert("Kampanya sona erdi!")}
            digitStyle={{ backgroundColor: COLORS.lightBlack }}
            digitTxtStyle={{ color: COLORS.primary }}
            timeLabelStyle={{ color: COLORS.lightBlack, fontWeight: "bold" }}
            separatorStyle={{ color: "red" }}
            timeToShow={["D", "H", "M", "S"]}
            timeLabels={{ d: "Gün", h: "Saat", m: "Dakika", s: "Saniye" }}
            showSeparator
          />
        )}
      </View>
      <View style={styles.details}>
        <View>
          <ReusableText
            text={"Kod ile Anlık Takip"}
            family={"bold"}
            size={TEXT.small}
            color={COLORS.lightBlack}
          />
          <ReusableText
            text={"Kullanıcılar, özel kod paylaşarak anlık konumlarını başkalarına gösterebilir, takip edilen kişi görünmezlik modunu açarak takipten çıkabilir."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.lightBlack}
          />
        </View>
        <View>
          <ReusableText
            text={"Konum Bildirimleri ve Hareket Takibi"}
            family={"bold"}
            size={TEXT.small}
            color={COLORS.lightBlack}
          />
          <ReusableText
            text={"Belirlenen bölgelere giriş-çıkışta bildirim gönderilir ve son 1 haftalık hareketler görüntülenebilir."}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.lightBlack}
          />
        </View>
      </View>
      <View style={homeStyles.footer}>
        <View style={styles.price}>
          <ReusableText
            text={"Aylık Üyelik :"}
            family={"light"}
            size={TEXT.medium}
            color={COLORS.lightBlack}
          />
          <ReusableText
            text={"100₺"}
            family={"bold"}
            size={TEXT.large}
            color={COLORS.lightBlack}
          />
        </View>
        <ReusableText
          text={"Konumları görmek için ödeme yapın ve hemen başlayın."}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.lightBlack}
          align={"center"}
        />
        <ReusableButton
          btnText={"Başla"}
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
  content: {
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: SIZES.small,
    borderColor: COLORS.lightBlack,
    borderWidth: 1,
    alignItems: "center",
  },
  counterContainer: {
    marginVertical: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    alignItems: "center",
  },
  counterText: {
    fontSize: TEXT.medium,
    color: COLORS.black,
    marginBottom: 5,
  },
  counterTime: {
    fontSize: TEXT.large,
    color: "red",
    fontWeight: "bold",
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightBlack,
    gap: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
  },
});

export default Payment;