import { useState } from "react";
import { useHistory } from "react-router-dom";

import Swal from 'sweetalert2';
import styled from "styled-components";

import logo from "../../img/myWallet.png";
import AuthButton from '../shared/AuthButton';
import AuthInput from "../shared/AuthInput";

import { loginUser } from "../../service/service.auth.js";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const login = (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !password) {
            setLoading(false);
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos'
            })
        }

        loginUser(email, password)
            .then((res) => {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                setLoading(false);
                history.push("/wallet");
            })
            .catch(() => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado no login'
                })
                return;
            });
    };

    return (
        <Background>
            <Wrapper onSubmit={login}>
                <Logo src={logo} />
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
                <AuthButton title='Entrar' loading={loading} />
                <SignUpPath onClick={() => history.push("/signup")}>
                    Primeira vez? Cadastre-se!
                </SignUpPath>
            </Wrapper>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to bottom, #8c11be, #2F0640);
    display: flex;
    justify-content: center;
    align-items: center;
       @keyframes moveInRight {
        0%{
            opacity: 0;
            transform: translateX(300px);
            }

        100%{
            opacity: 1;
            transform: translate(0);
            }
        }
        animation: moveInRight .4s;
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

const SignUpPath = styled.button`
    width: auto;
    height: 18px;
    background-color: inherit;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border: none;
`;
