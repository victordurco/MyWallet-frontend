import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { postNewRegister } from "../../service/service.registers";
import UserContext from "../../contexts/UserContext";
import { CloseCircleOutline } from 'react-ionicons';

export default function NewExit() {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const valueRegex = /^[\d,.?!]+$/;
    const {
        userInfo: { token, name }
    } = useContext(UserContext);

    const saveExit = (event) => {
        event.preventDefault();

        if (!amount || !valueRegex.test(amount)) return alert('Preencha os campos corretamente');

        const body = {
            value: amount,
            description: description,
            type: 2 //type id for "exit"
        };

        postNewRegister(token, body)
            .then(() => {
                history.push("/wallet");
            })
            .catch(() => {
                alert('Erro ao enviar dados');
                history.push("/wallet");
            });
    };

    const backToWallet = () => {
        history.push("/wallet");
    }


    return (
        <Background>
            <Header>
                Nova Saída
                <CloseCircleOutline
                    color={'#ffffff'}
                    height="32px"
                    width="32px"
                    onClick={backToWallet}
                />
            </Header>
            <Wrapper onSubmit={saveExit}>
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
                <Button type="submit">Salvar saída</Button>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
