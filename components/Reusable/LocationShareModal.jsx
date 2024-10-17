import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "./ReusableText";
import { useSelector } from "react-redux";

const LocationShareModal = ({ isVisible, onClose }) => {
  const code = useSelector((state) => state.user.code);

  const handleLongPress = async () => {
    await Clipboard.setStringAsync(code);
    Toast.show('Kod panoya kopyalandı.', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      coverScreen={true}
      backdropColor="black"
      backdropOpacity={0.7}
      style={styles.modal}
    >
      <View style={styles.modalView}>
        <View style={styles.text}>
          <ReusableText
            text="Konum Paylaş"
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text="Konum kodunu ileterek konumunu paylaşabilirsin."
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <TouchableOpacity onLongPress={handleLongPress} style={styles.code}>
          <ReusableText
            text={code}
            family={"bold"}
            size={TEXT.large}
            color={COLORS.lightBlack}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  text: {
    marginBottom: 20,
    width: "100%",
  },
  code: {
    width: "100%",
    alignItems: "center",
    borderColor: COLORS.lightGrey,
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderStyle: "dashed",
  },
});

export default LocationShareModal;