import React, { Component } from 'react';
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';


export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.children)
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <TouchableHighlight styles={this.props.styles}>
        {this.props.children}
        </TouchableHighlight>
      )
    }
    return (
      <TouchableNativeFeedback styles={this.props.styles}>
      </TouchableNativeFeedback>
    )
  }
}
