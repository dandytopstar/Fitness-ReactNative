import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {Header,Title,Button,Icon,Right,Body,Left} from "native-base";


const HeaderPicker = ({onPress, title}) => (
    <Header style={{ backgroundColor: "#f39c12" }}>
                  <Left>
                    <Button transparent onPress={onPress}>
                      <Icon name="arrow-back" style={{ color: "#fff" }} />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#fff", fontSize: 20 }}>{title}</Title>
                  </Body>
                  <Right />
                </Header>
)

export default HeaderPicker