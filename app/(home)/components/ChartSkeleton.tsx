import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ChartSkeleton = () => {
  return (
    <>
        <Skeleton className='w-[500px] h-[300px] animate-pulse'/>
    </>
  )
}

export default ChartSkeleton