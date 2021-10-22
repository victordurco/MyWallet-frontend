import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../img/myWallet.png";
import { loginUser } from "../../service/service.auth.js";
import UserContext from "../../contexts/UserContext";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { setUserInfo } = useContext(UserContext);

    const login = (event) => {
        event.preventDefault();

        if (!email) return;
        if (!password) return;

        loginUser(email, password)
            .then((res) => {
                setUserInfo(res.data);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                history.push("/wallet");
            })
            .catch(() => {
                alert("Deu ruim");
                return;
            });
    };

    return (
        <Background>
            <Wrapper onSubmit={login}>
                <Logo src={logo} />
                <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Button type="submit">Entrar</Button>
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

const SignUpPath = styled.button`
    width: auto;
    height: 18px;
    background-color: inherit;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border: none;
`;
