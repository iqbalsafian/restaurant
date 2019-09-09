import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';

import KeyboardAware from '../components/KeyboardAware';
import { withCollection } from '../components/Firebase';
import LabeledInput from '../components/LabeledInput';
import ListWithControls from '../components/ListWithControls';

const heading = `Earn extra from leftovers.
Be environmentally friendly.
Get rid of food waste.`;

const subheading = `Leftovers are
1) Orders not picked up
2) Orders incorrectly prepared but still edible
3) Edible food leftover before closing`;

const restaurantId = 'uRTIlrEOuJ7MRcx4lcQR';

const priceStyles = {
  container: {
    backgroundColor: 'lightgrey',
    borderColor: 'grey',
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    padding: 4,
    width: 64,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
}

const PriceComponent = ({ price }) => {
  const priceText = Number(price).toFixed(2);

  return (
    <View style={priceStyles.container}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={priceStyles.text}>${priceText}</Text>
    </View>
  );
}

const expirationOptions = [
  { label: 'When restaurant closes', value: 'atClosing' },
  { label: 'At a particular time', value: 'atTime' },
];

class LeftoversScreenComponent extends React.Component {
  static collectionPath(props) {
    return `restaurants/${restaurantId}/leftovers`;
  }

  state = {
    label: '',
    price: '',
    expiration: 'atClosing',
    expirationTime: '',
  }

  onChange = field => value => {
    this.setState({ [field]: value });
  }

  onPriceChange = value => {
    const parsed = Number(value);
    if (!value || !isNaN(parsed)) {
      this.setState({ price: value });
    }
  }

  onPriceBlur = () => {
    if (this.state.price) {
      this.setState({ price: Number(this.state.price).toFixed(2) })
    }
  }

  get isValid() {
    const { label, price, expiration, expirationTime } = this.state;

    const validExpiration = expiration === 'atClosing' || !!expirationTime;

    return validExpiration && !!label.trim() && price.length > 0;
  }

  addLeftover = () => {
    if (this.isValid) {
      const { label, price, expiration, expirationTime } = this.state;
      const leftover = {
        label,
        price,
        expiration,
        expirationTime: expiration === 'atTime' ? expirationTime : null,
      }
      this.props.leftoversInsert(leftover)
    }
  }

  renderLeftover = ({ item }) => (
    <View style={styles.leftover}>
      <PriceComponent price={item.price} />
      <Text style={styles.leftoverLabel}>{item.label}</Text>
    </View>
  );

  render() {
    const { label, price, expiration, expirationTime } = this.state;

    return (
      <KeyboardAware style={styles.container}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subheading}>{subheading}</Text>
          <Text style={styles.subheading}>Quick Add</Text>

          <ListWithControls
            data={this.props.leftovers}
            keyExtractor={(item) => item.id}
            renderItem={this.renderLeftover}
            horizontal
          />

          <LabeledInput
            label="Label the Leftover*"
            placeholder="Leftover"
            value={label}
            onChangeText={this.onChange('label')}
          />

          <LabeledInput
            label="Price*"
            sublabel="Choose a good price. If it is too high, customers may not buy the leftover."
            placeholder="0.00"
            keyboardType="numeric"
            value={price}
            onChangeText={this.onPriceChange}
            onBlur={this.onPriceBlur}
          />

          <View style={styles.expiration}>
            <LabeledInput
              label="Expiration*"
              sublabel="When is this leftover no longer for sale?"
              type="select"
              value={expiration}
              onValueChange={this.onChange('expiration')}
              items={expirationOptions}
            />

            <LabeledInput
              label="Expiration time*"
              sublabel="Fill this in if the leftover does not expire at closing time"
              type="time"
              onChange={this.onChange('expirationTime')}
              editable={expiration === 'atTime'}
              value={expirationTime}
            />
          </View>
        </ScrollView>

        <Button style={styles.button} onPress={this.addLeftover} mode='contained' disabled={!this.isValid}>
          Add Leftover
        </Button>
      </KeyboardAware>
    );
  }
}

const styles = {
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'column',
    margin: 16,
    marginTop: 24,
  },
  innerContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    lineHeight: 18.4,
    paddingHorizontal: 80,
    paddingVertical: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subheading: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(32, 158, 33)',
    borderRadius: 0,
    fontSize: 36,
    height: 60,
    justifyContent: 'center',
    width: '100%',
  },
  leftover: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 72,
  },
  leftoverLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
  },
  expiration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
};

const connector = withCollection({ path: `restaurants/${restaurantId}/leftovers`, dataProp: 'leftovers', displayName: 'LeftoversScreen' });
const LeftoversScreen = connector(LeftoversScreenComponent);

export default LeftoversScreen;
