import React from 'react';
import { StyleSheet, Text, View, FlatList, Button} from 'react-native';
import { getData } from './api/getmeteo';
import Jour from './components/Jour';

//lettre en BAUHAUS 93

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donnee: [],
            loading: false};
    }

    _loadData() {
        this.setState({loading: true})
        getData().then(data => {
            let meteo = data;
            this.setState({
                donnee: meteo,
                loading: false})
        });
    }

    sortData(apiResponse) {
        var res = [];
        apiResponse['list'].forEach(function (element) {
            var jour = element['dt_txt'].split(' ');
            if (!res[jour[0]]) {
                var structObj = {'temp_min': element['main']['temp_min'], 'temp_max': element['main']['temp_max'], 'pluie': false, 'vent': element['wind']['speed'], 'date':jour[0]};
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
                    console.log(13, 12 + 0.6215 * res[jour[0]]['temp_min'] + (0.3965 * res[jour[0]]['temp_min'] - 11.37) * Math.pow(res[jour[0]]['vent'], 0.16));
                }
            }
        });
        return res;
    }

    afficherJour() {
        this._loadData();
        var jour = [];
        for (let i = 0; i < 4; i++) {
            jour.push(
                                <View key = {i}>
                                    <View>
                                        <Jour donnee = {this.state.donnee[i]} />
                                    </View>
                                </View>
                                )
        }
        return jour;
    }

    //demander à charger semaine après avoir recu les données
    render() {
        this._loadData();
        return (
                            <View>
                                <View><Text>Meteo</Text></View>
                                <FlatList
                                    data={this.state.donnee}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({item}) => <Jour film={item}/>}
                                    />
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
