import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  memo,
  useMemo,
} from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import homeStyles from "../screens.style";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import HomeModal from "../../components/Reusable/HomeModal";
import { AntDesign } from "@expo/vector-icons";
import ToolBar from "../../components/Reusable/ToolBar";

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setModalVisible(true);
    }, [])
  );

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setModalVisible(true);
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
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

  useEffect(() => {
    if (route.params?.closeModal) {
      setModalVisible(false);
    }
  }, [route.params]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleZoomIn = async () => {
    const camera = await mapRef.current.getCamera();
    camera.zoom += 2;
    mapRef.current.animateCamera(camera);
  };

  const handleZoomOut = async () => {
    const camera = await mapRef.current.getCamera();
    camera.zoom -= 2;
    mapRef.current.animateCamera(camera);
  };

  const handleGoToCurrentLocation = () => {
    if (location) {
      mapRef.current.animateCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        zoom: 18,
      });
    }
  };

  const CustomMarker = memo(
    ({ coordinate, imageUri }) => {
      return (
        <Marker coordinate={coordinate}>
          <View style={homeStyles.markerContainer}>
            <View style={homeStyles.imageContainer}>
              <Image
                source={{ uri: imageUri }}
                style={homeStyles.markerImage}
              />
            </View>
            <View style={homeStyles.iconContainer}>
              <MaterialIcons name="location-history" size={20} color="white" />
            </View>
          </View>
        </Marker>
      );
    },
    (prevProps, nextProps) => {
      return (
        prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
        prevProps.coordinate.longitude === nextProps.coordinate.longitude &&
        prevProps.imageUri === nextProps.imageUri
      );
    }
  );

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
  ];

  const markers = useMemo(() => {
    return data.map((item) => (
      <CustomMarker
        key={item.id}
        coordinate={{
          latitude: location ? location.coords.latitude : 0,
          longitude: location ? location.coords.longitude : 0,
        }}
        imageUri={item.imageUri}
      />
    ));
  }, [data, location]);

  return (
    <SafeAreaView style={homeStyles.container}>
      <ToolBar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onGoToCurrentLocation={handleGoToCurrentLocation}
      />
      {location ? (
        <MapView
          ref={mapRef}
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
          {markers}
        </MapView>
      ) : (
        <Text>{text}</Text>
      )}
      <HomeModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        data={data}
      />
      {!isModalVisible && (
        <TouchableOpacity
          onPress={toggleModal}
          style={homeStyles.dragHandleContainerFixed}
        >
          <View style={homeStyles.boxIcon}>
            <AntDesign name="up" size={20} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Home;