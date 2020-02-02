import React from 'react';
import Styled from 'styled-components/native';

const StyledButton = Styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    background-color: #3795ef;
`

const Label = Styled.Text`
    color: #ffffff;
`

interface Props{
    label: string;
    style?: Object;
    color?: string;
    onPress?: () => void;
}

const Button = ({label, style, color, onPress}: Props)=>{
    return(
        <StyledButton style={style} onPress={onPress}>
            <Label style={{color:color? color:'#ffffff'}}>{label}</Label>
        </StyledButton>

    )
}

export default Button;