import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  textInputContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 46,
    borderWidth: 0,
    flex: 1,
  },
  errorMessageStyle: {
    fontSize: 12,
    backgroundColor: 'transparent',
    paddingLeft: 15,
  },
  icon: {
    marginRight: 9,
  }
});

/**
 * Generic Input component to validate entries depending on pre-defined regexp or custom validation function
 */
export default class InputValidation extends Component {
  static propTypes = {
    ...TextInput.propTypes,
    /**
     * Input validators. Can be a regexp or a predefined name like email or password
     */
    validator: PropTypes.string,
    /**
     * Execution delay of the validator
     */
    validatorExecutionDelay: PropTypes.number,
    /**
     * Custom validator function which must return a boolean. Useful to check if password matches in 2 different inputs for example
     */
    customValidator: PropTypes.func,
    /**
     * Function called after the validators has been done
     */
    onValidatorExecuted: PropTypes.func,
    /**
     * Error message displayed under the input
     */
    errorMessage: PropTypes.string,
    /**
     * Error message style
     */
    errorMessageStyle: Text.propTypes.style,
    /**
     * Style of the input when it’s invalid
     */
    errorInputContainerStyle: ViewPropTypes.style,
    /**
     * Component container style
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Component used to display the icon
     */
    iconComponent: PropTypes.any,
    /**
     * Icon name to be displayed at left of the input
     */
    iconName: PropTypes.string,
    /**
     * Icon size
     */
    iconSize: PropTypes.number,
    /**
     * Icon color
     */
    iconColor: PropTypes.string,
    /**
     * Input label
     */
    label: PropTypes.string,
    /**
     * Label style
     */
    labelStyle: Text.propTypes.style,
    /**
     * Input container style
     */
    textInputContainerStyle: TextInput.propTypes.style,
    /**
     * Input ref
     */
    inputRef: PropTypes.func
  };

  static defaultProps = {
    validator: null,
    validatorExecutionDelay: 0,
    customValidator: null,
    onValidatorExecuted: null,
    errorMessage: 'Invalid entry',
    errorMessageStyle: { color: 'red' },
    errorInputContainerStyle: { borderColor: 'red', borderWidth: 1 },
    iconName: null,
    iconSize: 20,
    iconColor: '#000',
    iconComponent: null,
    label: null,
    labelStyle: {},
    textInputContainerStyle: {},
    inputRef: null
  };

  /**
   * Pre-defined RegExp validators. Those strings are instantiated later during the execution of the validators as RegExp objects
   * @type {{email: string, password: string, username: string}}
   */
  customValidators = {
    email: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
    password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
    username: '^\\w{6,20}$',
  };

  constructor() {
    super();
    /**
     * Component's state
     * @type {{isValid: boolean}}
     */
    this.state = {
      isValid: false,
    };
  }

  /**
   * Called when component has been mounted
   * Adds a debounce on the triggerValidators function
   * Initializes textValue
   */
  componentDidMount() {
    const { validatorExecutionDelay, defaultValue, value } = this.props;

    this.triggerValidators = debounce(this.triggerValidators, validatorExecutionDelay);
    /**
     * Input value
     * @type {InputValidation.props.defaultValue|string}
     */
    this.textValue = defaultValue || value || '';
    this.executeValidators()
  }

  /**
   * Function to execute the validators
   * @param {string} value Value to validate
   */
  triggerValidators() {
    this.executeValidators();
  }

  /**
   * Function which execute the validators on a value
   * @param {string} value Value on which the validators should be executed
   */
  executeValidators() {
    const {
      validator,
      customValidator,
      onValidatorExecuted,
      required,
    } = this.props;
    let isValid = this.state.isValid;
    const validatorRegexp = new RegExp(this.customValidators[validator] || validator);
    const value = this.textValue

    if ((value.length === 0 || !value) && (validator || customValidator)) {
      isValid = true;
    } else if (!validator && !customValidator) {
      isValid = true;
    } else if (validator in this.customValidators) {
      isValid = validatorRegexp.test(value);
    } else if (validator instanceof String || typeof validator === 'string') {
      isValid = validatorRegexp.test(value);
    }

    if (customValidator) {
      isValid = customValidator(value);
    }

    this.setState({ isValid }, () => {
      if (onValidatorExecuted) onValidatorExecuted(isValid)
    });
  }

  /**
   * Getter for the input value
   * @return {string}
   */
  getTextValue() {
    return this.textValue;
  }

  /**
   * Function triggered when input content has changed
   * @param {string} value Value of the input
   */
  onChangeText(value) {
    this.textValue = value;
    this.triggerValidators();
  }

  /**
   * Function that checks the validity of the input
   * @return {boolean}
   */
  isInputValid() {
    return this.state.isValid;
  }

  render() {
    const {
      errorMessage,
      errorMessageStyle,
      errorInputContainerStyle,
      style,
      containerStyle,
      iconName,
      iconSize,
      iconColor,
      iconComponent,
      onChangeText,
      onFocus,
      textInputContainerStyle,
      label,
      labelStyle,
      inputRef,
      ...props,
    } = this.props;
    const {
      isValid,
    } = this.state;

    const Icon = iconComponent;

    return (
      <View
        style={[
          styles.container,
          containerStyle || {},
        ]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={[styles.textInputContainer, textInputContainerStyle, !isValid ? errorInputContainerStyle : {}]}>
          {
            iconComponent && iconName && (
              <Icon name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
            )
          }
          <TextInput
            onChangeText={text => {
              onChangeText && onChangeText(text);
              this.onChangeText(text);
            }}
            onFocus={() => {
              onFocus && onFocus()
              this.executeValidators(this.textValue)
            }}
            style={[
              styles.textInput,
              style || {},
            ]}
            ref={inputRef}
            {...props} />
        </View>
        { !isValid && (
          <Text
            style={[
              styles.errorMessageStyle,
              errorMessageStyle,
            ]}>
            {errorMessage}
          </Text>
        )}
      </View>
    )
  }
}
