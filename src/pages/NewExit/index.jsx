import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { postNewRegister } from "../../service/service.registers";
import { CloseCircleOutline } from 'react-ionicons';
import Swal from 'sweetalert2';
import AddRegisterButton from '../shared/AddRegisterButton';

export default function NewExit() {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const valueRegex = /^[\d,.?!]+$/;

    if (localStorage.getItem('userInfo') === null) history.push('/');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { token } = userInfo ? userInfo : {};

    const saveExit = (event) => {
        event.preventDefault();
        setLoading(true);

        if (!amount || !description) {
            setLoading(false);
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos'
            })
        }

        if (!valueRegex.test(amount)) {
            setLoading(false);
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha os campos corretamente'
            })
        }

        const body = {
            value: amount,
            description: description,
            type: 2 //type id for "exit"
        };

        postNewRegister(token, body)
            .then(() => {
                setLoading(false);
                history.push("/wallet");
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Seu saldo foi atualizado',
                    showConfirmButton: false,
                    timer: 900,
                    width: 250
                });
            })
            .catch(() => {
                setLoading(false);
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
                <AddRegisterButton loading={loading} title="Salvar saída" />
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
     @keyframes moveInUp {
        0%{
            opacity: 0;
            transform: translateY(300px);
            }

        100%{
            opacity: 1;
            transform: translate(0);
            }
        }
        animation: moveInUp .4s;
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

