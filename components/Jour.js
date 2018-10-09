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
        this.donnee = this.props.donnee;
        this.temp_min = 13, 12 + 0.6215 * this.donnee.temp_min + (0.3965 * this.donnee.temp_min - 11.37) * Math.pow(this.donnee.vent, 0.16)
        this.temp_max = 13, 12 + 0.6215 * this.donnee.temp_max + (0.3965 * this.donnee.temp_max - 11.37) * Math.pow(this.donnee.vent, 0.16)
        console.log(this.temp_max)
    }

    getinformation() {
        var image = [];
        if (this.donnee.pluie) {
            image.push(<View><Pluie/></View>)
        }
        if (this.temp_min > 19 && this.temp_max < 27) {
            image.push(<View><Sweet/></View>)
        } else if (this.temp_min < 19) {
            image.push(<View><Manteau/></View>)
        }
        if (this.temp_min < 13) {
            image.push(<View><Pull/></View>)
        }
        if (this.donnee.temp_min < 13) {
            image.push(<View><Couette/></View>)
        }if (this.temp_min < 13) {
            image.push(<View><Bas/></View>)
        }
        return image;
    }

    render() {
        var indication = getinformation();
        return (
                            <View>
                                <View>
                                    <View><Text>Meteo</Text></View>
                                </View>
                            
                                { indication }
                            </View>
                            )
    }
}
export default Jour 