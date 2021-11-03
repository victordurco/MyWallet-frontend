import { React } from "react";
import styled from "styled-components";

export default function Register({ description, date, type, valueInCents }) {

    const convertValue = (value) => {
        const decValue = (value / 100).toFixed(2);
        return decValue.toString().replace(".", ",");
    };


    const valueInReal = convertValue(valueInCents);


    return (
        <RegisterContainer>
            <span>
                <Date>{date}</Date>
                <Description>{description}</Description>
            </span>
            <Value type={type}>{valueInReal}</Value>
        </RegisterContainer>
    );
}

const RegisterContainer = styled.div`
    width: 100%;
    height: 18px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    margin: 12px 0;
`;

const Date = styled.span`
    color: #a0a0a0;
    margin-right: 15px;
`;

const Description = styled.span`
    color: black;
`;

const Value = styled.span`
    color: ${(props) => (props.type === "entry" ? "green" : "red")};
`;
