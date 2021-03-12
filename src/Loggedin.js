import Navbar from './Navbar';
import React from 'react';
import {Box, Center, NumberInput, Text, VStack, HStack, Button} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import {init_token, getTimerPlaylist, getUser} from './back.js'
import {NumberInputFieldTimer} from './NumberInputFieldTimer.js'

let Cookie = require('js-cookie');

export class Loggedin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            h10_value: 1,
            h01_value: 0,
            m10_value: 0,
            m01_value: 0,
        };
    }

    render() {
        return (
            <Box bgGradient="linear(to-bl, #7597c3, #a4699f, #180f17)" minH={"100vh"}>
                <Navbar user={this.state.user ? this.state.user : null}/>
                <Center height="70vh">
                    <VStack spacing="3rem">
                        <HStack>
                            <NumberInput
                                defaultValue={1} min={0} max={5} focusBorderColor="#1DB954"
                                value={this.state.h10_value}
                                onChange={(string, number)=>this.handleInputChange("h10_value", string, number)}
                            >
                              <NumberInputFieldTimer/>
                            </NumberInput>
                            <NumberInput
                                defaultValue={0} min={0} max={9} focusBorderColor="#1DB954"
                                value={this.state.h01_value}
                                onChange={(string, number)=>this.handleInputChange("h01_value", string, number)}
                            >
                              <NumberInputFieldTimer/>
                            </NumberInput>
                            <Text fontSize="6rem" color="White">:</Text>
                            <NumberInput
                                defaultValue={0} min={0} max={5} focusBorderColor="#1DB954"
                                value={this.state.m10_value}
                                onChange={(string, number)=>this.handleInputChange("m10_value", string, number)}
                            >
                              <NumberInputFieldTimer/>
                            </NumberInput>
                            <NumberInput
                                defaultValue={0} min={0} max={9} focusBorderColor="#1DB954"
                                value={this.state.m01_value}
                                onChange={(string, number)=>this.handleInputChange("m01_value", string, number)}
                            >
                              <NumberInputFieldTimer/>
                            </NumberInput>
                        </HStack>
                        <Button
                            w="5rem" h="5rem" borderRadius="full" bg="#1DB954" color="white"
                            onClick={()=>this.handleStartClick()}
                        >
                            <FontAwesomeIcon icon={faPlay}/>
                        </Button>
                    </VStack>
                </Center>
            </Box>
        );
    }

    componentDidMount() {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let access_token = urlParams.get('access_token');
        let refresh_token = urlParams.get('refresh_token');
        if(access_token || refresh_token) {
            Cookie.set('access_token', access_token);
            Cookie.set('refresh_token', refresh_token);
        }
        init_token();
        window.history.replaceState(null, '', 'loggedin');
        getUser().then(user => this.setState({
            user: user,
        }));
    }

    handleInputChange(name, string, number) {
        this.setState({
          [name]: number
        });
    }

    handleStartClick() {
        const h10 = this.state.h10_value;
        const h01 = this.state.h01_value;
        const m10 = this.state.m10_value;
        const m01 = this.state.m01_value;

        const max_dur = (h10*10 + h01) * 60 + (m10*10 + m01);

        console.log(max_dur);
        getTimerPlaylist(max_dur);

    }
}