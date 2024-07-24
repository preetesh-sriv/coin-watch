import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from 'react';

import avatarSrc from '../assets/founder1.png';

const Footer = () => {
  return (
    <Box
    bgColor={'black'}
    color={'white'}
    minH={'48'}
    px={'16'}
    py={['16','8']}>
    
    <Stack
    direction={['column','row']}
    h={'full'}
    alignItems={'center'}>
    
    <VStack
    w={'full'}
    alignItems={['center','flex-start']}>

    <Text fontWeight={'bold'}>
    About Us
    </Text>

    <Text
    fontSize={'sm'}
    letterSpacing={'widest'}
    textAlign={['center','left']}>
    
    CoinWatch is the leading crypto tracker in the market. Track over 10000 coins, 300 exchanges and wallets across multiple blockchains from a single platform.
    </Text>
    </VStack>

    <VStack>
        <Avatar boxSize={'28'} mt={['4','0']} src={avatarSrc}/>
        <Text> Our Founder </Text>
    </VStack>
    </Stack>
    </Box>
  )
}
/*
NOTE:
In Chakra UI, the Avatar component is used to display user profile pictures. 
It supports various sizes, shapes, and can also include a fallback in case the image fails to load or is not provided. 
*/
export default Footer