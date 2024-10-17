import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { AppBar, ReusableText } from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import homeStyles from "../screens.style";
import ZoneCard from "../../components/Card/ZoneCard";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Zone = ({ navigation }) => {
  const route = useRoute();

  const data = [
    { id: "1", title: "Ev", address: "Mimar Sinan Mah. Çekmeköy" },
    { id: "2", title: "İş", address: "Merkez Mah. Ümraniye" },
    { id: "3", title: "Okul", address: "Kavacık Beykoz" },

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
          title={"Bölge Kayıt"}
        />
      </View>
      <View
        style={[
          homeStyles.flexSpace,
          { paddingHorizontal: 25, paddingVertical: 10, paddingBottom: 25, },
        ]}
      >
        <ReusableText
          text="BÖLGELERİM"
          family={"bold"}
          size={TEXT.small}
          color={COLORS.lightBlack}
        />
        <TouchableOpacity style={homeStyles.box}>
          <View style={homeStyles.boxIcon2}>
            <MaterialIcons name="add" size={20} color="black" />
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <ReusableText
              text={"Bölge Ekle"}
              family={"medium"}
              size={TEXT.xSmall}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ZoneCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: SIZES.small }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Zone;
