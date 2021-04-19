import {login} from './back.js';
import {Layout} from "./Layout";
import React from 'react';
import { Box, Center, Button} from "@chakra-ui/react";

export function Home() {
    return(
        <Layout>
            <Button
                bg="#63A088"
                shadow="inset -3px -3px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.3)"
                textColor="white"
                onClick={()=>login()}
            >
                Click to start
            </Button>
        </Layout>
    );
}