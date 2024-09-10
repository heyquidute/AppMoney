import React from 'react';
import { Container, Title, Icon } from './styles';

interface CategorySelectButtonProps {
    title: string, 
    onPress: () => void,
}

export function CategorySelectButton({title, onPress} : CategorySelectButtonProps){
    return (
        <Container onPress={onPress}>
            <Title>{title}</Title>
            <Icon/>
        </Container>
    )
}