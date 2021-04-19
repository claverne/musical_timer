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
        <Box width="25%" height="100%" pt="5rem"
             bgGradient="linear(to-l,rgba(24,15,3,0.3),rgba(24,15,3,0.6))"
        >
            <VStack  width="80%">
                <Text
                    pb="1rem" pt="2rem" pl="1rem" width="100%"
                    color="White"
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
                        radio.onChange=(eventOrValue)=>props.onChange(eventOrValue.target.value);;
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