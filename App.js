import React from 'react';
import { StyleSheet, Text, View, FlatList, Button} from 'react-native';
import { getData } from './api/getmeteo';
import Semaine from './components/Semaine';

//lettre en BAUHAUS 93

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this._meteo = [];
    }

    componentWillMount() {
        this._loadData();
        console.log("composent mounted");
    }

    _loadData() {
        getData().then(data => {
            this._meteo = data;
            this._meteo = this.sortData(this._meteo);
        });
    }

    sortData(apiResponse) {
        var res = {};
        apiResponse['list'].forEach(function (element) {
            var jour = element['dt_txt'].split(' ');
            if (!res[jour[0]]) {
                var structObj = {'temp_min': element['main']['temp_min'], 'temp_max': element['main']['temp_max'], 'rain': false, 'vent': element['wind']['speed']};
                var test = jour[0];
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
    
    test(){
        console.log(this._meteo);
    }
 //demander à charger semaine après avoir recu les données
    render() {
        console.log(this._meteo)
        return (
                <View style={styles.main_container}> 
                    <Semaine donnee = {this._meteo}/>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
