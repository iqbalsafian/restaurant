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
import { setCurrentOrder } from '../redux/actions/index.js';
import { INITIAL_STATE } from '../redux/reducers/ordersReducer';

function OrdersScreen(props) {
  let { orders } = INITIAL_STATE;
  let [currentOrderId, setCurrentOrderId] = useState(INITIAL_STATE.orders[0].id);
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(()=>updateState({}), []);

  let [currentOrder, setCurrentOrder] = useState(orders.find((order)=>order.id===currentOrderId));

  const setOrderStatus = (status) => {
    let currentOrderIndex = orders.findIndex(order=>order.id===currentOrderId);
    orders[currentOrderIndex].status = status
  }

  return (
    <View style={styles.container}>
      <View style={{width: '20%'}}>
        <View style={{width: '100%'}}>
          <Text style={{padding: 10, fontSize: 20}}>NEW ORDERS</Text>
          {
            orders
            .filter(order=>order.status === 'new')
            .map(order => {
              return (
                <View key={order.id}>
                  <Card style={{backgroundColor: (order.id === currentOrderId) ? '#DCDCDC' : ''}}>
                    <Card.Content>
                      {
                        order.id === currentOrderId ?
                          <Text style={styles.defaultText}>{order.id}</Text>
                        :
                          <TouchableOpacity
                            onPress={
                              ()=>{
                                setCurrentOrderId(order.id)
                                setCurrentOrder(orders.find(order_=>order_.id===order.id))
                              }
                            }
                          >
                            <Caption style={styles.defaultText}>{order.id}</Caption>
                          </TouchableOpacity>
                      }
                    </Card.Content>
                  </Card>
                </View>
              )
            })
          }
        </View>
        <View style={{width: '100%'}}>
          <Text style={{padding: 10, fontSize: 20}}>IN PROGRESS</Text>
          {
            orders
            .filter(order=>order.status === 'in-progress')
            .map(order => {
              return (
                <View key={order.id}>
                  <Card style={{backgroundColor: (order.id === currentOrderId) ? '#DCDCDC' : ''}}>
                    <Card.Content>
                      {
                        order.id === currentOrderId ?
                          <Text style={styles.defaultText}>{order.id}</Text>
                        :
                          <TouchableOpacity
                            onPress={
                              ()=>{
                                setCurrentOrderId(order.id)
                                setCurrentOrder(orders.find(order_=>order_.id===order.id))
                              }
                            }
                          >
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
            {
              currentOrder.lists.map((list, index)=>{
                return (
                  <View style={{flex: 1, flexDirection: 'row'}} key={index}>
                    <View style={{width: '20%'}}>
                      <Text style={styles.orderDetailsHeader}>{index+1}</Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text style={styles.orderDetailsHeader}>{list.title}</Text>
                      <Caption>{list.remarks}</Caption>
                    </View>
                    <View style={{width: '20%'}}>
                      <Text style={styles.orderDetailsHeader}>{list.price}</Text>
                    </View>
                  </View>
                )
              })
            }
            </Card.Content>
          </Card>
        </View>
        <View style={{padding: 3,bottom: 0, alignItems: 'center', position: 'absolute', justifyContent:'center', width: '100%'}}>
          <TouchableOpacity style={{height: 40,width: '100%', alignItems: 'center', width:'100%', backgroundColor: 'green', justifyContent: 'center', flex: 1}}
            onPress={
              ()=>{
                (currentOrder.status==='new') ? setOrderStatus('in-progress') : setOrderStatus('ready')
                forceUpdate()
              }
            }
            mode='contained'>
            <Text style={{width:'100%', alignItems:'center', color: 'white', justifyContent: 'center', flex: 1, textAlign:'center', textAlignVertical: 'center'}}>
              {(currentOrder.status==='new') ? 'CONFIRM ORDER' : 'SET TO READY'}
            </Text>
          </TouchableOpacity>
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

/*
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
  return {
    orders: state.ordersReducer.orders,
    currentOrderId: state.ordersReducer.currentOrderId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentOrder: orderId => {
      dispatch(setCurrentOrder(orderId))
    }
  }
}
*/
// export default connect(mapStateToProps, mapDispatchToProps, mergeProps)
export default OrdersScreen;
