import Navbar from './Navbar';
import React from 'react';
import {Box, Button, Center, UnorderedList, ListItem} from "@chakra-ui/react";
import {init_token, getPlaylists, getUser} from './back.js'

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
                    <Button bg="#1DB954" textColor="white" onClick={()=>this.setPlaylistsState()}>
                        Get list playlists
                    </Button>
                    {this.state.playlists &&
                        <UnorderedList>
                            {this.state.playlists.items.map((item)=><ListItem key={item.id}>{item.name}</ListItem>)}
                        </UnorderedList>
                    }

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