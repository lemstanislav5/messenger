//!ИСПОЛЬЗОВАТЬ ОДНУ И ТУЖЕ ФОРМУ
import * as React from 'react';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, TextInput,  Pressable, Alert, Text } from 'react-native';
import { authThunk } from '../redux/authenticationReducer';
import { connect } from 'react-redux';
import { getAuthSelector } from '../redux/selectrors';

const Auth = (props) => {
  const { auth, sendPhoneAuth } = props;
  const [phone, onChangePhone] = React.useState();
  const [code, onChangeCode] = React.useState();
  const [indicator, onIndicator] = React.useState(false);
  console.log('auth1:', auth)
  React.useEffect(() => {
    console.log(phone)
    console.log('auth2:', auth)
    onIndicator(false);
 }, [auth]);
  const sendCode = () => {
    console.log('enterCode')
  }
  const sendPhone = () => {
    console.log(phone.length)
    if(phone.length === 10){
      onIndicator(true);
      sendPhoneAuth(phone);
    } else {
      Alert.alert('Messenger', 'Номер телефона должен состоять из 11 цифр.', [
        {text: 'Исправить', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        { (indicator)? <ActivityIndicator style={styles.loading} /> : '' }
      </View>
      <Text style={styles.text}>{auth ? 'Укажите код из СМС' : 'Укажите номер телефона'}</Text>
      <TextInput
        style={styles.input}
        onChangeText={auth ? onChangeCode : onChangePhone}
        value={auth ? code : phone}
        keyboardType='number-pad'
        textAlign={'center'}
        placeholder={auth ? '* * * *' : '9990001122' }
      />
      <Pressable style={styles.button} onPress={auth ? sendCode : sendPhone}>
        <Text style={styles.textButton}>Отправить</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 16,
    top: 0,
    backgroundColor: '#657f17',
    paddingTop: 150
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 270,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    textAlign:"center",
  },
  button: {
    width: 270,
    margin: 12,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  loading:{
    size: 'large',
    color: '#000'
  },
  view: {
    height: 50
  }
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
