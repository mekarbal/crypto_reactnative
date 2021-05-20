import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Currencies from "./components/Currencies";
import { Provider } from "react-redux";
import store from "./store";
import SingleCurrency from "./components/SingleCurrency";


const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Home}
            options={{ header: () => null }}
          />
          <Stack.Screen name="Currency" component={Currencies} />
          <Stack.Screen name="Single" component={SingleCurrency} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
