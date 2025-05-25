//import Image from "next/image";
import HeroSection from '@/components/home/HeroSection'
import DemoSection from '@/components/home/DemoSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'


import BgGradient from '@/components/common/BgGradient'
export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient/>
      <div className="flex flex-col">
        <HeroSection/>
        <DemoSection/>
        <HowItWorksSection/>
      </div>
     {/* 
      <HowItWorksSection/>
      <Pricing/>
      <CTA/> */}
     
    </div>
  );
}
