import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card, Caption } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCurrentOrder } from '../redux/actions/index.js';

const INITIAL_STATE = {
  orders: [
    {
      id: 1011,
      status: 'new',
      timestamp: 100,
      total_price: 100,
      sales_tax: 10,
      custom_fees: 12,
      list: [
        {
          title: 'chicken brodo',
          price: 9
        },
        {
          title: 'proscuitto pie',
          price: 12
        }
      ]
    },
    {
      id: 1012,
      status: 'new',
      timestamp: 100,
      total_price: 100,
      sales_tax: 10,
      custom_fees: 12,
      list: [
        {
          title: 'chicken brodo',
          price: 9
        },
        {
          title: 'proscuitto pie',
          price: 12
        }
      ]
    }
  ],
  currentOrderId: 1011
};

function OrdersScreen(props) {
  function setCurrentOrder(orderId) {
    props.changeCurrentOrder(orderId);
  }
  // console.log(props);
  const [currentOrderId, setCurrentOrderId] = useState(INITIAL_STATE.currentOrderId ? INITIAL_STATE.currentOrderId : 0);
  return (
    <View style={styles.container}>
      <View style={{width: '20%'}}>
        <Text style={{padding: 10, fontSize: 20}}>NEW ORDERS</Text>
        {
          INITIAL_STATE.orders.map(order => {
            return (
              <View key={order.id}>
                <Card style={{backgroundColor: (order.id === currentOrderId) ? '#DCDCDC' : ''}}>
                  <Card.Content>
                    {
                      order.id === currentOrderId ?
                        <Text style={styles.defaultText}>{order.id}</Text>
                      :
                        <TouchableOpacity onPress={()=>setCurrentOrderId(order.id)}>
                          <Text style={styles.defaultText}>{order.id}</Text>
                        </TouchableOpacity>
                    }
                  </Card.Content>
                </Card>
              </View>
            )
          })
        }
      </View>
      <View style={{width: '80%', borderLeftWidth: 0.7, borderStyle: 'solid', borderLeftColor: '#d6d7da', minHeight: '100%'}}>
        <View style={{padding: 10, alignItems: 'center'}}>
          <Card style={{width: '70%'}}>
            <Card.Content>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '20%'}}>
                  <Caption>Order #</Caption>
                  <Text style={styles.orderDetailsHeader}>{currentOrderId}</Text>
                </View>
                <View style={{width: '20%'}}>
                  <Caption>Ready In </Caption>
                  <Text style={styles.orderDetailsHeader}>10 Mins</Text>
                </View>
                <View style={{width: '60%', alignContent: 'flex-end', alignItems:'flex-end'}}>
                  <Button style={{width: 300, height: 50}}>Raise Issue</Button>
                </View>
              </View>
            </Card.Content>
            <Card.Content>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '20%'}}>
                  <Caption style={styles.orderDetailsHeader}>2</Caption>
                </View>
                <View style={{width: '20%'}}>
                  <Text style={styles.orderDetailsHeader}>Chicken Brodo</Text>
                  <Caption>Extra cheese, Anchovies</Caption>
                </View>
                <View style={{width: '60%', alignContent: 'flex-end', alignItems:'flex-end'}}>
                  <Text style={styles.orderDetailsHeader}>$11.00</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '20%'}}>
                  <Caption style={styles.orderDetailsHeader}>2</Caption>
                </View>
                <View style={{width: '20%'}}>
                  <Text style={styles.orderDetailsHeader}>Chicken Brodo</Text>
                  <Caption>Extra cheese, Anchovies</Caption>
                </View>
                <View style={{width: '60%', alignContent: 'flex-end', alignItems:'flex-end'}}>
                  <Text style={styles.orderDetailsHeader}>$11.00</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={{padding: 3,bottom: 0, alignItems: 'center', position: 'absolute', justifyContent:'center', width: '100%'}}>
          <Button style={{height: 40,width: '100%', alignItems: 'center', width:'100%', backgroundColor: 'green'}} onPress={()=>{}} mode='contained'>
            Confirm Order
          </Button>
          {/* <TouchableOpacity
            style={{width: '100%', backgroundColor: 'cyan', alignItems: 'center'}}
            onPress={()=>{}}><Text>Confirm Order</Text></TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}

OrdersScreen.navigationOptions = {
  header: null
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // fontSize: 40
  },
  defaultText: {
    fontSize: 20,
  },
  orderDetailsHeader: {
    fontWeight: 'bold'
  }
}

OrdersScreen.propTypes = {
  orders: PropTypes.array,
  changeCurrentOrder: PropTypes.func
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...dispatchProps,
    redux: {
      state: stateProps
    }
  }
}

const mapStateToProps = state => {
  return { orders: state.orders };
}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentOrder: orderId => {
      dispatch(changeCurrentOrder(orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OrdersScreen);
