import * as React from 'react';
import { View, SafeAreaView, StyleSheet, TextInput,  Pressable, Alert, Text } from 'react-native';
import axios from "axios";

const URL = 'http://212.193.48.242:4000';

const Authentication = () => {
  const [phone, onChangeText] = React.useState('+7');
  const enterNumber = num => {
    if(phone.length < 2) {
      onChangeText('+7');
    } else {
      onChangeText(num);
    }
  }
  const send = () => {
    //https://63c9375b904f040a9658e4e3.mockapi.io/api/get/uesrs
    // axios.get('https://63c9375b904f040a9658e4e3.mockapi.io/api/get/uesrs', {
    //     params: {}
    // })
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // })
    // .then(function () {
    //     // always executed
    // });
    axios.post(URL + '/api/authentication', {
      type: 'authentication', phone
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={enterNumber}
        value={phone}
        keyboardType='number-pad'
        textAlign={'center'}
      />
      <Pressable style={styles.button} onPress={send}>
        <Text style={styles.text}>{'SEND'}</Text>
      </Pressable>
    </SafeAreaView>
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

export default Authentication;