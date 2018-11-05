import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import { getData } from './api/getmeteo';
import Semaine from "./components/Semaine";
import Refresh from "./components/Refresh";
//lettre en BAUHAUS 93

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {donnee: []};
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData() {
        getData().then(data => {
            let meteo = data;
            meteo = this.sortData(meteo);
            this.setState({donnee: meteo});
        });
    }

    sortData(apiResponse) {
        var res = {};
        apiResponse.list.forEach(function (element) {
            var jour = element['dt_txt'].split(' ');
            if (!res[jour[0]]) {
                var structObj = {'temp_min': element['main']['temp_min'], 'temp_max': element['main']['temp_max'], 'pluie': false, 'vent': element['wind']['speed'], 'date': jour[0]};
                res[jour[0]] = structObj;
            } else {
                if (res[jour[0]]['temp_min'] > element['main']['temp_min']) {
                    res[jour[0]]['temp_min'] = element['main']['temp_min'];
                }
                if (res[jour[0]]['temp_max'] < element['main']['temp_max']) {
                    res[jour[0]]['temp_max'] = element['main']['temp_max'];
                }
                if (element['rain']) {
                    res[jour[0]]['rain'] = true;
                }
                if (res[jour[0]]['vent'] < element['wind']['speed']) {
                    res[jour[0]]['vent'] = element['wind']['speed'];
                }
            }                       

        });
        return res;
    }

    render() {
        return (
                <View>
        <View />
                    <View style={styles.container}><Text style={[styles.title, this.props.isActive && styles.activeTitle]}>Meteo</Text></View>
                    <Semaine donnee={this.state.donnee}/>
                    <View style={{alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => {this._loadData()}}><Refresh/></TouchableOpacity>
                        </View>
                </View>
                        );
        }
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            borderWidth: 0.5
        },
        title: {
            fontSize: 19,
            fontWeight: 'bold'
        },
        refresh: {
            alignItems: 'stretch',
            justifyContent: 'center'
        }
    });
