import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

interface Props {
  label: string,
  onPress: () => void;
}

export default function Button(props) {
  return (
    <TouchableOpacity
      style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)"
  },
  text: {
    color: Colors.WHITE,
    textAlign: 'center',
    height: 20
  }
});
