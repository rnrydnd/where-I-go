import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Keyword from "../types/keyword";
import { fontCalc } from "../utils/fontCalc";

export default function FloatingMode({ navigation }: any) {
  const { keywords, name } = useContext(StateContext);

  const moveToRating = () => {
    navigation.navigate("Rating");
  };

  const onDeleteNameKeyword = () => {
    AsyncStorage.removeItem("name");
    AsyncStorage.removeItem("keywords");
    navigation.navigate("StartGuide");
  };

  return (
    <View style={styles.container}>
      <Text>이름 : {name}</Text>
      {keywords.map((keyword: Keyword, index: number) => {
        return (
          <Text key={index} style={{ fontSize: fontCalc(keyword.totalScore) }}>
            {keyword.keyword}
          </Text>
        );
      })}
      <Button title="delete name" onPress={onDeleteNameKeyword}></Button>
      <Button title="move to Rating" onPress={moveToRating}></Button>

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
