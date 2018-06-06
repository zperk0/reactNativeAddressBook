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

  componentWillReceiveProps(nextProps) {
    this.setState({contactProps: nextProps.contactObj})
  }

  updateValue(propertyName, value) {
    let contact = this.state.contactProps;
    contact[propertyName] = value
    this.setState({contactProps: contact})
  }

  showViewOrEdit() {
    if (this.state.isEditing) {
      return (
        <Animatable.View key={0} useNativeDriver={true} style={styles.contactPanel} animation="bounceInLeft" duration={600}>
          <View style={styles.contactView}>
            <View style={styles.contactPanel}>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>FIRST NAME</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            onChangeText={this.updateValue.bind(this, 'first_name')}
                            value={this.state.contactProps.first_name}
                            placeholder={"Enter First Name"}
                            placeholderTextColor='grey'/>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>LAST NAME</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            onChangeText={this.updateValue.bind(this, 'last_name')}
                            value={this.state.contactProps.last_name}
                            placeholder={"Enter Last Name"}
                            placeholderTextColor='grey'/>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>DATE OF BIRTH</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            onChangeText={this.updateValue.bind(this, 'dob')}
                            value={this.state.contactProps.dob}
                            placeholder={"Enter Date of Birth"}
                            placeholderTextColor='grey'/>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>PHONE</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            onChangeText={this.updateValue.bind(this, 'phone')}
                            value={this.state.contactProps.phone}
                            placeholder={"Enter Phone Number"}
                            placeholderTextColor='grey'/>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitles}>ZIP CODE</Text>
                <TextInput style={styles.inputStyle}
                            autoCapitalize='words'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            onChangeText={this.updateValue.bind(this, 'zip')}
                            value={this.state.contactProps.zip}
                            placeholder={"Enter Zip Code"}
                            placeholderTextColor='grey'/>
              </View>
            </View>
            <Animatable.View key={0} useNativeDriver={true} style={styles.contactControls} animation="fadeInRight" duration={600}>
              <TouchableHighlight style={styles.contactEdit} onPress={() => {this.setState({isEditing: false});this.props.callback(this.props.count, this.state.contactProps, false)}}>
                <Text>Save</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.contactDelete} onPress={() => this.props.callback(this.props.count, this.state.contactProps, true)}>
                <Text>Delete</Text>
              </TouchableHighlight>
            </Animatable.View>
          </View>
        </Animatable.View>
      )
    }
    return (
      <Animatable.View key={0} useNativeDriver={true} style={styles.contactPanel} animation="bounceInLeft" duration={600}>
        <View style={styles.contactView}>
          <Animatable.View useNativeDriver={true} style={styles.contactPanel} animation="bounceInLeft" duration={600}>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>FIRST NAME</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.first_name || ""}</Text>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>LAST NAME</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.last_name || ""}</Text>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>DATE OF BIRTH</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.dob || ""}</Text>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>PHONE</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.phone || ""}</Text>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactTitles}>ZIP CODE</Text>
              <Text style={styles.contactValue}>{this.state.contactProps.zip || ""}</Text>
            </View>
          </Animatable.View>
          <Animatable.View key={1} useNativeDriver={true} style={styles.contactControls} animation="fadeInRight" duration={600}>
            <TouchableHighlight style={styles.contactEdit} onPress={() => this.setState({isEditing: true})}>
              <Text>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.contactDelete} onPress={() => this.props.callback(this.props.count, this.state.contactProps, true)}>
              <Text>Delete</Text>
            </TouchableHighlight>
          </Animatable.View>
        </View>
      </Animatable.View>
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
    flex: .25,
    height: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  contactEdit: {
    backgroundColor:'rgb(0,181,4)',
    borderRadius:5,
    margin: 10,
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactValue: {
    height: 30,
    marginTop: 5,
    marginBottom: 5
  },
  contactDelete: {
    backgroundColor:'rgb(200,30,4)',
    borderRadius:5,
    margin: 10,
    height: '15%',
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
    height: 40,
    marginLeft: '5%',
    marginRight: '5%',
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor:'#FFFFFF',
    textAlign:'center',
    color:'grey'
  },
})
