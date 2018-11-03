import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import Jour from './Jour';

class Semaine extends React.Component {

    split() {
        var jours = Object.values(this.props.donnee);
        var infoJour = [];
        var counter = 0;
        jours.forEach(function (elm) {
            if (counter < 3) {
                infoJour.push(<View style={{flex: 2, backgroundColor: 'skyblue'}}><Jour donnee={elm}/></View>)
                    counter ++;
                }
            });
            return infoJour;
        }

        render() {
            return (
                    <View style={{flexDirection: 'row'}}>
                        {this.split()}
                    </View>
                                )
                    }
        }
        export default Semaine 