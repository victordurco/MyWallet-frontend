import React from 'react';
import styled from 'styled-components';

const AuthInput = ({ type, placeholder, value, setValue }) => {
    return (
        <Input
            type={type}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            autocomplete={type === 'password' ? 'on' : 'off'}
        />
    );
};

export default AuthInput;

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