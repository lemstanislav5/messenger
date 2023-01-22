//!ИСПОЛЬЗОВАТЬ ОДНУ И ТУЖЕ ФОРМУ
import * as React from 'react';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, TextInput,  Pressable, Alert, Text } from 'react-native';
import { authThunk } from '../redux/authenticationReducer';
import { connect } from 'react-redux';
import { getAuthSelector } from '../redux/selectrors';

const Auth = (props) => {
  const { auth, sendPhoneAuth } = props;
  const [phone, onChangePhone] = React.useState('+7');
  const [code, onChangeCode] = React.useState('* * * *');
  const [indicator, onIndicator] = React.useState(false);
  console.log('auth:', auth)
  React.useEffect(() => {
    console.log('auth:', auth)
    onIndicator(false);
 }, [auth]);
  const enterNumber = num => (phone.length < 2) ? onChangePhone('+7') : onChangePhone(num);
  const sendPhone = () => {
    onIndicator(true);
    sendPhoneAuth(phone);
  }

  return (
    <View>
        <SafeAreaView style={styles.container}>
        { (indicator)? <ActivityIndicator size="large" color="#00ff00" /> : '' }
        {
          auth ?
            <>
              <TextInput
                style={styles.input}
                onChangeText={onChangeCode}
                value={code}
                keyboardType='number-pad'
                textAlign={'center'}
              />
              <Pressable style={styles.button}>
                <Text style={styles.text}>{'SEND CODE'}</Text>
              </Pressable>
            </>
          :
            <>
              <TextInput
                style={styles.input}
                onChangeText={enterNumber}
                value={phone}
                keyboardType='number-pad'
                textAlign={'center'}
              />
              <Pressable style={styles.button} onPress={sendPhone}>
                <Text style={styles.text}>{'SEND PHONE'}</Text>
              </Pressable>
            </>
        }
        </SafeAreaView>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 270,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 270,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: getAuthSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendPhoneAuth: (phone) => dispatch(authThunk(phone))
  };
};

const Authentication = connect(mapStateToProps, mapDispatchToProps)(Auth);
export default Authentication;