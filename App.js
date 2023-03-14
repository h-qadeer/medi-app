/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import cartReducer from './src/store/reducer';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StackNavigation from './src/navigations/stackNavigation';

const store = createStore(cartReducer);
const App = () => {
  return (
    <Provider store={store}>
      <LinearGradient
        colors={['#fff', '#f7f3fb', '#e8ddf2']}
        style={styles.linearGradient}>
        <StackNavigation />
      </LinearGradient>
    </Provider>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 25,
    fontWeight: '700',
  },
});
export default App;
