import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Bas from './Bas';
import Couette from './Couette';
import Pluie from './Pluie';
import Pull from './Pull';
import Sweet from './Sweet';
import Manteau from './Manteau';

class Jour extends React.Component {

    constructor(props) {
        super(props);
        this.donnee = Object.values(props.donnee);
        this.temp_min = 0;
        this.temp_max = 0;
    }
    
    updateData(){
        this.temp_min = 13.12 + 0.6215 * this.props.donnee.temp_min + (0.3965 * this.props.donnee.temp_min - 11.37) * Math.pow(this.props.donnee.vent, 0.16);
        this.temp_max = 13.12 + 0.6215 * this.props.donnee.temp_max + (0.3965 * this.props.donnee.temp_max - 11.37) * Math.pow(this.props.donnee.vent, 0.16);
    }

    getinformation() {
        this.updateData();
        var jour = [];
        if (this.props.donnee.pluie) {
            jour.push(<View><Pluie/></View>)
        }
        if (this.temp_min >= 16 && this.temp_max < 27) {
            jour.push(<View><Sweet/></View>)
        } else if (this.temp_min < 16) {
            jour.push(<View><Manteau/></View>)
        }
        if (this.temp_min < 13) {
            jour.push(<View><Pull/></View>)
        }
        if (this.props.donnee.temp_min < 13) {
            jour.push(<View><Couette/></View>)
        }
        if (this.temp_min < 13) {
            jour.push(<View><Bas/></View>)
        }
        return jour;
    }

    render() {
        return (
                <View>
                    <Text>{this.props.donnee.date}</Text>
                    {this.getinformation()}
                </View>
                )
    }
}
export default Jour 