import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from '../pages/cart/Cart';
import Home from '../pages/home/HomePage';
import ProductDetail from '../pages/product/ProductDetails';
import SignIn from '../pages/sign-in/Login';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const StackNavigation = () => {
  const {isUserLoggedIn} = useSelector(state => state);
  const AuthenticatedNavigation = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#d4c3f7'},
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => <AntDesign style={styles.icon} name="logout" />,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Product Detail"
          component={ProductDetail}
          options={{
            headerStyle: {
              backgroundColor: 'none',
            },
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerStyle: {
              backgroundColor: 'none',
            },
          }}
        />
      </Stack.Navigator>
    );
  };
  const AuthScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#d4c3f7'},
          headerTitleAlign: 'center',
        }}
        initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isUserLoggedIn ? <AuthenticatedNavigation /> : <AuthScreens />}
    </NavigationContainer>
  );
};
export default StackNavigation;
