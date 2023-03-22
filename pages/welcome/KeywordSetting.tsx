import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TextInput, TouchableHighlight, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw, { styles } from '../../lib/tailwind';
import InputWithBtn from '../../components/InputWithBtn';

export default function KeywordSetting() {
  const [keywordValue, setKeywordValue] = React.useState<string>('');
  const [keywordList, setKeywordList] = React.useState<string[]>([]);

  const handleSubmit = (keyword: string) => {
    console.log('keyword : ', keyword);
    setKeywordList([...keywordList, keyword]);
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView 
        style={styles.topBody}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={tw`pb-5 text-color5 text-2xl font-medium`}>Keywords</Text>
        <Text style={tw`pb-5 text-color5 text-sm`}>Write down what you think is important in your life, what you want to be your goal.</Text>
        <View style={tw`border p-2 border-gray-600 rounded-md shadow-sm`}>
          <Text style={tw`text-color5 text-xs`}>- Up to 10.</Text>
          <Text style={tw`text-color5 text-xs`}>- Can edit them later.</Text>
          <Text style={tw`text-color5 text-xs`}>- Keywords that lose interest will get smaller and smaller, and eventually disappear</Text>
        </View>
        { keywordList.map((keyword, index) => {
          return (
            <View key={index}>
              <Text style={tw`text-color5 text-sm`}>{keyword}</Text>
            </View>
          )})
        }
        <InputWithBtn tailwindStyle={`pt-10 w-full`} onSubmit={handleSubmit} value={keywordValue}/>

        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
