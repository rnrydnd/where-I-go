import { Alert } from "react-native";
import { RateResult } from "../pages/process/Rating";

const positiveMessages = [
  "Wishing you a day filled with sunshine and endless possibilities.",
  "May your heart be filled with joy and your spirit be lifted high today.",
  "Sending you positive vibes for a day that exceeds your wildest expectations.",
  "May each moment of today bring a smile to your face and warmth to your soul.",
  "Wishing you a day so wonderful that it becomes a cherished memory.",
  "May your day be blessed with laughter, love, and all the little things that make you happy.",
  "Sending you a ray of sunshine to brighten your day and make everything feel right.",
  "Wishing you a day filled with delightful surprises and beautiful moments to treasure.",
  "May the beauty of today's moments fill your heart with gratitude and bliss.",
  "Sending you wishes for a day that sparkles with positivity and brings you closer to your dreams.",
];

const negativeMessages = [
  "Remember that every storm eventually gives way to a clear sky. Hang in there!",
  "Sending you strength and resilience to navigate the challenges that come your way today.",
  "Wishing you the courage to face your struggles head-on and emerge stronger.",
  "May today's difficulties become the stepping stones that lead you to brighter days.",
  "Sending you a virtual hug to provide comfort during this tough time. You're not alone.",
  "Wishing you the fortitude to endure today's hardships and the belief that you'll overcome them.",
  "Remember that even in darkness, the tiniest flicker of hope can ignite a brighter tomorrow.",
  "Sending you thoughts of resilience and determination as you face the obstacles in your path.",
  "Wishing you the patience and perseverance to weather the storm and find solace in better days ahead.",
  "Remember, challenges are temporary, but your strength and resilience are everlasting.",
];

const neutralMessages = [
  "Wishing you a day that unfolds with gentle ease and simple pleasures.",
  "May your day be uneventful yet peaceful, allowing you to find moments of calm.",
  "Sending you a casual hello for a day that holds no extraordinary demands.",
  "May today be a smooth ride with a few pockets of tranquility along the way.",
  "Wishing you a day of equilibrium, where neither highs nor lows dominate your experience.",
  "May your day be comfortably average, offering a respite from life's constant surprises.",
  "Sending you a mellow greeting for a day that glides by without much ado.",
  "Wishing you a pleasantly unremarkable day, where simplicity reigns supreme.",
  "May today be a gentle pause amidst the chaos, allowing you to catch your breath.",
  "Sending you wishes for a day that is unremarkable in the best possible way.",
];

const RatingCompleteAlert = (rateResult: RateResult[], callBackFn: any) => {
  const makeMessage = () => {
    let totalTodayScore = 0;
    rateResult.forEach((result) => {
      totalTodayScore += result.type === "plus" ? 1 : -1;
    });
    if (totalTodayScore < 0)
      return positiveMessages[
        Math.floor(Math.random() * positiveMessages.length)
      ];
    if (totalTodayScore === 0)
      return neutralMessages[
        Math.floor(Math.random() * neutralMessages.length)
      ];
    if (totalTodayScore > 0)
      return negativeMessages[
        Math.floor(Math.random() * negativeMessages.length)
      ];
  };

  return Alert.alert("Complete", makeMessage(), [
    {
      text: "OK",
      onPress: callBackFn,
    },
  ]);
};

export default RatingCompleteAlert;
