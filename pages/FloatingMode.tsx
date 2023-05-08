import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Keyword from "../types/keyword";

export default function FloatingMode({ navigation }: any) {
  const { keywords, name } = useContext(StateContext);

  useEffect(() => {
    console.log("is keywords? ", keywords);
    console.log("is name? ", name);
  }, []);

  const onDeleteName = () => {
    AsyncStorage.removeItem("name");
  };

  return (
    <View style={styles.container}>
      <Text>이름 : {name}</Text>
      {keywords.map((keyword: Keyword, index: number) => {
        return <Text key={index}>{keyword.keyword}</Text>;
      })}
      <Button title="delete name" onPress={onDeleteName}></Button>

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
