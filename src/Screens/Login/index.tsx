import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState  } from 'react-navigation'
import Styled from 'styled-components/native'

import Input from '~/Components/Input'
import Button from '~/Components/Button'

const Container = Styled.SafeAreaView`
    flex:1;
    background-color: #feffff;
`

const FormContainer = Styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 32px;
`

const Logo = Styled.Text`
    color: #292929;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
`

const PasswordReset = Styled.Text`
    width: 100%;
    color: #3796ef;
    text-align: right;
    margin-bottom: 24px;
`

const SignupText = Styled.Text`
    color: #929292;
    text-align: center;

`

const SignupLink = Styled.Text`
    color: #3796ef;
`

const Footer = Styled.View`
    width: 100%;
    border-top-width: 1px;
    border-color: #d3d3d3;
    padding: 8px;
`

const Copyright = Styled.Text`
    color: #929292;
    text-align: center;
`

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const Login = ({navigation}: Props) => {
    return(
        <Container>
            <FormContainer>
                <Logo>SNS App</Logo>
                <Input style={{marginBottom: 16}} placeholder="email"/>
                <Input style={{marginBottom: 16}} 
                    placeholder="password"
                    secureTextEntry={true}
                />
                <PasswordReset onPress={()=>navigation.navigate('PasswordReset')}>
                    비밀번호 재설정
                </PasswordReset>
                <Button label = "LOGIN"
                        style={{marginBottom:24}}
                        onPress={()=>{
                        AsyncStorage.setItem('key', 'JWT_TEY');
                        navigation.navigate('MainNavigator');
                    }}
                />
                <SignupText>
                    계정이 없는가요?{''}
                    <SignupLink onPress={()=> navigation.navigate('Signup')}>
                        가입하기
                    </SignupLink>
                </SignupText>
            </FormContainer>
            <Footer>
                <Copyright>SNSApp from dev-sumin</Copyright>
            </Footer>
        </Container>
    )
}

Login.navigatorOptions={
    header: null,
}

export default Login;