import React, {useRef, useEffect, useContext, ReactNode} from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableHighlight,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import tw, {styles} from "../../lib/tailwind";
import InputWithBtn from "../../components/InputWithBtn";
import Svg, {Path} from "react-native-svg";
import {useHeaderHeight} from "@react-navigation/elements";
import Keyword from "../../types/keyword";
import {DispatchContext} from "../../context/AppContext";

export default function KeywordSetting({navigation}: any) {
  const {submitKeywords} = useContext(DispatchContext);
  const inputRef = useRef(null);
  const scrollViewRef = useRef<any>(null);
  const [keywordList, setKeywordList] = React.useState<string[]>([]);

  const handleSubmit = (keyword: string) => {
    if (!keyword.trim()) {
      Alert.alert("Please enter a keyword.");
      return;
    }
    setKeywordList([...keywordList, keyword]);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({y: 100000, animated: true});
    }, 50);
  }, [keywordList]);

  const handleRemove = (index: number) => {
    const newKeywordList = keywordList.filter((_, i) => i !== index);
    setKeywordList(newKeywordList);
  };

  const height = useHeaderHeight();

  const saveAndNext = async () => {
    if (keywordList.length < 3) {
      alert("Please enter at least 3 keywords.");
      return;
    }
    const keywordObjectList: Keyword[] = keywordList.map((keyword) => {
      return {
        keyword: keyword,
        totalScore: 0,
        scoreHistory: [],
        createDate: new Date(),
        deleteDate: undefined,
      };
    });

    submitKeywords(keywordObjectList, () => navigation.navigate("Tabs"));
  };

  return (
    <KeyboardAvoidingView
      style={styles.topBody}
      keyboardVerticalOffset={height + 20}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView ref={scrollViewRef} style={tw`w-full px-10`}>
        <View style={tw`py-10`}>
          <Text style={tw`pb-5 text-color5 text-2xl font-medium`}>
            Keywords
          </Text>
          <Text style={tw`pb-5 text-color5 text-sm`}>
            Write down what you think is important in your life, what you want
            to be your goal.
          </Text>
          <View style={tw`border p-3 border-gray-600 rounded-md shadow-sm`}>
            <Text style={tw`text-color5 text-xs`}>
              - Save up to 10 Keywords. (At least 3)
            </Text>
            <Text style={tw`text-color5 text-xs`}>- Can edit them later.</Text>
            <Text style={tw`text-color5 text-xs`}>
              - Keywords that lose interest will get smaller and smaller, and
              eventually disappear
            </Text>
          </View>
          {keywordList.map((keyword, index) => {
            return (
              <View
                key={index}
                style={tw`${
                  index === 0 ? "mt-5" : "mt-2"
                } bg-color4 w-full shadow-sm rounded-1 flex-row items-center justify-between`}
              >
                <Text style={tw`text-color2 text-lg font-medium px-2`}>
                  {keyword}
                </Text>
                <TouchableHighlight
                  style={tw`bg-color2 h-10 w-10 p-1 rounded-r flex items-center justify-center`}
                  onPress={() => handleRemove(index)}
                >
                  <View style={tw`w-full h-full`}>
                    <Svg
                      color="#f2e9e4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </Svg>
                  </View>
                </TouchableHighlight>
              </View>
            );
          })}
          {keywordList.length < 10 && (
            <InputWithBtn
              tailwindStyle={`pt-5 w-full`}
              onSubmit={handleSubmit}
              inputRef={inputRef}
              placeholder="Enter keyword"
              blurOnSubmit={false}
              returnKeyType="next"
            />
          )}

          <TouchableHighlight
            style={tw`bg-color3 p-1 h-10 w-full rounded mt-3 flex items-center justify-center shadow-sm`}
            onPress={saveAndNext}
          >
            <Text style={tw`text-color5 font-medium`}>Save and Next</Text>
          </TouchableHighlight>

          <StatusBar backgroundColor="bg-color1"/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
