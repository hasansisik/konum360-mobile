import {
  View,
  FlatList,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { AppBar, HeightSpacer, ReusableText } from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import homeStyles from "../screens.style";
import LogsCard from "../../components/Card/LogsCard";

const UserDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const data = [
    { id: '1', action: 'Eve Geldi', date: 'Şimdi' },
    { id: '2', action: 'İşten Çıktı', date: 'Dün' },
    { id: '3', action: 'Market Alışverişi', date: '1 saat önce' },
    { id: '4', action: 'Spor Salonuna Gitti', date: '2 saat önce' },
  ];

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
      <View style={{ paddingHorizontal: 25 ,alignItems:"center"}}>
        <Image source={{ uri: item.picture }} style={homeStyles.imageProfile} />
        <HeightSpacer height={10} />
        <ReusableText
          text="Mevcut Konum"
          family={"bold"}
          size={TEXT.small}
          color={COLORS.lightBlack}
        />
        <ReusableText
          text={item.address}
          family={"regular"}
          size={TEXT.small}
          color={COLORS.lightBlack}
        />
      </View>
      <View style={{ paddingTop: 25,paddingBottom: 10, paddingHorizontal: 25 }}>
        <ReusableText
          text="HAREKETLER"
          family={"bold"}
          size={TEXT.small}
          color={COLORS.lightBlack}
        />
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <LogsCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: SIZES.small }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;