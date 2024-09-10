import React from 'react';
import { Container, Title, Content, Value, Icon, BannerTypes } from './styles';

interface BannerProps {
    title: string, 
    type: BannerTypes,
    value: string,
}

export function Banner({title, type, value} : BannerProps){
    return (
        <Container type={type}>
            <Title>{title}</Title>

            <Content>
                <Icon type={type}/>
                <Value>{value}</Value>
            </Content>
        </Container>
    )
}