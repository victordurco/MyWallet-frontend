import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ExitOutline } from "react-ionicons";
import { AddCircleOutline } from "react-ionicons";
import { RemoveCircleOutline } from "react-ionicons";

export default function Wallet() {
    const history = useHistory();
    return (
        <Background>
            <Header>
                <UserTitle>Olá, Victor</UserTitle>
                <ExitButton>
                    <ExitOutline color={"#ffffff"} height="26px" width="26px" />
                </ExitButton>
            </Header>
            <RegistersContainer></RegistersContainer>
            <Footer>
                <MainButton onClick={() => history.push("/new-entry")}>
                    <AddCircleOutline
                        color={"#ffffff"}
                        height="22px"
                        width="22px"
                    />
                    <ButtonTitle>Nova Entrada</ButtonTitle>
                </MainButton>
                <MainButton onClick={() => history.push("/new-exit")}>
                    <RemoveCircleOutline
                        color={"#ffffff"}
                        height="23px"
                        width="23px"
                    />
                    <ButtonTitle>Nova Saída</ButtonTitle>
                </MainButton>
            </Footer>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #8c11be;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 25px 16px 25px;
`;

const Header = styled.header`
    width: 100%;
    max-width: 600px;
    height: 31px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
`;

const UserTitle = styled.span`
    height: 100%;
    width: auto;
    font-size: 26px;
    font-weight: 700;
    background-color: inherit;
    color: white;
`;

const ExitButton = styled.button`
    width: 26px;
    height: 26px;
    background-color: inherit;
    border: none;
    cursor: pointer;
`;

const RegistersContainer = styled.div`
    background-color: white;
    width: 100%;
    max-width: 600px;
    height: 75%;
    border-radius: 5px;
    margin-bottom: 13px;
`;

const Footer = styled.footer`
    width: 100%;
    max-width: 400px;
    height: 114px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const MainButton = styled.button`
    width: 155px;
    height: 100%;
    border-radius: 5px;
    background-color: #a328d6;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
`;

const ButtonTitle = styled.span`
    width: 64px;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    background-color: inherit;
    color: white;
    font-size: 17px;
    font-weight: 700;
    text-align: left;
`;
