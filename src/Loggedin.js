import Navbar from './Navbar';
import React from 'react';
import {Box, Center, NumberInput, Text} from "@chakra-ui/react";
import {init_token, getPlaylists, getUser} from './back.js'
import {NumberInputFieldTimer} from './NumberInputFieldTimer.js'

let Cookie = require('js-cookie');

export class Loggedin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            playlists: null
        };
    }
    render() {
        return (
            <Box bgGradient="linear(to-bl, #7597c3, #a4699f, #180f17)" minH={"100vh"}>
                <Navbar user={this.state.user ? this.state.user : null}/>
                <Center height="70vh">
                    <NumberInput defaultValue={0} min={0} max={5} focusBorderColor="#1DB954">
                      <NumberInputFieldTimer/>
                    </NumberInput>
                    <NumberInput
                        defaultValue={0} min={0} max={9} focusBorderColor="#1DB954">
                      <NumberInputFieldTimer/>
                    </NumberInput>
                    <Text fontSize="6rem" color="White">:</Text>
                    <NumberInput defaultValue={0} min={0} max={5} focusBorderColor="#1DB954">
                      <NumberInputFieldTimer/>
                    </NumberInput>
                    <NumberInput defaultValue={0} min={0} max={9} focusBorderColor="#1DB954">
                      <NumberInputFieldTimer/>
                    </NumberInput>

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

    setPlaylistsState() {
        getPlaylists().then(playlists => this.setState({
            playlists,
        }));
    }
}