import React from "react";
import { useFonts } from "expo-font";
//nagivation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//screens
import {
  Onboarding,
  Home,
  UserDetails,
  Settings,
  Payment,
  PrivacyPoliticy,
  RefundPolitcy,
  SubscriptionPolitcy,
  TermsPoliticy,
} from "./screens/index.js";
import BottomTabNavigation from "./navigation/BottomTabNavigation.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  //starting before font loading
  const [fontLoaded] = useFonts({
    light: require("./assets/fonts/light.otf"),
    regular: require("./assets/fonts/regular.otf"),
    medium: require("./assets/fonts/medium.otf"),
    bold: require("./assets/fonts/bold.otf"),
    xtrabold: require("./assets/fonts/xtrabold.otf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPoliticy"
            component={PrivacyPoliticy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RefundPolitcy"
            component={RefundPolitcy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubscriptionPolitcy"
            component={SubscriptionPolitcy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TermsPoliticy"
            component={TermsPoliticy}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
