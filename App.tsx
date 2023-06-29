import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NameSetting from "./pages/welcome/NameSetting";
import Rating from "./pages/process/Rating";
import Home from "./pages/Home";
import KeywordSetting from "./pages/welcome/KeywordSetting";
import FloatingMode from "./pages/FloatingMode";
import AppProvider, { StateContext } from "./context/AppContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const { name } = useContext(StateContext);

  // useEffect(() => {
  //   if (!navigationRef.isReady()) return;
  //   console.log("navigationRef.isReady() : ", name);
  //   (async () => {
  //     if (name) {
  //       navigationRef.navigate("Tabs");
  //     } else {
  //       navigationRef.navigate("StartGuide");
  //     }
  //   })();
  // }, [navigationRef]);

  return (
    <AppProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StartGuide" component={StartGuideNavigator} />
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Rating" component={Rating} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

function StartGuideNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NameSetting" component={NameSetting} />
      <Stack.Screen name="KeywordSetting" component={KeywordSetting} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="FloatingMode" component={FloatingMode} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
