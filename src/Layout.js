import React from "react";
import Navbar from "./Navbar";
import {Box, Button, Center, VStack} from "@chakra-ui/react";
import {TimerInput} from "./TimerInput";

export class Layout extends React.Component {
    render() {
        return(
            <Box bgGradient="linear(to-bl, #404E7C, #260F26)" minH={"100vh"} align="center">
                <Box height="100vh" width="100vw" pos="relative"
                >
                    <Navbar user={this.props.user ? this.props.user : null}/>
                    <Center height="100%">
                        {this.props.children}
                    </Center>
                </Box>
            </Box>
        );
    }
}

//https://coolors.co/86cb92-71b48d-404e7c-251f47-260f26