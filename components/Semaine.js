import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Jour from './Jour';

class Semaine extends React.Component {
    
    split(){
        var jours = Object.values(this.props.donnee);
        var infoJour = [];
        jours.forEach(function(elm){
            infoJour.push(<View><Jour donnee={elm}/></View>)
        });
        return infoJour;
    }

    render() {
        return (
                <View>
                    <Text>Semaine</Text>
                    {this.split()}
                </View>
                )
    }
}
export default Semaine 