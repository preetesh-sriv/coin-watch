import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box 
    bgColor={'black'}
    w={'full'}
    h={'100vh'}
    >
    <motion.div
      style={{
        height:'80vh',
      }}
      animate={{
        translateY: '20px',
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
     
    >
    <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={btcSrc}
          filter={"grayscale(1)"}
        />
    </motion.div>

    <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-20"}
        p={'30px'}
      >
        CoinWatch
      </Text>
    </Box>
  );
};

export default Home;
/*

Framer Motion is a popular open-source library for adding animations and gestures to React applications. 
It is built on top of the Framer API and provides a simple, declarative syntax for creating complex animations.
*/