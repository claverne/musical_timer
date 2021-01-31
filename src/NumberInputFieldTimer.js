import React from 'react';
import {NumberInputField} from "@chakra-ui/react";

export class NumberInputFieldTimer extends React.Component {
    render(){
        return(
            <NumberInputField
                height="8rem"
                width="6rem"
                m="1rem"
                textAlign="center"
                fontWeight="bold"
                fontSize="6rem"
                bg="rgba(255,255,255,0.3)"
            />
        );
    };

}