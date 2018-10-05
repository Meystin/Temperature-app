import React from 'react';
import { StyleSheet, Text, View, FlatList, Button} from 'react-native';
import { getData } from './api/getmeteo';
import temp from "./api/data";

//lettre en BAUHAUS 93

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this._meteo = []
    }

    componentDidMount() {
        this._loadData();
    }
    
    _loadData(){
        getData().then(data => {
            this._meteo = data;
            console.log(this._meteo);
        });
    }

    render() {
        return (
                <View style={styles.main_container}>
                    <Button style={{height: 250 , width:220}} title='Rechercher' onPress={() => this._loadData()}/>
                
                    <FlatList
                        data={this._meteo}
                        renderItem={({item}) => <Text>{item.cnt}</Text>}
                        />
                </View>
                    );
                }
            }

            const styles = StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#faf',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            });
