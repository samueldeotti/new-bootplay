import React from 'react'

interface StatsCardProps {
  children: React.ReactNode;
  label: string;
  value: number | string;
  testId?: string;
}

export default function StatsCard({ children, label, value, testId }: StatsCardProps) {
  return (
    <div className="bg-white w-full flex gap-4 items-center p-2 sm:p-4 rounded-xl">
      <div className="flex justify-center items-center rounded-[50%] bg-black h-12 w-12 sm:h-14 sm:w-14 relative text-white">
        {children}
      </div>
      <div>
        <p className="text-sm sm:text-base font-semibold" data-testid={testId}>{label}</p>
        <p className="font-normal text-xl sm:text-2x line-clamp-1 sm:max-w-[212px] md:max-w-[400px]">{value}</p>
      </div>
    </div>

  )
}

