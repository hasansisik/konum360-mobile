import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import ReusableButton from "./ReusableButton";
import ReusableText from "./ReusableText";

const LocationAddModal = ({ isVisible, onClose }) => {
  const [locationCode, setLocationCode] = useState("");

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      coverScreen={true}
      backdropOpacity={0.7}
      style={styles.modal}
    >
      <View style={styles.modalView}>
        <View style={styles.text}>
          <ReusableText
            text="Konum Kodu Ekle"
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text="Konum kodunu girerek konumu ekleyebilirsin."
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Konum Kodu"
          value={locationCode}
          onChangeText={setLocationCode}
        />
        <ReusableButton
          btnText="Eşleştir"
          width={SIZES.width - 80}
          height={40}
          borderRadius={SIZES.xSmall}
          backgroundColor={COLORS.primary}
          textColor={COLORS.black}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  input: {
    width: "100%",
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
    width: "100%",
  },
});

export default LocationAddModal;
