import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ReusableText } from "../../components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS, TEXT } from "../../constants/theme";
import homeStyles from "../../screens/screens.style";

const HomeCard = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("UserDetails", { item });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={homeStyles.flexSpace}>
      <View style={homeStyles.flexContainer}>
        <Image
          source={{
            uri:
              item.picture ||
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={homeStyles.image}
        />
        <View>
          <ReusableText
            text={item.nickname}
            family={"bold"}
            size={TEXT.xSmall}
            color={COLORS.black}
          />
          <ReusableText
            text={item.address || "Adres bilgisi bulunmamaktadır."}
            family={"regular"}
            size={TEXT.xxSmall}
            color={COLORS.description}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity style={homeStyles.circle}>
          <FontAwesome name="location-arrow" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;
