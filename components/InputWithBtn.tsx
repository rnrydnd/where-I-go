import React, { MutableRefObject, useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import tw from '../lib/tailwind';

interface InputWithBtnProps {
  onSubmit: (text: string) => void;
  tailwindStyle?: string;
  value?: string;
  keepInputText?: boolean;
  autoFocus?: boolean;
  inputRef?: MutableRefObject<TextInput | null>;
  [key: string]: any;
}
export default function InputWithBtn({onSubmit, value, tailwindStyle = '', keepInputText = false, autoFocus = false, inputRef, ...rest}: InputWithBtnProps) {
  const [text , setText] = useState<string>('');

  useEffect(() => {
    setText(value || '');
  }, [value])

  const _onSubmit = () => {
    onSubmit(text);
    if(!keepInputText) setText('');
  }

  return (
    <View style={tw`w-1/2 flex-row items-center justify-between ${tailwindStyle}`}>
      <TextInput 
        ref={(ref) => inputRef && (inputRef.current = ref)}
        style={tw`px-2 flex-1 h-10 bg-color5 rounded`} 
        autoFocus={autoFocus}
        onChangeText={setText}
        value={text}
        onSubmitEditing={_onSubmit}
        {...rest}
      />
    </View>
  )
}
