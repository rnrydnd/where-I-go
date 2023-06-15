import {
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import tw, {styles} from "../../lib/tailwind";
import InputWithBtn from "../../components/InputWithBtn";
import {useContext, useEffect, useState} from "react";
import {DispatchContext, StateContext} from "../../context/AppContext";

export default function NameSetting({navigation}: any) {
  const {name} = useContext(StateContext);
  const {submitName} = useContext(DispatchContext);
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    if (name) {
      console.log("여기오나? 네임");
      navigation.navigate("KeywordSetting");
    } else {
      console.log("여기오나?");
      setReadyToRender(true);
    }
  }, [name]);

  const handleSubmit = async (name: string) => {
    if (!name.trim()) {
      Alert.alert("Please enter your name.");
      return;
    }
    submitName(name, () => navigation.navigate("KeywordSetting"));
  };

  return (
    <>
      {readyToRender && (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            style={styles.centerBody}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={tw`p-10 items-center justify-center`}>
              <Text style={tw`pb-5 text-color5 text-2xl font-medium`}>
                Welcome to Where-I-Go.
              </Text>
              <Text style={tw`pb-10 text-color5 text-sm`}>
                This app is for people who wonder about the purpose of life. It
                helps them identify and pursue their most important values and
                goals.
              </Text>
              <Text style={tw`pb-3 text-color5 text-sm`}>
                My friend, what is your name?
              </Text>
              <InputWithBtn
                onSubmit={handleSubmit}
                value={name}
                keepInputText
                autoFocus={true}
                placeholder="Enter name"
                returnKeyType="go"
              />
              <StatusBar style="auto"/>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}
