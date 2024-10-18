import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { AppBar, ReusableText } from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import homeStyles from "../screens.style";
import ZoneCard from "../../components/Card/ZoneCard";
import { MaterialIcons } from "@expo/vector-icons";
import ZoneModal from "../../components/Reusable/ZoneModal"; // ZoneModal bileşenini import ediyoruz

const Zone = ({ navigation }) => {
  const route = useRoute();
  const [isZoneModalVisible, setZoneModalVisible] = useState(false); // Modal görünürlüğünü kontrol eden state

  const data = [
    { id: "1", title: "Ev", address: "Mimar Sinan Mah. Çekmeköy" },
    { id: "2", title: "İş", address: "Merkez Mah. Ümraniye" },
    { id: "3", title: "Okul", address: "Kavacık Beykoz" },
  ];

  const toggleZoneModal = () => {
    setZoneModalVisible(!isZoneModalVisible);
  };

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
          { paddingHorizontal: 25, paddingVertical: 10, paddingBottom: 25 },
        ]}
      >
        <ReusableText
          text="BÖLGELERİM"
          family={"bold"}
          size={TEXT.small}
          color={COLORS.lightBlack}
        />
        <TouchableOpacity style={homeStyles.box} onPress={toggleZoneModal}>
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
      <ZoneModal isVisible={isZoneModalVisible} onClose={toggleZoneModal} />
    </SafeAreaView>
  );
};

export default Zone;