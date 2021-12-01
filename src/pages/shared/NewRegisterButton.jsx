import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AddCircleOutline } from "react-ionicons";
import { RemoveCircleOutline } from "react-ionicons";

export default function NewRegisterButton({ type }) {
    const history = useHistory();
    const nextPage = type === 'entry' ? '/new-entry' : '/new-exit';
    const buttonTitle = type === 'entry' ? 'Nova entrada' : 'Nova saída';
    return (
        <MainButton onClick={() => history.push(`${nextPage}`)}>
            {type === 'entry'
                ? <AddCircleOutline
                    color={"#ffffff"}
                    height="22px"
                    width="22px"
                />
                : <RemoveCircleOutline
                    color={"#ffffff"}
                    height="23px"
                    width="23px"
                />
            }

            <ButtonTitle>{buttonTitle}</ButtonTitle>
        </MainButton>
    );
};

const MainButton = styled.button`
    width: 41vw;
    max-width: 250px;
    height: 100%;
    border-radius: 5px;
    background-color: #680D8C;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
`;

const ButtonTitle = styled.span`
    width: 64px;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    background-color: inherit;
    color: white;
    font-size: 17px;
    font-weight: 700;
    text-align: left;
`;