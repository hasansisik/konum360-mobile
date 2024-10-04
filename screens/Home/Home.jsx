import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Modal from "react-native-modal";
import { COLORS, TEXT } from "../../constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReusableText } from "../../components";
import homeStyles from "../screens.style";

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true); 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const CustomMarker = ({ coordinate, imageUri }) => {
    return (
      <Marker coordinate={coordinate}>
        <View style={homeStyles.markerContainer}>
          <View style={homeStyles.imageContainer}>
            <Image source={{ uri: imageUri }} style={homeStyles.markerImage} />
          </View>
          <View style={homeStyles.iconContainer}>
            <MaterialIcons name="location-history" size={20} color="white" />
          </View>
        </View>
      </Marker>
    );
  };

  return (
    <View style={homeStyles.container}>
      {location ? (
        <MapView
          style={homeStyles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          <CustomMarker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            imageUri={
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </MapView>
      ) : (
        <Text>{text}</Text>
      )}
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)} 
        style={homeStyles.modal}
        backdropOpacity={0} 
      >
        <View style={homeStyles.modalContent}>
          <View style={homeStyles.dragHandleContainer}>
            <View style={homeStyles.dragHandle} />
          </View>
          <View style={homeStyles.flexSpace}>
            <View style={homeStyles.flexContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={homeStyles.image}
              />
              <View>
                <ReusableText
                  text={`Hasan Kaya`}
                  family={"bold"}
                  size={TEXT.xSmall}
                  color={COLORS.black}
                />
                <ReusableText
                  text={`Merkez Mahallesi, 34000, Istanbul`}
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
          </View>
        </View>
      </Modal>
      {!isModalVisible && (
        <TouchableOpacity
          onPress={toggleModal}
          style={homeStyles.dragHandleContainerFixed}
        >
          <View style={homeStyles.dragHandle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;