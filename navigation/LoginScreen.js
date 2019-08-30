import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";

interface State {
  email: string,
  password: string
}

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return(
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>a</Text>
        <FormTextInput
          value={email}
          onChangeText={e=>setEmail(e.target.value)}
          placeholder={strings.EMAIL_PLACEHOLDER}
        />
        <FormTextInput
          value={password}
          onChangeText={e=>setPassword(e.target.value)}
          placeholder={strings.PASSWORD_PLACEHOLDER}
        />
        <Button label={strings.LOGIN} onPress={props.navigation.navigate('App')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
})
