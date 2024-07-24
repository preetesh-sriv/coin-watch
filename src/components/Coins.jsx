import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container,HStack ,Heading,Img,VStack,Text,Button, RadioGroup, Radio} from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'
const Coins = () => {

  const[coins,setCoins] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(false);
  // by default error is set to false
  const[page,setPage] = useState(1);
  const[currency,setCurrency] = useState('inr');

  const currencySymbol = currency ==='inr' ? '₹ ' : currency ==='eur' ? '€ ' : '$ '
  // Note the above statement or usage of ternary operator

  const changePage =(page)=>{
    setPage(page);
    setLoading(true);
    scrollToTop();
  }

  const btns = new Array(132).fill(1);

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 
  // Note : This way of scrolling to the top

  useEffect(()=>{
    const fetchCoins = async()=>{
    try {
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoins(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
    };
    fetchCoins();
  },[currency,page])
  
  if(error) return <ErrorComponent message={'Error while fetching coins'}/>
  // Note the above way of sending a message 
  return (
    <Container maxW={'container.xl'}> 

    {loading?(<Loader/>):
     (
    <>
    <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
      <HStack spacing={'4'}>
        <Radio value={'inr'} >INR</Radio>
        <Radio value={'usd'} >USD</Radio>
        <Radio value={'eur'} colorScheme='blue'>EURO</Radio>
      </HStack>
    </RadioGroup>
    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
      {// Note :- justifyContent -> space-evenly helps in bringing the responsiveness
        coins.map((i)=>(
          <CoinCard 
          id={i.id}
          key={i.id}
          name={i.name}
          price={i.current_price} 
          img={i.image} 
          symbol={i.symbol} 
          currencySymbol={currencySymbol}
/>
     ))}
    </HStack>

    <HStack
    w={'full'}
    overflowX={'auto'}
    p={'8'}>
     {
      btns.map((item,index)=>(
      <Button 
      key={index}
      bgColor={'black'}  
      onClick={()=>changePage(index+1)}
      
      color={'white'}>
         {index+1}
      </Button>
      ))
     }
     {/* 
     NOTE:
     => Whatever JS expression you write inside JSX file, you write within the {} brackets.
      */}
    </HStack>
    </>
     )}
    
    
    </Container>
  );
}
// Below the component which includes all exchanges' details
const ExchangeCard = ({name,img,rank,url})=>(
  <a href={url} target={'blank'}>
   
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
     {rank}
     </Heading>

     <Text noOfLines={1}>
     {name}
     </Text>

   </VStack>
  </a>
)

export default Coins