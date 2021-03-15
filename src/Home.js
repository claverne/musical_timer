import {login} from './back.js';
import {Layout} from "./Layout";
import React from 'react';
import { Box, Center, Button} from "@chakra-ui/react";

export function Home() {
    return(
        <Layout>
            <Button bg="#1DB954" textColor="white" onClick={()=>login()}>
                Click to start
            </Button>
        </Layout>
    );
}