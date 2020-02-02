import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex: 1;
    background-color: #efefef;
    justify-content: center;
    align-items: center;
`

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const CheckLogin = ({navigation}: Props) => {
    AsyncStorage.getItem('key')
    .then(value=>{
        if(value){
            //navigation.navigate('MainTabNavigator'); //메인 탭으로 이동 
            navigation.navigate('LoginNavigator'); 
        
        }else{
            navigation.navigate('LoginNavigator'); //로그인으로 이동
        }
        
    })
    .catch((error: Error)=>{
        console.log(error);
    })

    return <Container />
}

CheckLogin.navigationOptions =  {
    header: null,
}

export default CheckLogin;
