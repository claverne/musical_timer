import React from "react";
import Navbar from "./Navbar";
import {Box, Button, Center, VStack} from "@chakra-ui/react";
import {TimerInput} from "./TimerInput";

export class Layout extends React.Component {
    render() {
        return(
            <Box bgGradient="linear(to-bl, #7597c3, #a4699f, #180f17)" minH={"100vh"}>
                <Navbar user={this.props.user ? this.props.user : null}/>
                <Center height="70vh">
                    {this.props.children}
                </Center>
            </Box>
        );
    }
}