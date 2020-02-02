import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    width: 100%;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 4px;
    background-color: #fafafa;
    border-width: 1px;
    border-color: #d3d3d3;
`

const InputField = Styled.TextInput`
    flex: 1;
    color: #292929;
`

interface Props {
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    secureTextEntry?: boolean;
    style?: Object;
    clearMode?: boolean;
    onChangeText?: (text: string) => void;
}

const Input = ({ placeholder, keyboardType, secureTextEntry, style, clearMode, onChangeText}: Props) => {

    return(
        <Container>
            <InputField
                selectionColor="#292929"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType ? keyboardType : 'default'}
                autoCapitalize= "none"
                autoCorrect={false}
                allowFontScaling={false}
                placeholderTextColor="#c3c2c8"
                placeholder={placeholder}
                clearButtonMode={clearMode ? 'while-editing' : 'never'}
                onChangeText = {onChangeText}
            />
        </Container>
    )

}

export default Input