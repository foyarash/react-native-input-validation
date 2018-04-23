/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, Button, Picker } from "react-native"
import Input from "react-native-input-validation"
import Icon from "react-native-vector-icons/Ionicons"
import map from "lodash/map"

export default class App extends Component {
  inputRef = React.createRef()

  modes = {
    password: {
      name: "Password",
      validator: "password",
      correctValue: "Johndoe1234",
      incorrectValue: "HelloWorld",
      iconName: "ios-lock",
    },
    username: {
      name: "Username",
      validator: "username",
      correctValue: "Johndoe123",
      incorrectValue: "Hello",
      iconName: "ios-person",
    },
    email: {
      name: "Email",
      validator: "email",
      correctValue: "john@doe.com",
      incorrectValue: "John Doe",
      iconName: "ios-mail",
    },
  }

  state = {
    inputValue: "john@doe.com",
    selectedMode: this.modes.email,
    correctValueToggle: true,
  }

  onPressButton = () => {
    this.setState(
      { correctValueToggle: !this.state.correctValueToggle },
      () => {
        const mode = this.state.selectedMode
        this.inputRef.current.executeValidators()
      },
    )
  }

  onSelectMode = mode => {
    this.setState({ selectedMode: mode })
  }

  render() {
    const mode = this.state.selectedMode
    return (
      <View style={styles.container}>
        <Text>Selected mode: {mode.name}</Text>
        <View>
          {map(this.modes, (value, key) => (
            <Button
              key={key}
              onPress={() => this.onSelectMode(value)}
              title={value.name}
            />
          ))}
        </View>
        <Input
          validator={this.state.selectedMode.validator}
          placeholder="Type text"
          value={
            this.state.correctValueToggle
              ? mode.correctValue
              : mode.incorrectValue
          }
          placeholderTextColor="#000"
          containerStyle={{
            width: "100%",
            paddingHorizontal: 20,
          }}
          label="Input label"
          textInputContainerStyle={{
            paddingLeft: 15,
            paddingRight: 0,
            borderWidth: 1,
            borderColor: "#7E7E7E",
            borderRadius: 23,
          }}
          iconComponent={Icon}
          iconName={this.state.selectedMode.iconName}
          iconSize={30}
          ref={this.inputRef}
          labelStyle={{ paddingLeft: 44, marginBottom: 5 }}
          errorMessageStyle={{ paddingLeft: 44, color: "red", marginTop: 5 }}
        />
        <Button
          onPress={this.onPressButton}
          title={
            this.state.correctValueToggle
              ? "Set incorrect value"
              : "Set valid value"
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
