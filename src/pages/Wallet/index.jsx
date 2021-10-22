import { React, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ExitOutline } from "react-ionicons";
import { AddCircleOutline } from "react-ionicons";
import { RemoveCircleOutline } from "react-ionicons";
import UserContext from "../../contexts/UserContext";
import Register from "./Register";

export default function Wallet() {
    const history = useHistory();
    const [total, setTotal] = useState('2502,65');
    const [registers, setRegisters] = useState([
        {
            id: 1,
            description: "Compra do mes",
            type: "exit",
            date: "20/06",
            valueInCents: "20000",
        },
        {
            id: 1,
            description: "Compra do mes",
            type: "exit",
            date: "20/06",
            valueInCents: "20000",
        },
        {
            id: 1,
            description: "Compra do mes",
            type: "entry",
            date: "20/06",
            valueInCents: "20000",
        },
    ]);
    const {
        userInfo: { token, name },
    } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    return (
        <Background>
            <Header>
                <UserTitle>Olá, {name}</UserTitle>
                <ExitButton onClick={logout}>
                    <ExitOutline color={"#ffffff"} height="26px" width="26px" />
                </ExitButton>
            </Header>
            <RegistersContainer registers={registers.length}>
                {!registers.length ?
                    <EmptyRegistersText>
                        Não há registros de entrada ou saída
                    </EmptyRegistersText>
                    :
                    registers.map((register) =>
                        <Register
                            description={register.description}
                            type={register.type}
                            date={register.date}
                            valueInCents={register.valueInCents}
                        />
                    )
                }
                <Total>
                    <TotalTitle>
                        SALDO
                    </TotalTitle>
                    <TotalValue>
                        {total}
                    </TotalValue>
                </Total>
            </RegistersContainer>
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
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0;
    left: 0;
    align-items: ${(props) => (props.registers > 0 ? "flex-start" : "initial")};
    padding-top: 18px;
`;

const Footer = styled.footer`
    width: 100%;
    max-width: 600px;
    height: 114px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const MainButton = styled.button`
    width: 41vw;
    max-width: 250px;
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

const EmptyRegistersText = styled.span`
    font-size: 20px;
    color: #868686;
    font-weight: 400;
    text-align: center;
    width: 180px;
    height: 46px;
    margin: auto auto;
    display: flex;
    flex-wrap: wrap;
`;

const Total = styled.div`
    width: 100%;
    height: 20px;
    font-size: 17px;
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    position: absolute;
    bottom: 10px;
    left: 0;
`;

const TotalTitle = styled.span`
    font-weight: 700;
    color: black;
`;

const TotalValue = styled.span`
    font-weight: 400;
    color: green;
`;