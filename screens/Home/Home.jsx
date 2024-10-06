import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Modal from "react-native-modal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import homeStyles from "../screens.style";
import HomeCard from "../../components/Card/homeCard";
import { SIZES } from "../../constants/theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setModalVisible(true);
    }, [])
  );

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setModalVisible(true);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setModalVisible(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

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

  const data = [
    {
      id: "1",
      imageUri:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      name: "Hasan Kaya",
      address: "Merkez Mahallesi, 34000, Istanbul",
    },
    {
      id: "2",
      imageUri:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Nur Kaya",
      address: "Mimar Mahallesi, 34000, Istanbul",
    },
    {
      id: "3",
      imageUri:
        "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Ali Kaya",
      address: "Camii Mahallesi, 34000, Istanbul",
    },
    {
      id: "4",
      imageUri:
        "https://plus.unsplash.com/premium_photo-1670071482460-5c08776521fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
      name: "Ayşe Kaya",
      address: "Yeni Mahallesi, 34000, Istanbul",
    },
  ];

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
        propagateSwipe
      >
        <View style={homeStyles.modalContent}>
          <View style={homeStyles.dragHandleContainer}>
            <View style={homeStyles.dragHandle} />
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => <HomeCard item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: SIZES.medium }}
          />
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