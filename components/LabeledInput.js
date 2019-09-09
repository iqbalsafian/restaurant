import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RNDateTimePicker from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

const styles = {
  wrapper: {
    flexGrow: 1,
    flexShrink: 0,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sublabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'lightgrey',
    borderColor: 'grey',
    borderWidth: 1,
    height: 48,
    marginVertical: 4,
    padding: 8,
  }
}

class TimePicker extends React.PureComponent {
  state = {
    isPickerVisible: false,
  };

  show = () => {
    if (this.props.editable) {
      this.setState({ isPickerVisible: true });
    }
  }

  hide = () => {
    this.setState({ isPickerVisible: false });
  }

  onSelect = (date) => {
    if (date > new Date()) {
      this.props.onChange(format(date, 'HH:mm'));
      this.hide();
    }
  }

  render() {
    return (
      <>
        <TouchableOpacity onPress={this.show}>
          <TextInput
            style={styles.input}
            editable={false}
            pointerEvents="none"
            value={this.props.value}
          />
        </TouchableOpacity>
        <RNDateTimePicker
          mode="time"
          isVisible={this.state.isPickerVisible}
          onConfirm={this.onSelect}
          onCancel={this.hide}
        />
      </>
    );
  }
}

const LabeledInput = ({ label, sublabel, type = 'text', ...props }) => {
  let input;

  switch (type) {
    case "select":
      input = <RNPickerSelect
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        textInputProps={{style: { ...styles.input, color: 'black', fontWeight: 'bold' }}}
        {...props}
      />;
      break;
    case "time":
      input = <TimePicker {...props} />;
      break;
    default:
      input = <TextInput style={styles.input} {...props} />;
  }

  return <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    {sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}

    {input}
  </View>
};

export default LabeledInput;
