import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import ReusableButton from "./ReusableButton";
import ReusableText from "./ReusableText";
import ReusableInput from "./ReusableInput";
import NoticeMessage from "./NoticeMessage";
import HeightSpacer from "./HeightSpacer";
import { addZone } from "../../redux/userActions";

const ZoneModal = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [location, setLocation] = useState(null);
  const [zone, setZone] = useState(null); 
  const [region, setRegion] = useState(null); 

  const deviceId = useSelector((state) => state.user.deviceId);

  const formik = useFormik({
    initialValues: { title: "", zoneRadius: 150 }, 
    onSubmit: async (values) => {
      const actionResult = await dispatch(
        addZone({
          deviceId, 
          title: values.title,
          latitude: zone.latitude,
          longitude: zone.longitude,
          zoneRadius: values.zoneRadius,
        })
      );
      if (addZone.fulfilled.match(actionResult)) {
        setStatus("success");
        setMessage("Konum başarıyla eklendi.");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else if (addZone.rejected.match(actionResult)) {
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
      setZone(null); 
    }
  }, [isVisible]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMessage('Konum izni verilmedi');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setZone({ latitude, longitude });
  };

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
            value={formik.values.title}
            onChangeText={formik.handleChange("title")}
            touched={formik.touched.title}
            error={formik.errors.title}
          />
        </View>
        <View style={styles.inputContainer}>
          <ReusableText
            text="Harita Alanı"
            family={"medium"}
            size={TEXT.small}
            color={COLORS.black}
          />
          {region && (
            <MapView
              style={styles.map}
              region={region}
              onPress={handleMapPress}
            >
              {zone && (
                <>
                  <Marker
                    coordinate={zone}
                    title="Seçilen Konum"
                  />
                  <Circle
                    center={zone}
                    radius={formik.values.zoneRadius}
                    strokeColor={COLORS.primary}
                    fillColor="rgba(173, 255, 47, 0.3)"
                  />
                </>
              )}
            </MapView>
          )}
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
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ZoneModal;