import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Semaine extends React.Component {

constructor(props){
    super(props);
    this.donnee = this.props.donnee;
}

    test() {
        console.log(this.donnee);
    }

    render() {
        const donnee = this.props.donnee
        console.log(donnee);
        return (
                <View> 
                    
                </View>
                            );
                }
    }
    export default Semaine 