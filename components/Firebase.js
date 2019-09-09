import React from 'react';
import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore';

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyA1Rj6khC6AuyuQ-ovFD8QJ0ikUe2pcoLI",
      authDomain: "eudaimonia-3240b.firebaseapp.com",
      databaseURL: "https://eudaimonia-3240b.firebaseio.com",
      projectId: "eudaimonia-3240b",
      storageBucket: "eudaimonia-3240b.appspot.com",
      messagingSenderId: "203900826837",
      appId: "1:203900826837:web:bf1eed65d2ed1579"
    });
  
    firebase.firestore();
  }
}

const db = () => firebase.firestore();

/**
 * @param {Object} options
 * @param {string} options.path
 * @param {string} options.dataProp
 * @param {string} options.displayName
 */
export function withCollection({ dataProp, displayName }) {
  dataProp = dataProp || 'data';

  return WrappedComponent => {
    const defaultName = (WrappedComponent.displayName || WrappedComponent.name) + 'WithCollection';

    class CollectionHoC extends React.Component {
      static displayName = displayName || defaultName;

      state = {
        loading: true,
        data: [],
      }

      get path() {
        return WrappedComponent.collectionPath(this.props);
      }
  
      componentDidMount() {
        this.unsubscribe = db().collection(this.path).onSnapshot((snap) => {
          const data = snap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
  
          this.setState({ loading: false, data });
        });
      }
  
      componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
      }
  
      addItem = async (item) => {
        const docRef = await db().collection(this.path).add(item);
        return docRef.id;
      }
  
      render() {
        const { loading, data } = this.state;
        const props = {
          ...this.props,
          [dataProp]: data,
          [`${dataProp}Loading`]: loading,
          [`${dataProp}Insert`]: this.addItem,
        }
  
        return (
          <WrappedComponent {...props} />
        );
      }
    }
    
    return CollectionHoC;
  }
}

