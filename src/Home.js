import {login} from './back.js'
import Navebar from './Navbar';
import React from 'react';
import { Box, Center, Button} from "@chakra-ui/react";

export function Home() {
    return(
        <Box bgGradient="linear(to-bl, #7597c3, #a4699f, #180f17)" minH={"100vh"}>
            <Navebar/>
            <Center height="70vh">
                <Button bg="#1DB954" textColor="white" onClick={()=>login()}>
                    Click to start
                </Button>
            </Center>
        </Box>
    );
}