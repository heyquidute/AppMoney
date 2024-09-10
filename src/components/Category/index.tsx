import React from "react";
import { Container, Content, ColorContainer, Title, Value } from './styles'

interface CategoryProps{
    title: string;
    color: string;
    value: string;
}

export function Category({title, color, value}: CategoryProps){
    return (
        <Container>
            <Content>
                <ColorContainer color={color} />
                <Title>{title}</Title>
            </Content>

            <Value>{value}</Value>
        </Container>
    )
}