import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

class manteau extends React.Component{
render(){
var cote_image = 50; //longueur du téléphone / X
return(
<Image
    style={{width: 50, height: 50}}
    source={require('../assets/manteau.png')}
    />
)}
}
export default manteau