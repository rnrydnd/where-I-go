import React, { createContext, useEffect, useMemo, useState } from "react";
import Keyword from "../types/keyword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface DispatchContextProps {
  submitName: (name: string, callBack: () => void) => void;
  submitKeywords: (keywords: Keyword[], callBack: () => void) => void;
}

interface StateContextProps {
  name: string;
  keywords: Keyword[];
}

export const DispatchContext = createContext<DispatchContextProps>({
  submitName: () => {},
  submitKeywords: () => {},
});
export const StateContext = createContext<StateContextProps>({
  name: "",
  keywords: [],
});

function AppProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  useEffect(() => {
    (async () => {
      const keywords = await AsyncStorage.getItem("keywords");
      if (keywords) setKeywords(JSON.parse(keywords));
      const name = await AsyncStorage.getItem("name");
      if (name) setName(name);
    })();
  }, []);

  const submitName = async (v: string, callBack: () => void) => {
    await AsyncStorage.setItem("name", v, (error) => {
      if (error) {
        Alert.alert("Error", "Failed to save name.");
      } else {
        setName(v);
        callBack();
      }
    });
  };
  const submitKeywords = async (v: Keyword[], callBack: () => void) => {
    await AsyncStorage.setItem("keywords", JSON.stringify(v), (error) => {
      if (error) {
        Alert.alert("Error", "Failed to save keywords.");
      } else {
        setKeywords(v);
        callBack();
      }
    });
  };

  const dispatch = useMemo(() => ({ submitName, submitKeywords }), []);
  const state = useMemo(() => ({ name, keywords }), [name, keywords]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default AppProvider;
