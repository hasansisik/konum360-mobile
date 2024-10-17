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
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import homeStyles from "../screens.style";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import HomeModal from "../../components/Reusable/HomeModal";
import { AntDesign } from "@expo/vector-icons";
import ToolBar from "../../components/Reusable/ToolBar";
import splashImage from "../../assets/splash.png";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingLocations } from "../../redux/userActions";

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

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null); 

  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.user.deviceId);
  const followingLocations = useSelector(
    (state) => state.user.followingLocations
  );

  useEffect(() => {
    if (deviceId) {
      dispatch(getFollowingLocations({ deviceId }));
    }
  }, [deviceId, dispatch]);

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
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
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

  const handleZoomIn = () => {
    if (mapRef.current && region) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta / 2,
        longitudeDelta: region.longitudeDelta / 2,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };
  
  const handleZoomOut = () => {
    if (mapRef.current && region) {
      const newRegion = {
        ...region,
        latitudeDelta: region.latitudeDelta * 2,
        longitudeDelta: region.longitudeDelta * 2,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const handleGoToCurrentLocation = () => {
    if (location) {
      try {
        mapRef.current.animateCamera(
          {
            center: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            zoom: 18,
          },
          { duration: 1000, useNativeDriver: true }
        );
      } catch (error) {
        Alert.alert(
          "Location Error",
          "An error occurred while moving to the current location."
        );
        console.error("Location Error:", error);
      }
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
       {!location || !data.length ? (
      <View style={homeStyles.loadingContainer}>
        <Image source={splashImage} style={homeStyles.splashImage} />
      </View>
    ) : (
        <>
          <ToolBar
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onGoToCurrentLocation={handleGoToCurrentLocation}
          />
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
          <HomeModal
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            followingLocations={followingLocations}
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
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
