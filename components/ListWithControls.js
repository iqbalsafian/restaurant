import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ListWithControls extends React.PureComponent {
  ref = React.createRef();

  get list() {
    return this.ref.current;
  }

  goBack = () => {
    console.log('Scrolling with back button to be implemented');
  }

  goForward = () => {
    console.log('Scrolling with forward button to be implemented');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goBack}>
          <View style={{ ...styles.control, transform: [{translateX: -16}] }}>
            <Ionicons
              name="ios-arrow-back"
              size={36}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <FlatList
          ref={this.ref}
          {...this.props}
        />

        <TouchableOpacity onPress={this.goForward}>
          <View style={{ ...styles.control, transform: [{translateX: 16}] }}>
            <Ionicons
              name="ios-arrow-forward"
              size={36}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
  },
  control: {
    flexDirection: 'column',
    height: 72,
    justifyContent: 'center',
    paddingHorizontal: 16,
  }
};

export default ListWithControls;
