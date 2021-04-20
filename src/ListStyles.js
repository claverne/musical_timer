import React from "react";
import {Text, Center, VStack, Box, useRadioGroup} from "@chakra-ui/react";

import {RadioCard} from './RadioCard';

export function ListStyles(props) {
    const options = ["From featured playlists", "From your playlists", "K-pop", "Rock", "Pop"];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "framework",
        defaultValue: "react",
        onChange: console.log,
    });

    const group = getRootProps();

    return (
        <Box width="20%" height="100%" pt="5rem"
             bgGradient="linear(to-l,rgba(22, 20, 31,0.2),rgba(22, 20, 31,0.4))"
        >
            <VStack  width="80%">
                <Text
                    pt="2rem" pl="1rem" width="100%"
                    color="#FCB0B3"
                    fontWeight="bold"
                    fontSize="1.5em"
                    textAlign="left"
                    textShadow="3px 3px 3px rgba(0,0,0,1)"
                >
                    Style of music
                </Text>
                <VStack {...group} width="100%">
                    {options.map((value) => {
                        let radio = getRadioProps({ value });
                        radio.onChange=(eventOrValue)=>props.onChange(eventOrValue.target.value);
                        if(value===props.styleMusic)
                            radio.isChecked=true;
                        return (
                        <RadioCard key={value} {...radio}>
                            {value}
                        </RadioCard>
                        )
                    })}
                </VStack>
            </VStack>

        </Box>
    );
}