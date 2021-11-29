import { React } from "react";
import styled from "styled-components";

import { TrashOutline } from 'react-ionicons';
import { CreateOutline } from 'react-ionicons'

export default function Register({ description, date, type, valueInCents }) {

    const convertValue = (value) => {
        const decValue = (value / 100).toFixed(2);
        return decValue.toString().replace(".", ",");
    };


    const valueInReal = convertValue(valueInCents);


    return (
        <RegisterContainer>
            <Info>
                <span>
                    <Date>{date}</Date>
                    <Description>{description}</Description>
                </span>
                <Value type={type}>{valueInReal}</Value>
            </Info>
            <Options >
                <EditButton
                    color={'#008031'}
                    height="17px"
                    width="17px"
                />
                <TrashButton
                    color={'#b30000'}
                    height="16px"
                    width="16px"
                />
            </Options>
        </RegisterContainer>
    );
}

const RegisterContainer = styled.div`
    width: 100%;
    height: fit-content;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    margin: 0 0 15px 0;
    transition: all 400ms ease-out;
    position: relative;
    top: 0;
    left: 0;
    :hover{
        background-color: #a54fca44
    }
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

const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Options = styled.div`
    margin-top: 4px;
    overflow: hidden;
    height: 0px;
    transition: 450ms ease-out;
    ${RegisterContainer}:hover & {
        height: fit-content;
    }
`;

const TrashButton = styled(TrashOutline)`
    cursor: pointer;
    :hover {
    transform: scale(1.1);
}
`;

const EditButton = styled(CreateOutline)`
    cursor: pointer;
    margin-right: 15px;
    :hover {
    transform: scale(1.1);
}
`;