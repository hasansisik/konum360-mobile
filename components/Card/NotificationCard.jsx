import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ReusableText } from "..";
import { COLORS, TEXT } from "../../constants/theme";
import homeStyles from "../../screens/screens.style";
import { Ionicons } from "@expo/vector-icons";

const NotificationCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={homeStyles.flexSpace}>
      <View>
        <ReusableText
          text={item.title}
          family={"bold"}
          size={TEXT.xSmall}
          color={COLORS.black}
        />
        <ReusableText
          text={item.description}
          family={"regular"}
          size={TEXT.xxSmall}
          color={COLORS.description}
        />
      </View>
      <View>
        <TouchableOpacity>
          <Ionicons name="close-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationCard;
