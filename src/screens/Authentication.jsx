//!ИСПОЛЬЗОВАТЬ ОДНУ И ТУЖЕ ФОРМУ
import * as React from 'react';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, TextInput,  Pressable, Alert, Text } from 'react-native';
import { authThunk } from '../redux/authenticationReducer';
import { connect } from 'react-redux';
import { getAuthSelector } from '../redux/selectrors';

const Auth = (props) => {
  const { auth, sendPhoneAuth } = props;
  const [phone, onChangePhone] = React.useState();
  const [code, onChangeCode] = React.useState('* * * *');
  const [indicator, onIndicator] = React.useState(false);
  console.log('auth1:', auth)
  React.useEffect(() => {
    console.log(phone)
    console.log('auth2:', auth)
    onIndicator(false);
 }, [auth]);
  const enterNumber = num => {
    console.log('enterNumber');
    (phone.length < 2) ? onChangePhone('+7') : onChangePhone(num);
  }
  const enterCode = () => {
    console.log('enterCode');
    let count = code.split('*').length - 1;
    if(count === 4) code.replaceAt(0, "x")
    console.log(count);
  }
  const sendPhone = () => {
    console.log(phone.length)
    if(phone.length === 11){
      onIndicator(true);
      sendPhoneAuth(phone);
    } else {
      Alert.alert('Неправильный номер.', 'Номер телефона должен состоять из 11 цифр.', [
        {text: 'Исправить', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}> 
        { (true)? <ActivityIndicator style={styles.loading} /> : '' }
      </View>
      <Text style={styles.text}>{auth ? 'Укажите код из СМС' : 'Укажите номер телефона'}</Text>
      <TextInput
        style={styles.input}
        onChangeText={auth ? enterCode : onChangePhone}
        value={auth ? code : phone}
        keyboardType='number-pad'
        textAlign={'center'}
        placeholder={auth ? '* * * *' : '79990001122' }
      />
      <Pressable style={styles.button} onPress={auth ? sendPhone : sendPhone}>
        <Text style={styles.textButton}>Отправить</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginHorizontal: 16,
    top: 0,
    backgroundColor: "darkorange",
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
