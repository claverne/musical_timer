import React from "react";
import {Text, VStack, Box} from "@chakra-ui/react";

export function Summary(props) {
    const max_dur = props.duration;

    const m10 = Math.floor(Math.floor(max_dur/60)/10);
    const m01 = Math.floor(max_dur/60)%10;

    const s10 = Math.floor((max_dur%60)/10);
    const s01 = (max_dur%60)%10;

    return (
        <Box width="20%" height="100%" pt="5rem"
             bgGradient="linear(to-l,rgba(22, 20, 31,0.4),rgba(22, 20, 31,0.2))"
        >
            <VStack  width="80%">
                <Text
                    pt="2rem" pl="1rem" width="100%"
                    color="#ffe680"
                    fontWeight="bold"
                    fontSize="1.5em"
                    textAlign="left"
                    textShadow="3px 3px 3px rgba(0,0,0,1)"
                >
                    Confirmation
                </Text>
                <Text
                    pt="1rem" pl="1rem" width="100%"
                    color="rgba(255,255,255,0.5)"
                    textAlign="left"
                >
                    Style of music
                </Text>
                <Text
                    pb="1rem" pl="1rem" width="100%"
                    color="white"
                >
                    {props.style}
                </Text>
                <Text
                    pt="1rem" pl="1rem" width="100%"
                    color="rgba(255,255,255,0.5)"
                    textAlign="left"
                >
                    Duration
                </Text>
                <Text
                    pb="1rem" pl="1rem" width="100%"
                    color="white"
                >
                    {m10}{m01}'{s10}{s01}''
                </Text>
            </VStack>

        </Box>
    );
}