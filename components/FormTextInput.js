import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import colors from '../constants/OtherColors';

type Props = TextInputProps;

export default function FormTextInput(props) {
  return (
    <TextInput
      selectionColor={colors.DODGER_BLUE}
      style={styles.textInput}
      onChange={()=>props.onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
});
