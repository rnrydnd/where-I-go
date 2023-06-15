import { View, Text, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import { DispatchContext, StateContext } from "../../context/AppContext";

const SLIDER_WIDTH = Dimensions.get("window").width;
const SLIDER_HEIGHT = Dimensions.get("window").height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.5);

export default function Rating() {
  const { keywords } = useContext(StateContext);
  const { ratingKeyword } = useContext(DispatchContext);

  useEffect(() => {}, []);

  return (
    <Carousel
      data={keywords}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.counter}>
            {item.keyword} {item.totalScore}
          </Text>
          <StatusBar style="auto" />
        </View>
      )}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      containerCustomStyle={styles.carouselContainer}
    ></Carousel>
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
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9a8c98",
  },
  counter: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
