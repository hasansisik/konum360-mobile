import React from "react";
import { TouchableOpacity } from "react-native";
import { ReusableText } from "..";
import { COLORS, TEXT } from "../../constants/theme";
import homeStyles from "../../screens/screens.style";

const LogsCard = ({ item }) => {
  return (
    <TouchableOpacity style={homeStyles.logsCard}>
      <ReusableText
        text={item.action}
        family={"bold"}
        size={TEXT.xSmall}
        color={COLORS.lightBlack}
      />
      <ReusableText
        text={item.date || "Şimdi"}
        family={"regular"}
        size={TEXT.xxSmall}
        color={COLORS.lightBlack}
      />
    </TouchableOpacity>
  );
};

export default LogsCard;
