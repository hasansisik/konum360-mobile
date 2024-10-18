import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import ReusableButton from "./ReusableButton";
import ReusableText from "./ReusableText";
import ReusableInput from "./ReusableInput";
import { addTracker, loadUser } from "../../redux/userActions";
import NoticeMessage from "./NoticeMessage";
import { locationAddSchema } from "../../utils/validation"; 
import HeightSpacer from "./HeightSpacer";

const ZoneModal = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const deviceId = useSelector((state) => state.user.deviceId);

  const formik = useFormik({
    initialValues: { nickname: "", code: "" },
    validationSchema: locationAddSchema, 
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        addTracker({
          deviceId, 
          nickname: values.nickname,
          code: values.code,
        })
      );
      if (addTracker.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Konum başarıyla eklendi.");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else if (addTracker.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload;
        setStatus("error");
        setMessage(errorMessage);
        setTimeout(() => setStatus(null), 2000);
      }
    },
  });

  useEffect(() => {
    if (!isVisible) {
      setStatus(null);
      formik.resetForm();
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.7}
      style={styles.modal}
    >
      <KeyboardAvoidingView
        style={styles.modalView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.text}>
          <ReusableText
            text="Bölge Ekle"
            family={"medium"}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <ReusableText
            text="Bölge ekleme formunu doldurarak yeni bir bölge ekleyebilirsiniz."
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </View>
        <View style={styles.inputContainer}>
          <ReusableText
            text="Başlık"
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          <ReusableInput
            label="Başlık"
            theme={{ colors: { primary: "black" } }}
            value={formik.values.nickname}
            onChangeText={formik.handleChange("nickname")}
            touched={formik.touched.nickname}
            error={formik.errors.nickname}
          />
        </View>
        <View style={styles.inputContainer}>
        <ReusableText
            text="Harita Alanı"
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
        <ReusableButton
          btnText="Konum Seç"
          width={SIZES.width - 80}
          height={45}
          borderRadius={SIZES.xSmall}
          backgroundColor={COLORS.transparent}
          borderWidth={1}
          borderColor={COLORS.gray}
          textColor={COLORS.lightBlack}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={formik.handleSubmit}
        />
        </View>
        <HeightSpacer height={40} />
        <ReusableButton
          btnText="Bölgeyi Ekle"
          width={SIZES.width - 80}
          height={45}
          borderRadius={SIZES.xSmall}
          backgroundColor={COLORS.primary}
          textColor={COLORS.black}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={formik.handleSubmit}
        />
        {Platform.OS === "ios" && <HeightSpacer height={25} />}
      </KeyboardAvoidingView>
      {status && <NoticeMessage status={status} message={message} />}
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
  text: {
    marginBottom: 20,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
});

export default ZoneModal;