import React, { Component } from 'react';
import { View, Text, StyleSheet,  TouchableHighlight, ScrollView, TextInput, AsyncStorage } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: false,
      showNewContact: false,
      isEditing: false,
      contactProps: this.props.contactObj
    };
    this.showViewOrEdit = this.showViewOrEdit.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  componentDidMount() {
    // AsyncStorage.multiGet(['contactsArray']).then((data) => {
    //   console.log(JSON.parse(data[0][1]).contacts);
    //   this.setState({contactsArray: JSON.parse(data[0][1]).contacts})
    // })
  }

  deleteContact() {
    this.props.callback.bind() //contactCallback(i, updateObject, doDelete)
  }

  // <TextInput
  //     style={styles.inputStyle}
  //     autoCapitalize='words'
  //     autoCorrect={false}
  //     onChangeText={(text) => this.setState({newName: text})}
  //     value={this.state.newName}
  //     placeholder={"Enter Full Name"}
  //     placeholderTextColor='grey'
  // />

  updateValue(propertyName, value) {
    console.log(value)
    console.log(propertyName)
    let contact = this.state.contactProps;
    contact[propertyName] = value
    this.setState({contactProps: contact})
  }

  showViewOrEdit() {
    if (this.state.isEditing) {
      return (
        <TouchableHighlight>
          <View style={styles.contactView}>
            <View style={styles.contactPanel}>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>NAME</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            onChangeText={this.updateValue.bind(this, 'name')}
                            value={this.state.contactProps.name}
                            placeholder={"Enter Full Name"}
                            placeholderTextColor='grey'/>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>ADDRESS</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            onChangeText={this.updateValue.bind(this, 'address')}
                            value={this.state.contactProps.address}
                            placeholder={"Enter Full Name"}
                            placeholderTextColor='grey'/>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>PHONE</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            onChangeText={this.updateValue.bind(this, 'phone')}
                            value={this.state.contactProps.phone}
                            placeholder={"Enter Full Name"}
                            placeholderTextColor='grey'/>
              </View>
            </View>
            <View style={styles.contactControls}>
              <TouchableHighlight style={styles.contactEdit} onPress={() => {this.setState({isEditing: false});this.props.callback(this.props.count, this.state.contactProps, false)}}>
                <Text>Save</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.contactDelete} onPress={() => this.props.callback(this.props.count, this.state.contactProps, true)}>
                <Text>Delete</Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <TouchableHighlight onPress={() => console.log('tapped')}>
        <View style={styles.contactView}>
          <View style={styles.contactPanel}>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>NAME</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.name || ""}</Text>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>ADDRESS</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.address || ""}</Text>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>PHONE</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.phone || ""}</Text>
            </View>
          </View>
          <View style={styles.contactControls}>
            <TouchableHighlight style={styles.contactEdit} onPress={() => this.setState({isEditing: true})}>
              <Text>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.contactDelete} onPress={() => this.props.callback(this.props.count, this.state.contactProps, true)}>
              <Text>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View>
        {this.showViewOrEdit()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  contactControls: {
    flex: .25
  },
  contactEdit: {
    backgroundColor:'rgb(0,181,4)',
    borderRadius:5,
    margin: 10,
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactValue: {
    height: 30
  },
  contactDelete: {
    backgroundColor:'rgb(200,30,4)',
    borderRadius:5,
    margin: 10,
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#1E90FF',
    margin:20,
    width: "90%",
    alignSelf:'center',
    borderRadius:5
  },
  buttonText: {
    color: 'white',
  },
  buttonBg:{
    backgroundColor:'rgb(0,181,80)',
    margin:20,
    width: "90%",
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    height: "5%",
    borderRadius:5
  },
  contactTitles: {
    width: '100%',
    color: 'white',
  },
  contactPanel: {
    flex: .75,
    flexDirection: 'column',
    alignSelf:'center',
  },
  contactSection: {
    width: '100%',
    padding: 10,
    flex: 1,
  },
  whiteColorText: {
    color: 'white',
  },
  inputStyle:{
    height: 30,
    marginLeft: '5%',
    marginRight: '5%',
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor:'#FFFFFF',
    textAlign:'center',
    color:'grey'
  },
})
