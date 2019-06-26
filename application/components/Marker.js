import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'


const Marker = ({onPress, top, left, name}) => (
    <TouchableOpacity onPress={onPress}>
    <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: 'red', position: 'absolute', top, left}}/>
    <Text style={{position: 'absolute', top, left}}>
    {name}
    </Text>
    </TouchableOpacity>
)

export default Marker