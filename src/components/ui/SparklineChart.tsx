'use client'

interface SparklineChartProps {
  data: number[]
  positive?: boolean
}

export default function SparklineChart({ 
  data, 

  positive = true 
}: SparklineChartProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  
  // Normalize data to fit in view box
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="relative h-8 w-full">
      <svg
        className={`h-full w-full overflow-visible ${positive ? 'text-accent-primary' : 'text-red-500'}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line
          x1="0"
          y1="25"
          x2="100"
          y2="25"
          className="stroke-border-subtle stroke-[0.5]"
        />
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          className="stroke-border-subtle stroke-[0.5]"
        />
        <line
          x1="0"
          y1="75"
          x2="100"
          y2="75"
          className="stroke-border-subtle stroke-[0.5]"
        />

        {/* Chart line */}
        <polyline
          points={points}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-current"
        />

        {/* Gradient fill */}
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop
            offset="0%"
            className={`${positive ? 'text-accent-primary' : 'text-red-500'}`}
            style={{ stopColor: 'currentColor', stopOpacity: 0.2 }}
          />
          <stop
            offset="100%"
            className={`${positive ? 'text-accent-primary' : 'text-red-500'}`}
            style={{ stopColor: 'currentColor', stopOpacity: 0 }}
          />
        </linearGradient>
        <polyline
          points={`0,100 ${points} 100,100`}
          className="fill-[url(#gradient)]"
        />
      </svg>
    </div>
  )
}
