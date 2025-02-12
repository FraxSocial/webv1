'use client'



const BackgroundEffects = () => {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] bg-gradient-radial from-[#ffffff03] to-transparent rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] bg-gradient-radial from-[#ffffff03] to-transparent rounded-full animate-float" style={{ animationDelay: '-2s' }} />
      </div>
      
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />
    </>
  )
}

export default BackgroundEffects
