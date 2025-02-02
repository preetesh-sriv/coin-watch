import React from 'react'
import { Container,HStack ,Heading,Img,VStack,Text} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const CoinCard = ({id,name,img,symbol,price,currencySymbol = '₹'})=>(
  <Link to={`/coin/${id}`} >
  {/* Note -> that here we have used Link tag in place of anchor tag  */}
   
   <VStack 
   w={'52'} 
   shadow={'lg'} //very important
   p={'8'} 
   borderRadius={'lg'} 
   transition={'all 0.3s'} 
   m={'4'}
   css={{
    '&:hover':{
      transform:'scale(1.1)',
    }
   }}
   >
     
     <Img 
     src={img} 
     w={'10'} 
     h={'10'} 
     objectFit={'contain'} 
     alt={'Exchange'}/>

     <Heading size={'md'} noOfLines={1}>
     {symbol}
     </Heading>

     <Text noOfLines={1}>
     {name}
     </Text>

     <Text noOfLines={1}>
     {price ? `${currencySymbol}${price}` : 'NA'}
     {/* Understand the above line */}
     </Text>

   </VStack>
  </Link>
)

export default CoinCard