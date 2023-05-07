import {View, Text, StyleSheet, Button} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useContext, useEffect} from "react";
import {DispatchContext, StateContext} from "../context/AppContext";

export default function FloatingMode({navigation}: any) {
  const {keywords} = useContext(StateContext);
  useEffect(() => {
    console.log('is keywords? ', keywords);
  }, []);

  return (
    <View style={styles.container}>
      <Text>FloatingMode </Text>

      <StatusBar style="auto"/>
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
