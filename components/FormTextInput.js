import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import Colors from '../constants/Colors';

type Props = TextInputProps;

export default function FormTextInput(props) {
  return (
    <TextInput
      style {[styles.textInput, style]}
      { ...otherProps }
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
