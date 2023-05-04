import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// type HomeProps = {
//   navigation: NativeStackNavigationProp<{}, 'Home'>;
// }

export default function Home({ navigation }: any) {
  const moveTo = () => {
    navigation.navigate("NameSetting");
  };
  const checkId = async () => {
    const name = await AsyncStorage.getItem("name");
    console.log("check name : ", name);
  };

  return (
    <View style={styles.container}>
      <Text>Home </Text>
      <Button title="move to" onPress={moveTo} />
      <Button title="check id" onPress={checkId} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
