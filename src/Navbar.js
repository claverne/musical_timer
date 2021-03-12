import React from 'react';
import { Flex, Image, Center, Box, Heading, Spacer, Text } from "@chakra-ui/react"

export default class Navbar extends React.Component {
  render() {
    return (
        <Box bg="rgba(24,15,3,0.6)" mb="1em">
            <Center>
                <Flex width="60em" height="5em">
                    <Center ml="1em">
                         <Image
                             boxSize="3.5em"
                             mr="1em"
                             src="sp_timer.png"
                             alt="logo"
                          />
                         <Heading color="white">
                             Musical timer
                         </Heading>
                     </Center>
                    <Spacer/>
                    { this.props.user &&
                        <Center>
                            <Text fontWeight="bold" color="white">{this.props.user.display_name}</Text>
                            <Image
                                boxSize="3em"
                                ml="1em"
                                borderRadius="full"
                                src={this.props.user.image[0]?.url}
                                alt="profile picture"/>
                        </Center>
                    }
                </Flex>
            </Center>
        </Box>
    );
  }
}