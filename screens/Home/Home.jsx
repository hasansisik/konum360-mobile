import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
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

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true); // Modal her zaman açık

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

  const dateInfo = {
    day: "12",
    month: "October",
    weekday: "Thursday",
  };

  const CustomMarker = ({ coordinate, imageUri }) => {
    return (
      <Marker coordinate={coordinate}>
        <View style={styles.markerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.markerImage} />
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="location-history" size={20} color="white" />
          </View>
        </View>
      </Marker>
    );
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
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
        style={styles.modal}
        backdropOpacity={0} 
      >
        <View style={styles.modalContent}>
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>
          <View style={styles.flexSpace}>
            <View style={styles.flexContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.image}
              />
              <View>
                <ReusableText
                  text={`Hasan Kaya`}
                  family={"bold"}
                  size={TEXT.xSmall}
                  color={COLORS.black}
                />
                <ReusableText
                  text={`${dateInfo.day} ${dateInfo.month} ${dateInfo.weekday}`}
                  family={"regular"}
                  size={TEXT.xxSmall}
                  color={COLORS.description}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.circle}>
                <FontAwesome name="location-arrow" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {!isModalVisible && (
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.dragHandleContainerFixed}
        >
          <View style={styles.dragHandle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "rgba(173, 255, 47, 0.80)", // Yarı saydam hale getirilmiş renk    paddingHorizontal: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000",
  },
  dragHandleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  dragHandleContainerFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
  },
  dragHandle: {
    width: 100,
    height: 5,
    backgroundColor: "#71727A",
    borderRadius: 2.5,
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  markerContainer: {
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 5,
    borderColor: "#000",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 3,
  },
  markerImage: {
    width: 50,
    height: 50,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#000",
  },
});
