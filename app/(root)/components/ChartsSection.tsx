import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react'
const VerticalBarChart = dynamic(() => import("./VerticalBarChart"), {
  ssr: false,
});
const LineChart =  dynamic( () => import('./HorizontalLineChart'),{ssr:false});


const ChartsSection = () => {
  const selectedBar = useSearchParams().get('selectedBar');
  return (
    <div className="flex gap-5">
      <VerticalBarChart />
      {
        selectedBar && 
      <LineChart />
      }
    </div>
  );
}

export default ChartsSection