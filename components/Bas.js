import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

class Bas extends React.Component{
render(){
var cote_image = 50; //longueur du téléphone / X
return(
<Image
    style={{width: 50, height: 50}}
    source={require('../assets/bas.png')}
    />
)}
}
export default Bas