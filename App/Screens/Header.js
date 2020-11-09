import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {View, Text} from 'react-native'


export default Header = (props) => {
  return (
    <Appbar.Header
    theme={{
        colors:{
            primary:"#00aaff",
        }
    }}
    style={{flexDirection:"row"}}
    >
      <Title style={{color:"yellow"}}>
        {props.name}
      </Title>
          
    </Appbar.Header>
  );
}