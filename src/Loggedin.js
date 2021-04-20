import React from 'react';
import {VStack, Button, Text, Box} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {init_token, getTimerPlaylist, getUser} from './back.js'
import {TimerInput} from "./TimerInput";
import {Layout} from "./Layout";
import {ListStyles} from "./ListStyles";
import {Summary} from "./Summary";

let Cookie = require('js-cookie');

export class Loggedin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            max_dur: 600,
            isLoading: false,
            playlistGenerated: false,
            styleMusic: "From featured playlists",
        };
    }

    render() {
        if(this.state.playlistGenerated){
            return(
                <Layout
                    user={this.state.user}
                >
                    <VStack spacing="3rem">
                        <Box>
                            <Text
                                width="100%"
                                color="white"
                                fontWeight="bold"
                                fontSize="1.5em"
                                textShadow="3px 3px 3px rgba(0,0,0,1)"
                            >
                                The musical timer has been created
                            </Text>
                            <Text
                                width="100%"
                                color="rgba(255,255,255,0.5)"
                                fontSize="1em"
                            >
                                You can check your spotify account
                            </Text>
                        </Box>
                        <Button
                            bg="#63A088"
                            color="white"
                            shadow="inset -3px -3px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.3)"
                            onClick={() => this.setState({playlistGenerated:false})}

                            _hover={{
                                bg: "#71a892"
                            }}
                        >
                            New timer
                        </Button>
                    </VStack>
                </Layout>
            );
        } else {
            return (
                <Layout
                    user={this.state.user}
                >
                    <ListStyles onChange={(styleMusic) => this.setState({styleMusic})} styleMusic={this.state.styleMusic}/>
                    <VStack spacing="3rem" width="60%" height="100%" pt="5rem">
                        <Box>
                            <Text
                                pt="2rem" width="100%"
                                color="#b0cfc2"
                                fontWeight="bold"
                                fontSize="1.5em"
                                textShadow="3px 3px 3px rgba(0,0,0,1)"
                            >
                                Duration of the timer
                            </Text>
                            <Text width="100%" color="rgba(255,255,255,0.5)" >
                                Between 5'00'' and 59'59''
                            </Text>
                        </Box>

                        <TimerInput onChange={(max_dur) => this.setState({max_dur})} max_dur={this.state.max_dur}/>
                        <Button
                            isLoading={this.state.isLoading}
                            bg="#63A088"
                            color="white"
                            shadow="inset -3px -3px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.3)"
                            onClick={() => this.handleStartClick()}

                            _hover={{
                                bg: "#71a892"
                            }}
                        >
                            Create my timer playlist !
                        </Button>
                    </VStack>
                    <Summary style={this.state.styleMusic} duration={this.state.max_dur}/>
                </Layout>
            );
        }
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



    async handleStartClick() {
        console.log(this.state.max_dur);
        this.setState({isLoading:true})
        await getTimerPlaylist(this.state.max_dur, this.state.styleMusic);
        this.setState({
            isLoading:false,
            playlistGenerated:true,
        });
    }
}