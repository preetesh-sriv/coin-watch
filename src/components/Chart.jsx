import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    // NOTE: You need to register the imports here to use them
    // NOTE: You did a mistake by also registering ChartJS 
);
const Chart = ({arr=[],currency,days}) => {
    const prices = [];
    const date = [];
    console.log(arr);
    console.log(days);
    
    for(let i=0; i<arr.length;i++){
        if(days === '24h')
        date.push(new Date(arr[i][0]).toLocaleTimeString());
        else
        date.push(new Date(arr[i][0]).toLocaleDateString());
        prices.push(arr[i][1]);
        // since prices array is present at 1st index of the arr array\

        /*
        NOTE:

        */
    }
    const data = {
        labels: date,
        datasets: [{
            // array of objects 
            label: `Price in ${currency}`,
            data: prices,
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgba(255,99,132,0.5)"
        },
    ],
    };
    
  return (
    <Line
        options={{
            responsive:true,
            // NOTE: An object
        }}
        data={data}
    />
  );
};

export default Chart;