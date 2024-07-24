import React,{useEffect,useState} from 'react'
import { Container,Box, Radio, HStack, VStack, Text, RadioGroup, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import {server} from '../index'
import axios from 'axios'
import ErrorComponent from './ErrorComponent'
import Chart from './Chart'


const CoinDetails = () => {
  
  const {id} = useParams();
  // NOTE : Use same variable name as it was given in Route path definition 
  const[coin,setCoin] = useState({});
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(false);
  // by default error is set to false
  const[currency,setCurrency] = useState('inr');
  const[days,setDays] = useState('24hr')
  const[chartArray,setChartArray] = useState([])


  const currencySymbol = currency ==='inr' ? '₹ ' : currency ==='eur' ? '€ ' : '$ '

  const btns = ['24h','7d','14d','30d','60d','200d','1y'];
  
  const switchChartStats = (key)=>{
    switch (key) {
      case '24h':
        setDays('24h');
        setLoading(true);
        break;
      case '7d':
          setDays('7d');
          setLoading(true);
          break;
      case '14d':
            setDays('14d');
            setLoading(true);
            break;
      case '30d':
          setDays('30d');
          setLoading(true);
          break;
      case '60d':
        setDays('60d');
        setLoading(true);
        break;
      case '200d':
        setDays('200d');
        setLoading(true);
        break;
      case '1y':
        setDays('365d');
        setLoading(true);
        break;
      // case 'max':
      //   setDays('max');
      //   setLoading(true);
      //   break;
    
      default:
        setDays('24h');
        setLoading(true);
        break;
    }
  }
  useEffect(()=>{
    const fetchCoin = async()=>{
    try {
      const {data} = await axios.get(`${server}/coins/${id}`);
      /*
      NOTE:
      In the context of the axios library, the data property is a key part of the response object returned by an HTTP request. 
      When you make a request using axios.get, axios.post, or any other axios method, axios returns a response object that contains several properties. 
      The data property specifically holds the actual response data from the server.
      */
      const {data:chartData} = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
      /*
      NOTE:
      ->Renaming data to chartData helps differentiate between the data returned from the two different API calls.
      ->If you use data for both responses, the second declaration of const { data } would overwrite the first one, making it impossible to access the data from the first API call.
      */
      console.log(data);
      console.log(chartData);
      setCoin(data);
      setChartArray(chartData.prices);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
    };
    fetchCoin();
  },[id,currency,days])
  /*
  NOTE:
  I encounterd one problem:
  Problem: In the chart while chaging the currency, the prices were not getting automatically updated.
  Solution: I did not give currency(needed),days(for other purpose) in the useEffect hook. So when its value was changing, 
  */
// make notes on error handling also
  if(error) return <ErrorComponent message={'Error while fetching coin'}/>

  return (
    <Container
    maxW={'container.xl'}>
    {
      loading ? <Loader/>: (
        <>
          <Box width={'full'} borderWidth={1}>
          <Chart arr={chartArray} currency={currencySymbol} days={days}/>
         </Box>

         <HStack p={'4'} wrap={'wrap'}>
          {
            btns.map((i)=>(
              <Button 
              // disabled={days === i}
              key={i} 
              onClick={()=>switchChartStats(i)}
              >{i}</Button>
            ))
          }
         </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
      <HStack spacing={'4'}>
        <Radio value={'inr'} >INR</Radio>
        <Radio value={'usd'} >USD</Radio>
        <Radio value={'eur'} colorScheme='blue'>EURO</Radio>
      </HStack>
    </RadioGroup>

    <VStack
    spacing={'4'}
    p={'16'}
    alignItems={'flex-start'}>
    
    <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
      Last Updated On {Date(coin.market_data.last_updated).split('G')[0]}
  {/* NOTE: coin is the variable. market_data is an obejct which has property last_updated. We can access using coin. */}
    </Text>

    <Image 
    src={coin.image.large} 
    w={'16'} h={16} 
    objectFit={'contain'}/>

    <Stat>
      <StatLabel>{coin.name}</StatLabel>
      <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}
      {/* Note : This above way of accessing an object properties  */}
      </StatNumber>
      <StatHelpText>
        <StatArrow type={coin.market_data.price_change_percentage_24h > 0 
        ? 'increase'
        : 'decrease'
        } // since it is JS so whole is written inside {}

        />
        {coin.market_data.price_change_percentage_24h}%
      </StatHelpText>
      {/* 
      StatHelpText: Provides additional context or explanation for the statistic. In this example, it shows the percentage change.
      StatArrow: Indicates the direction of the change (increase or decrease).
       */}
    </Stat>

    <Badge fontSize={'2xl'} bgColor={'black'} color={'white'} borderRadius={'5px'}>
      {`#${coin.market_cap_rank}`}
      {/*NOTE: This is to show the market cap rank */}
      {/* The Badge component in Chakra UI is used to highlight a specific part of content, often for categorization, labeling, or status indication. */}
    </Badge>

  <CustomBar 
  high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
  low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

  <Box w={'full'} p={'4'}>
   <Item title={'Max Supply'} value={coin.market_data.max_supply}/>
   {/*NOYE: All item titles will be in upper case */}
   <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}/>
   <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
   <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
   <Item title={'All Time Hign'} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
  </Box>

    </VStack>
        </>
      )    }
    </Container>

  )
}

const CustomBar = ({high,low})=>(
   <VStack w={'full'}>
   <Progress value={'50'} colorScheme={'teal'} w={'full'}/>
  {/*NOTE: In Chakra UI, you can use the Progress component to create progress indicators. 
      The Progress component is highly customizable, allowing you to display progress bars with various styles, sizes, and colors. 
      */}
   <HStack justifyContent={'space-between'} w={'full'}>
    <Badge children={low} colorScheme={'red'}/>
    <Text fontSize={'sm'}>24H Range</Text>
    <Badge children={high} colorScheme={'green'}/>
   </HStack>
   </VStack>
)

const Item=({title,value})=>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
   <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
   {/*NOTE: I have imported the HTML tag for fontFamily in index.html */}
   <Text>{value}</Text>
  </HStack>
)
export default CoinDetails
/*
TAB -> Selected text moves right
Shift+TAB -> Selected text moves left
*/