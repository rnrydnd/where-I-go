export function fontCalc(score: number) {
  // font size calculation by score value(score bound is 0 ~ 100), font size bound is 5 ~ 50
  return (score / 100) * 45 + 5;
}

export function fontWeightCalc(score: number) {
  // font weight calculation by score value(score bound is 0 ~ 100), font weight bound is 100 ~ 900 (step 100)
  return (Math.floor((score / 100) * 8) * 100 + 100 + "") as
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
}
