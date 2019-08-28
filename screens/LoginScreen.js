import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";

// import { ExpoLinksView } from '@expo/samples';

interface State {
  email: string,
  password: string
}

export default function LoginScreen() {
  return(
    <View style={styles.container}>
      <View style={styles.form}>
        <FormTextInput
          value=""
          onChangeText={}
          placeholder={strings.EMAIL_PLACEHOLDER}
        />
        <FormTextInput
          value=""
          onChangeText={}
          placeholder={strings.PASSWORD_PLACEHOLDER}
        />
        <Button label={strings.LOGIN} onPress={} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "WHITE",
    alignItems: "center",
    justifyContent: "space-between"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
})
