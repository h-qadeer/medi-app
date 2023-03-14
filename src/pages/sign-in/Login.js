import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [isVisibleSignIn, setIsVisibleSignIn] = useState(false);
  const title = {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    facebook: 'Facebook',
    google: 'Google',
  };
  navigation.setOptions({
    headerShown: false,
  });

  const userLoggedIn = id => {
    dispatch({type: 'USER_LOGIN', id: id});
  };

  // auth()
  //   .createUserWithEmailAndPassword('haris@gmail.com', 'haris!')
  //   .then(() => {
  //     console.log('User account created & signed in!');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/email-already-in-use') {
  //       alert('That email address is already in use!');
  //     }

  //     if (error.code === 'auth/invalid-email') {
  //       alert('That email address is invalid!');
  //     }

  //     console.error(error);
  //   });

  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const isSignedIn = async () => {
    const isLogedIn = await GoogleSignin.isSignedIn();
    console.log('isSignedIn: ', isLogedIn);
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      if (userInfo) {
        userLoggedIn(userInfo.user.id);
      }
      // this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        {isVisibleSignIn ? (
          <Text
            style={styles.heading}
            onPress={() => setIsVisibleSignIn(false)}>
            Sign Up
          </Text>
        ) : (
          <Text style={styles.heading}>Sign In</Text>
        )}

        <View style={styles.formContainer}>
          {isVisibleSignIn && (
            <>
              <Text style={styles.labels}>Full Name</Text>
              <TextInput placeholder="Please enter name" style={styles.input} />
            </>
          )}
          <Text style={styles.labels}>Email</Text>
          <TextInput placeholder="Please enter email" style={styles.input} />
          <Text style={styles.labels}>Password</Text>
          <TextInput placeholder="Please enter password" style={styles.input} />
          {isVisibleSignIn && (
            <>
              <Text style={styles.labels}>Confirm Password</Text>
              <TextInput
                placeholder="Please enter confirm password"
                style={styles.input}
              />
            </>
          )}
          <View style={styles.signUpContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.text}>
                {isVisibleSignIn ? title.signUp : title.signIn}
              </Text>
            </Pressable>
          </View>
          <View style={styles.otherButtons}>
            <Pressable
              style={styles.btn}
              onPress={() => alert('Hello! I am an alert box!')}>
              <AntDesign
                style={styles.facebookIconSize}
                name="facebook-square"
                onPress={() => alert('Cart')}
              />
              <Text style={styles.textOtherBtn}>{title.facebook}</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={signIn}>
              <AntDesign
                style={styles.googleIconSize}
                name="google"
                onPress={() => alert('Cart')}
              />
              <Text style={styles.textOtherBtn}>{title.google}</Text>
            </Pressable>
          </View>
          <View style={styles.footer}>
            {isVisibleSignIn ? (
              <Text
                style={styles.footerText}
                onPress={() => setIsVisibleSignIn(false)}>
                Already have an account?
              </Text>
            ) : (
              <Text
                style={styles.footerText}
                onPress={() => setIsVisibleSignIn(true)}>
                Don't you have an account?
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 40,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#9982ac',
  },
  formContainer: {
    paddingHorizontal: 30,
    height: 800,
  },
  labels: {
    color: 'gray',
    marginTop: 20,
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  signUpContainer: {
    marginTop: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#9982ac',
  },
  facebookIconSize: {
    fontSize: 25,
    color: '#3b5998',
  },
  googleIconSize: {
    fontSize: 25,
    color: '#4285F4',
  },
  btn: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#65ab99',
    backgroundColor: 'transparent',
    width: '45%',
  },
  otherButtons: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#fff',
  },
  textOtherBtn: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#65ab99',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'bottom',
    marginTop: 40,
    padding: 30,
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9982ac',
  },
});

export default Login;
