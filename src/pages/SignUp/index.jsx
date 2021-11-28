import { useState } from "react";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import styled from "styled-components";

import logo from "../../img/myWallet.png";

import { registerUser } from "../../service/service.auth.js";

import AuthButton from "../shared/AuthButton";
import AuthInput from "../shared/AuthInput";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    const register = (event) => {
        event.preventDefault();

        if (!email || !name || !password || !confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos'
            })
        }


        if (name.length < 3) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nome deve conter no mínimo 3 letras'
            })
        }


        if (password !== confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Senhas não correspondentes'
            })
        }

        registerUser(name, email, password)
            .then(() => {
                history.push("/");
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso',
                    showConfirmButton: false,
                    timer: 900,
                    width: 250
                });
            })
            .catch(() => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado com o cadastro'
                })
            });
    };

    return (
        <Background>
            <Wrapper onSubmit={register}>
                <Logo src={logo} />
                <AuthInput
                    type="text"
                    placeholder="Nome"
                    setValue={setName}
                    value={name}
                />
                <AuthInput
                    type="email"
                    placeholder="E-mail"
                    setValue={setEmail}
                    value={email}
                />
                <AuthInput
                    type="password"
                    placeholder="Senha"
                    setValue={setPassword}
                    value={password}
                />
                <AuthInput
                    type="password"
                    placeholder="Confirme a senha"
                    setValue={setConfirmPassword}
                    value={confirmPassword}
                />
                <AuthButton type="submit" title="Cadastrar" />
                <SignInPath onClick={() => history.push("/")}>
                    Já tem uma conta? Entre agora!
                </SignInPath>
            </Wrapper>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #8c11be;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 147px;
    height: 40px;
    margin-bottom: 24px;
`;

const Wrapper = styled.form`
    width: 87%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SignInPath = styled.button`
    width: auto;
    height: 18px;
    background-color: inherit;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border: none;
`;
