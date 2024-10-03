import React from "react";
import { useFonts } from "expo-font";
//nagivation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//screens
import { Onboarding } from "./screens/index.js";

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
            name="Onboard"
            component={Onboarding}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
