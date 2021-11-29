import React from 'react';
import styled from 'styled-components';
import CurrencyInput from 'react-currency-input-field';

export default function RegisterInput({ type, placeholder, value, setValue }) {
    return (
        <>
            {type === 'currency'
                ? <ValueInput
                    placeholder={placeholder}
                    decimalsLimit={2}
                    allowNegativeValue={false}
                    decimalSeparator=','
                    value={value}
                    onValueChange={(value, name) => setValue(name)}
                    onBlur={(e) => {
                        if (!e.target.value.includes(',')) {
                            setValue(e.target.value + ',00');
                        } else {
                            setValue(e.target.value);
                        }
                    }}
                    disableGroupSeparators={true}
                />
                : <TextInput
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
            }
        </>

    );
};

const ValueInput = styled(CurrencyInput)`
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

const TextInput = styled.input`
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