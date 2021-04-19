import React from 'react';
import {Box, NumberInputField} from "@chakra-ui/react";

export class NumberInputFieldTimer extends React.Component {
    render(){
        return(
            <NumberInputField
                height="8rem"
                width="6rem"
                m="1rem"
                textAlign="center"
                fontWeight="bold"
                fontSize="6em"
                color="white"
                textShadow="3px 3px 8px rgba(0,0,0,0.3)"

                bg="rgba(255,255,255,0.08)"
                borderWidth="0"
                shadow="6px 6px 8px rgba(0,0,0,0.2), inset 2px 2px 15px rgba(255,255,255,0.08)"


                _focus={{
                    shadow: "8px 8px 6px rgba(255,255,255,0.01), inset 6px 6px 8px rgba(0,0,0,0.35)",
                }}
                _active={{
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: "bold",
                    bgGradient:"linear(to-t,rgba(29,185,84,0),rgba(29,185,84,0))",
                }}
            />
        );
    };

}