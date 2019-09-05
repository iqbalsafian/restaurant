import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import Button from "../components/Button";
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
        <FormTextInput
          value={email}
          onChangeText={e=>setEmail(e.target.value)}
          placeholder="email"
        />
        <FormTextInput
          value={password}
          onChangeText={e=>setPassword(e.target.value)}
          placeholder="password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={()=>{props.navigation.navigate('App')}}>
          <Text>Login</Text>
        </TouchableOpacity>
        {/* <Button label="Login" onPress={props.navigation.navigate('App')} /> */}
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
