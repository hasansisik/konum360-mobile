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
        <Image source={{ uri: item.imageUri }} style={homeStyles.image} />
        <View>
          <ReusableText
            text={item.name}
            family={"bold"}
            size={TEXT.xSmall}
            color={COLORS.black}
          />
          <ReusableText
            text={item.address}
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