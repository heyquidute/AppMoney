import React from 'react';
import { Container, Title, Logo, HeaderType, ScreenName} from './styles';

interface HeaderProps {
    isHome: boolean, 
    screenName: string,
    type: HeaderType["type"],
}

export function Header({isHome, screenName, type} : HeaderProps){
    return (
        <>
            {
                isHome ? (
                    <Container type={type}>
                        <Logo />
                        <Title>{screenName}</Title>
                    </Container>
                ) : (
                    <Container type={type}>
                        <ScreenName>{screenName}</ScreenName>
                    </Container>
                )
            }
        </>
        
    )
}