import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { DispatchContext, StateContext } from "../../context/AppContext";
import tw from "../../lib/tailwind";
import Svg, { Path } from "react-native-svg";
import _ from "lodash";
import RatingCompleteAlert from "../../components/RatingCompleteAlert";
import { fontCalc, fontWeightCalc } from "../../utils/fontCalc";

type TypeKeyword = "plus" | "minus";
export type RateResult = {
  index: number;
  type: TypeKeyword;
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

export default function Rating({ navigation }: any) {
  const { keywords } = useContext(StateContext);
  const { ratingKeyword } = useContext(DispatchContext);
  const carouselRef = useRef<any>(null);
  const [rateResult, setRateResult] = useState<RateResult[]>([]);

  // 평가 버튼 터치
  const thumbsBtn = async (
    keyword: string,
    type: TypeKeyword,
    index: number
  ) => {
    // 평가 후 최종 스코어 리턴
    const score = await ratingKeyword(keyword, type);
    console.log("score : ", score);
    if (score < 1) {
      // 점수가 바닥일때 해당 키워드 삭제 할건지. 묻는 ..
    }

    setRateResult([...rateResult, { index, type }]);
    if (carouselRef.current) {
      carouselRef.current.snapToNext();
    }
    // 모든 평가가 끝나면 알림창 띄우고 홈으로 이동
    if (index === keywords.length - 1) {
      // 평가결과에 따라 다른 메시지의 알림창 띄우고 홈으로 이동
      RatingCompleteAlert(rateResult, goToHome);
    }
  };

  // const disappearKeyword;

  const goToHome = () => {
    navigation.navigate("Tabs");
  };

  // 선택한 평가버튼만 보여주기 위해서
  const isShowThumbsBtn = (index: number, type: TypeKeyword) => {
    const rated = _.find(rateResult, { index: index });
    if (!rated) return true;
    return rated.type === type;
  };

  // 카드별로 평가가 끝났는지 안끝났는지 판단
  const isFinishRating = (index: number) => {
    return !!_.find(rateResult, { index: index });
  };

  return (
    <View>
      <TouchableHighlight
        style={tw`h-10 w-10 p-1 flex items-center justify-center absolute top-10 left-10`}
        onPress={goToHome}
      >
        <Text>back</Text>
      </TouchableHighlight>
      <Carousel
        ref={carouselRef}
        data={keywords}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text
              style={{
                ...styles.counter,
                fontSize: fontCalc(item.totalScore),
                fontWeight: fontWeightCalc(item.totalScore),
              }}
            >
              {item.keyword} {item.totalScore}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={tw`h-10 w-10 p-1 flex items-center rounded-lg justify-center ${
                  isShowThumbsBtn(index, "minus") ? "" : "opacity-0"
                }`}
                disabled={isFinishRating(index)}
                underlayColor={"#c9ada7"}
                onPress={() => thumbsBtn(item.keyword, "minus", index)}
              >
                <View style={tw`w-full h-full`}>
                  <Svg viewBox="0 0 512 512">
                    <Path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" />
                  </Svg>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={tw`h-10 w-10 p-1 flex items-center rounded-lg justify-center ${
                  isShowThumbsBtn(index, "plus") ? "" : "opacity-0"
                }`}
                disabled={isFinishRating(index)}
                underlayColor={"#c9ada7"}
                onPress={() => thumbsBtn(item.keyword, "plus", index)}
              >
                <View style={tw`w-full h-full`}>
                  <Svg height="100%" viewBox="0 0 512 512">
                    <Path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                  </Svg>
                </View>
              </TouchableHighlight>
            </View>

            <StatusBar style="auto" />
          </View>
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        containerCustomStyle={styles.carouselContainer}
      ></Carousel>
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
  carouselContainer: {
    marginTop: ITEM_HEIGHT / 2,
  },
  itemContainer: {
    borderRadius: 18,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9a8c98",
  },
  counter: {
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: "10%",
  },
});
