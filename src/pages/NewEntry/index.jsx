import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from 'sweetalert2';
import { CloseCircleOutline } from 'react-ionicons';

import { postNewRegister } from "../../service/service.registers";

import AddRegisterButton from '../shared/AddRegisterButton';
import RegisterInput from '../shared/RegisterInput';

export default function NewEntry() {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const valueRegex = /^[\d,.?!]+$/;

    if (localStorage.getItem('userInfo') === null) history.push('/');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { token } = userInfo ? userInfo : {};


    const saveEntry = (event) => {
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
            type: 1 //type id for "entry"
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
                Nova Entrada
                <CloseCircleOutline
                    color={'#ffffff'}
                    height="32px"
                    width="32px"
                    onClick={backToWallet}
                />
            </Header>
            <Wrapper onSubmit={saveEntry}>
                <RegisterInput
                    type='currency'
                    placeholder="Valor"
                    setValue={setAmount}
                    value={amount}
                />
                <RegisterInput
                    type="text"
                    placeholder="Descrição"
                    setValue={setDescription}
                    value={description}
                />
                <AddRegisterButton title="Salvar entrada" loading={loading} />
            </Wrapper>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to bottom, #8c11be, #2F0640);
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
