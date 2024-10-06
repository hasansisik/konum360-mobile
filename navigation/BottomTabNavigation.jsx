import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home ,Payment,Settings} from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  paddingTop: 10,
  paddingBottom: 10,
  height: 60,
  marginHorizontal: 20,
  marginVertical: 15,
  borderRadius: 50,
  alignItems: "center",
  position: "absolute",
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabel: "Konum",
          tabBarLabelStyle: {
            color: COLORS.black,
            fontSize: 12,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              color={focused ? COLORS.black : COLORS.black}
              size={focused ? 22 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabel: "Kayıt",
          tabBarLabelStyle: {
            color: COLORS.black,
            fontSize: 12,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "journal" : "journal-outline"}
              color={focused ? COLORS.black : COLORS.black}
              size={focused ? 22 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabel: "Ayarlar",
          tabBarLabelStyle: {
            color: COLORS.black,
            fontSize: 12,
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={focused ? COLORS.black : COLORS.black}
              size={focused ? 22 : 20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;