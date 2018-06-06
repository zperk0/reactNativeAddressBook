import React, { Component } from 'react';
import { View, Text, StyleSheet,  TouchableHighlight, ScrollView, TextInput, AsyncStorage } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import Contact from '../Contact'

export default class AddressBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: false,
      showNewContact: false
    };
    this.showAllContacts = this.showAllContacts.bind(this);
    this.addNewContact = this.addNewContact.bind(this);
    this.saveNewContact = this.saveNewContact.bind(this);
    this.contactCallback = this.contactCallback.bind(this);
  }

  componentDidMount() {
    AsyncStorage.multiGet(['contactsArray']).then((data) => {
      console.log(JSON.parse(data[0][1]).contacts);
      this.setState({contactsArray: JSON.parse(data[0][1]).contacts})
    })
  }

  saveNewContact() {
    let name = this.state.newName;
    let address = this.state.newAddress;
    let phone = this.state.newPhone;
    AsyncStorage.multiGet(['contactsArray']).then((data) => {
      let json = JSON.parse(data[0][1]);
      console.log(typeof json)
      if (!typeof json === 'object') {
        console.log('is ! obj')
        json = {}
        json.contacts = [];
      }
      if (!json.hasOwnProperty('contacts')) {
        console.log('hasProperty')
        json.contacts = [];
      }
      json.contacts.push({
        name: name,
        address: address,
        phone: phone
      })
      this.setState({contactsArray: json.contacts, showNewContact: false})
      AsyncStorage.multiSet([['contactsArray', JSON.stringify(json)]])
    })

  }

  contactCallback(i, updateObject, doDelete) {
    console.log(i)
    console.log(updateObject)
    console.log(doDelete)
    AsyncStorage.multiGet(['contactsArray']).then((data) => {
      let json = JSON.parse(data[0][1]);
      console.log(typeof json)
      if (!typeof json === 'object') {
        console.log('is ! obj')
        json = {}
        json.contacts = [];
      }
      if (!json.hasOwnProperty('contacts')) {
        console.log('hasProperty')
        json.contacts = [];
      }
      if (doDelete == true) {
        json.contacts.splice(i, 1)
      } else {
        json.contacts[i] = updateObject;
      }
      this.setState({contactsArray: json.contacts, showNewContact: false})
      AsyncStorage.multiSet([['contactsArray', JSON.stringify(json)]])
    })
  }

  showAllContacts() {
    console.log(this.state);
    if (Array.isArray(this.state.contactsArray) && this.state.showNewContact == false) {
      console.log('no issue here')
      let stateArr = this.state.contactsArray;
      let contactsJSX = [];

      for (let i = 0; i < stateArr.length; i++) {
        contactsJSX.push(<Contact key={i} count={i} contactObj={stateArr[i]} callback={this.contactCallback}/>)
      }
      console.log(stateArr.length)
      console.log(contactsJSX.length)
      return (
        <ScrollView keyboardShouldPersistTaps="always" style={styles.scrollView}>
        {contactsJSX}
        </ScrollView>
      )
    }
  }

  addNewContact() {
    if (this.state.showNewContact) {
      return (
        <Animatable.View useNativeDriver={true} style={styles.newContactContainer} animation="bounceInUp" duration={600}>
          <View  style={styles.newContact}>
            <Text style={styles.contactTitles}>NAME</Text>
            <TextInput
                style={styles.inputStyle}
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={(text) => this.setState({newName: text})}
                value={this.state.newName}
                placeholder={"Enter Full Name"}
                placeholderTextColor='grey'
            />
            <Text style={styles.contactTitles}>ADDRESS</Text>
            <TextInput
                style={styles.inputStyle}
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={(text) => this.setState({newAddress: text})}
                value={this.state.newAddress}
                placeholder={"Enter Address"}
                placeholderTextColor='grey'
            />
            <Text style={styles.contactTitles}>PHONE</Text>
            <TextInput
                style={styles.inputStyle}
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={(text) => this.setState({newPhone: text})}
                value={this.state.newPhone}
                placeholder={"Enter Phone Number"}
                placeholderTextColor='grey'
            />
            <TouchableHighlight style={styles.saveContactBtn} onPress={() => {this.saveNewContact()}}>
              <Text style={styles.buttonText}>Save New Contact</Text>
            </TouchableHighlight>
          </View>
        </Animatable.View>
      )
    } else {
      return (
        <Animatable.View useNativeDriver={true} style={styles.buttonBg} ref="newContactBtn">
          <TouchableHighlight style={{width: '100%', height: '100%', alignItems:'center', justifyContent:'center'}} onPress={() => {this.refs.newContactBtn.rubberBand(800).then(() => {this.setState({showNewContact: true})})}}>
            <Text style={styles.buttonText}>Add New Contact</Text>
          </TouchableHighlight>
        </Animatable.View>
      )
    }

  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
      {this.showAllContacts()}
      {this.addNewContact()}
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
  scrollView: {
    height: "90%",
  },
  buttonText: {
    color: 'white',
  },
  newContactContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  newContact: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderTopColor: 'black',
    borderTopWidth: 2,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
  saveContactBtn: {
    backgroundColor:'rgb(0,181,80)',
    width: "90%",
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    height: 40,
    borderRadius:9
  },
  contactTitles: {
    width: '100%',
    color: 'white',
  },
  contactPanel: {
    backgroundColor:'#1E90FF',
    margin:20,
    width: "90%",
    flexDirection: 'column',
    alignSelf:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    borderRadius:5,
    shadowRadius: 3,
    shadowOpacity: 1.0
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
    height: 40,
    marginLeft: '5%',
    marginRight: '5%',
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor:'#FFFFFF',
    textAlign:'center',
    color:'grey'
  },
  bar: {
    backgroundColor:'white',
    height: 64,
    borderTopColor: 'red',
    borderTopWidth: 2,
  },
})
