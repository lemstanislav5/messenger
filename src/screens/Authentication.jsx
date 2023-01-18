import * as React from 'react';
import {View, SafeAreaView, StyleSheet, TextInput,  Pressable, Alert, Text } from 'react-native';

const Authentication = () => {
  const [phone, onChangeText] = React.useState('phone');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={phone}
      />
      <Pressable style={styles.button} onPress={() => Alert.alert(phone)}>
      <Text style={styles.text}>{"title"}</Text>
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
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
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