import React from "react";
import {Text, Center, VStack, Box, useRadioGroup} from "@chakra-ui/react";

import {RadioCard} from './RadioCard';

export function ListStyles() {
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
            <VStack  width="90%">
                <Text
                    p="1em" width="100%"
                    color="White"
                    borderBottomWidth="1px"
                    fontWeight="bold"
                >
                    Choose your style of music
                </Text>

                <VStack {...group} width="100%">
                    {options.map((value) => {
                        const radio = getRadioProps({ value })
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