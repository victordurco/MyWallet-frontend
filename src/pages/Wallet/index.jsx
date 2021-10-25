import { React, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ExitOutline } from "react-ionicons";
import { AddCircleOutline } from "react-ionicons";
import { RemoveCircleOutline } from "react-ionicons";
import Register from "./Register";
import { getUserRegisters } from "../../service/service.registers";
import dayjs from "dayjs";

export default function Wallet() {
    const history = useHistory();
    const [total, setTotal] = useState({
        value: '0,00',
        signal: 'positive'
    });
    const [registers, setRegisters] = useState([]);
    const registersEndRef = useRef(null)

    if (localStorage.getItem('userInfo') === null) history.push('/');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { name, token } = userInfo ? userInfo : {};

    const logout = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    const formatRegisters = (registers) => {
        const formatedRegisters = [];
        registers.forEach(r => {
            const formated = {
                id: r.id,
                description: r.description,
                type: r.typeName,
                date: dayjs(r.date).format('DD/MM'),
                valueInCents: r.value
            };
            formatedRegisters.push(formated);
        });
        return formatedRegisters;
    };

    const loadUserRegisters = () => {
        getUserRegisters(token)
            .then((res) => {
                setRegisters(formatRegisters(res.data));
            })
            .catch(() => {
                alert('Não foi possível carregar seus registros');
            })
    };

    const calculateTotal = () => {
        let total = 0;
        registers.forEach((r) => {
            if (r.type === "entry")
                total += r.valueInCents;
            if (r.type === "exit")
                total -= r.valueInCents;
        });
        total = (total / 100).toFixed(2);
        if (total < 0) {
            total = total.toString().replace(".", ",").replace("-", "");
            setTotal({ value: total, signal: 'negative' });
        } else {
            total = total.toString().replace(".", ",");
            setTotal({ value: total, signal: 'positive' });
        }

    };

    const scrollToBottom = () => {
        registersEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        loadUserRegisters();
    }, [token]);

    useEffect(() => {
        calculateTotal();
        scrollToBottom()
    }, [registers])

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
                <div ref={registersEndRef} />
            </RegistersContainer>
            {!registers.length ?
                <></>
                :
                <Total>
                    <TotalTitle>
                        SALDO
                    </TotalTitle>
                    <TotalValue signal={total.signal}>
                        {total.value}
                    </TotalValue>
                </Total>
            }
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
    height: ${props => props.registers > 0 ? '70%' : '75%'};
    margin-bottom: ${props => props.registers > 0 ? '0' : '13px'};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: ${props => props.registers > 0 ? '0' : '5px'};
    border-bottom-right-radius: ${props => props.registers > 0 ? '0' : '5px'};
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0;
    left: 0;
    align-items: ${(props) => (props.registers > 0 ? "flex-start" : "initial")};
    padding-top: 18px;
    overflow-y: scroll;
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
    max-width: 600px;
    height: 25px;
    font-size: 17px;
    display: flex;
    justify-content: space-between;
    padding: 0 12px 20px 12px;
    margin-bottom: 13px;
    background-color: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
`;

const TotalTitle = styled.span`
    font-weight: 700;
    color: black;
    margin-top: 5px;
`;

const TotalValue = styled.span`
    font-weight: 400;
    color: ${props => props.signal === 'positive' ? 'green' : 'red'};
    margin-top: 3px;
`;