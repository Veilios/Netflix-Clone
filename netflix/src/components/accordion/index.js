import React, { useState, useContext, createContext } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles/accordian';

const ToggleContext = createContext();

export default function Accordian({ children, ...restProps }) {
    return (
        <Container {...restProps}>
            <Inner>{children}</Inner>
        </Container>
    );
};

Accordian.Title = function AccordianTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};

Accordian.Frame = function AccordianFrame({ children, ...restProps }) {
    return <Frame {...restProps}>{children}</Frame>;
};

Accordian.Item = function AccordianItem({ children, ...restProps }) {
    const [toggleShow, setToggleShow] = useState(false);

    return (
        <ToggleContext.Provider value={{ toggleShow, setToggleShow}}>
            <Item {...restProps}>{children}</Item>
        </ToggleContext.Provider>
    );
};

Accordian.Header = function AccordianHeader({ children, ...restProps }) {
    const { toggleShow, setToggleShow } = useContext(ToggleContext);
                                                // This is used instead of just !toggleShow because it sometimes can
                                                // be overridden if the page is handling to much state, but because of this vs code 
                                                // thinks toggleShow is assigned but never used
    return <Header onClick={() => setToggleShow((toggleShow) => !toggleShow)} {...restProps}>{children}</Header>;
};

Accordian.Body = function AccordianBody({ children, ...restProps }) {
    const { toggleShow } = useContext(ToggleContext);

    return toggleShow ? <Body {...restProps}>{children}</Body> : null;
};