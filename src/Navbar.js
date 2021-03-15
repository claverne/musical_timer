import React from 'react';
import { Flex, Image, Center, Box, Heading, Spacer, Text } from "@chakra-ui/react"

export default class Navbar extends React.Component {
  render() {
    return (
        <Box pos="absolute" width="100%">
            <Flex height="5em"  bgGradient="linear(#383339,#1f160d)" alignItems="center">
                <Center>
                     <Image
                         boxSize="3.5rem"
                         m="1rem"
                         ml="2rem"
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
                            boxSize="3rem"
                            m="1rem"
                            mr="2rem"
                            borderRadius="full"
                            src={this.props.user.image[0]?.url}
                            alt="profile picture"/>
                    </Center>
                }
            </Flex>
        </Box>
    );
  }
}