## **Installation** ##

Using npm: `npm i -S react-native-input-validation`
Using yarn:  `yarn add react-native-input-validation`


----------


## **Quick Start** ##

First `import InputValidation from 'react-native-input-validation`

Then simply use it in your component like this:

`<InputValidation validator="email" onValidatorExecuted={isValid => console.log(isValid)} validatorExecutionDelay={100}/>`

This will display a text input. When you type, the "email" validator (already defined in the component) will be tested with the input value after 100ms, then it will trigger the onValidatorExecuted callback, passing the validity of the input.


----------

## **Props and methods** ##

The input accepts every props from TextInput component.

**Props**
<table>
    <thead>
        <tr>
            <td>Prop Name</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>validator</td>
            <td>string</td>
            <td></td>
            <td>Input validators. Can be a regexp or a predefined name like email, username or password. The username condition is to have at least 6 characters and at most 20 characters. The password condition is to have at least 8 characters, one lowercase, one uppercase, one special character and one number. You can pass your own regexp <b>as a string</b>.</td>
        </tr>
        <tr>
            <td>validatorExecutionDelay</td>
            <td>number</td>
            <td>0</td>
            <td>Delay after which validation is checked</td>
        </tr>
        <tr>
            <td>customValidator</td>
            <td>function</td>
            <td></td>
            <td>Function returning a boolean corresponding to the input validity, receiving input value as parameter. Can be used to compare the value of 2 inputs, for exemple password input, and password confirmation input.</td>
        </tr>
        <tr>
            <td>onValidatorExecuted</td>
            <td>function</td>
            <td></td>
            <td>Callback executed when the validation is done</td>
        </tr>
        <tr>
            <td>errorMessage</td>
            <td>string</td>
            <td>'Invalid entry'</td>
            <td>Message displayed when the input is invalid</td>
        </tr>
        <tr>
            <td>errorMessageStyle</td>
            <td>ViewPropTypes.style</td>
            <td>{ color: 'red' }</td>
            <td>Style applied to the text error message</td>
        </tr>
        <tr>
            <td>errorInputContainerStyle</td>
            <td>ViewPropTypes.style</td>
            <td>{ borderColor: ‘red’, borderWidth: 1 }</td>
            <td>Style applied to the input view container when the input is invalid.</td>
        </tr>
        <tr>
            <td>containerStyle</td>
            <td>ViewPropTypes.style</td>
            <td></td>
            <td>Style applied to the global container</td>
        </tr>
        <tr>
            <td>iconComponent</td>
            <td>Component</td>
            <td></td>
            <td>Component used to display the icon at the left of the input.</td>
        </tr>
        <tr>
            <td>iconName</td>
            <td>string</td>
            <td></td>
            <td>Name of the icon displayed at the left of the input</td>
        </tr>
        <tr>
            <td>iconSize</td>
            <td>number</td>
            <td></td>
            <td>Size of the icon displayed at the left of the input</td>
        </tr>
        <tr>
            <td>iconColor</td>
            <td>string</td>
            <td></td>
            <td>Color of the icon displayed at the left of the input</td>
        </tr>
    </tbody>
</table>

**Methods**
<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Params</td>
            <td>Description</td>
        <tr>
    </thead>
    <tbody>
        <tr>
            <td>getTextValue</td>
            <td></td>
            <td>Returns the value of the input</td>
        </tr>
        <tr>
            <td>isInputValid</td>
            <td></td>
            <td>Returns the validity of the input</td>
        </tr>
    </tbody>
</table>


----------

## **Contributing** ##

If you have any problem, leave an issue [here](https://github.com/foyarash/react-native-input-validation/issues)

If you want to add a feature of fix a bug, leave a pull request.