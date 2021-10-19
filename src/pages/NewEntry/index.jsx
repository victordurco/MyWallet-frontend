import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function NewEntry() {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    const saveEntry = (event) => {
        event.preventDefault();
        history.push("/wallet");
    };

    return (
        <Background>
            <Header>Nova Entrada</Header>
            <Wrapper onSubmit={saveEntry}>
                <Input
                    type="text"
                    placeholder="Valor"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    inputProps={{ inputMode: "numeric" }}
                />
                <Input
                    type="text"
                    placeholder="Descrição"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <Button type="submit">Salvar entrada</Button>
            </Wrapper>
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
    padding: 25px;
`;

const Header = styled.header`
    width: 87%;
    height: 31px;
    background-color: inherit;
    color: white;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 40px;
`;

const Wrapper = styled.form`
    width: 87%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    height: 58px;
    border: none;
    border-radius: 5px;
    margin-bottom: 13px;
    padding: 17px 15px 17px 15px;
    font-size: 20px;

    ::placeholder {
        font-family: "Raleway", sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: black;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 46px;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    color: white;
    font-weight: 700;
    font-size: 20px;
    font-family: "Raleway", sans-serif;
    margin-bottom: 36px;
`;
