import React, { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, TextInput, TouchableHighlight } from 'react-native';
import tw from '../lib/tailwind';

interface InputWithBtnProps {
  onSubmit: (text: string) => void;
  tailwindStyle?: string;
  value?: string;
  keepInputText?: boolean;
  [key: string]: any;
}
export default function InputWithBtn({onSubmit, value, tailwindStyle = '', keepInputText = false, ...rest}: InputWithBtnProps) {
  const [text , setText] = useState<string>('');

  useEffect(() => {
    console.log('input with btn value: ', value)
    setText(value || '');
  }, [value])

  const _onSubmit = () => {
    onSubmit(text);
    if(!keepInputText) setText('');
  }

  return (
    <View style={tw`w-1/2 flex-row items-center justify-between ${tailwindStyle}`}>
      <TextInput 
        style={tw`px-2 flex-1 h-10 bg-color5 rounded-l`} 
        onChangeText={setText}
        value={text}
        onSubmitEditing={_onSubmit}
      />
      <TouchableHighlight style={tw`bg-color2 h-10 w-10 p-1 rounded-r flex items-center justify-center`}
        onPress={_onSubmit}>
        <View style={tw`w-full h-full`}>
          <Svg color='#f2e9e4' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </Svg>
        </View>
      </TouchableHighlight>
    </View>
  )
}
