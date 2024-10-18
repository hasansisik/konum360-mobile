import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AppBar, ReusableText } from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import homeStyles from "../screens.style";
import ZoneCard from "../../components/Card/ZoneCard";
import { MaterialIcons } from "@expo/vector-icons";
import ZoneModal from "../../components/Reusable/ZoneModal";
import { useDispatch, useSelector } from "react-redux";
import {  loadUser } from "../../redux/userActions";

const Zone = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isZoneModalVisible, setZoneModalVisible] = useState(false);
  const { deviceId } = useSelector((state) => state.user);
  const zones = useSelector((state) => state.user.zones);

  useEffect(() => {
    if (deviceId) {
      dispatch(loadUser({ deviceId }));
    }
  }, [deviceId, dispatch]);

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
          data={zones}
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