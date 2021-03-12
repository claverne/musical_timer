import React from 'react';
import {Box, Center, NumberInput, Text, VStack, HStack, Button} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {init_token, getTimerPlaylist, getUser} from './back.js'
import Navbar from './Navbar';
import {TimerInput} from "./TimerInput";

let Cookie = require('js-cookie');

export class Loggedin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            max_dur: 600,
        };
    }

    render() {
        return (
            <Box bgGradient="linear(to-bl, #7597c3, #a4699f, #180f17)" minH={"100vh"}>
                <Navbar user={this.state.user ? this.state.user : null}/>
                <Center height="70vh">
                    <VStack spacing="3rem">
                        <TimerInput onChange={(max_dur)=> this.setState({max_dur})} max_dur={this.state.max_dur}/>
                        <Button
                            bg="#1DB954" color="white"
                            onClick={()=>this.handleStartClick()}
                        >
                            Create my timer playlist !
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



    handleStartClick() {
        console.log(this.state.max_dur);
        getTimerPlaylist(this.state.max_dur);

    }
}