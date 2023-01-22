import * as React from 'react';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, TextInput,  Pressable, Alert, Text } from 'react-native';
import { authThunk } from '../redux/authenticationReducer';
import { connect } from 'react-redux';
import { getAuthSelector } from '../redux/selectrors';

const Auth = (props) => {
  const { auth, sendPhone } = props;
  const [phone, onChangeText] = React.useState('+7');
  const [indicator, onIndicator] = React.useState(false);
  console.log(indicator)
  const enterNumber = num => {
    if(phone.length < 2) {
      onChangeText('+7');
    } else {
      onChangeText(num);
    }
  }
  const send = phone => {
    onIndicator(true);
    sendPhone(phone);
  }

  return (
    <View>
        <SafeAreaView style={styles.container}>
        { (indicator)? <ActivityIndicator size="large" color="#00ff00" /> : '' }
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
    sendPhone: (phone) => dispatch(authThunk(phone))
  };
};

const Authentication = connect(mapStateToProps, mapDispatchToProps)(Auth);
export default Authentication;