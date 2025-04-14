import { useState, useEffect } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const FlashSalesCountdown = () => {
  const targetDate = "2024-12-31T23:59:59";
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [targetDate]);

  function calculateTimeLeft(targetDate: string): TimeLeft {
    const difference = +new Date(targetDate) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }

  return (
    <>
      <div className="flex text-[#DB4444] items-center gap-3 mb-10 font-semibold">
        <div className="w-4 h-10 bg-[#DB4444] rounded-sm" />
        <h1>Today&apos;s</h1>
      </div>
      <div className="md:flex md:gap-10 lg:gap-20 items-center font-semibold">
        <h1 className="text-4xl">Flash Sales</h1>
        <div className="flex md:gap-5 gap-2 text-center items-start mt-5 md:mt-2">
          <div>
            <h3 className="text-sm">Days</h3>
            <h1 className="md:text-5xl text-2xl">{timeLeft.days}</h1>
          </div>
          <span className="text-[#DB4444] md:text-5xl text-2xl mt-4">:</span>
          <div>
            <h3 className="text-sm">Hours</h3>
            <h1 className="md:text-5xl text-2xl">{timeLeft.hours}</h1>
          </div>
          <span className="text-[#DB4444] md:text-5xl text-2xl mt-4">:</span>
          <div>
            <h3 className="text-sm">Minutes</h3>
            <h1 className="md:text-5xl text-2xl">{timeLeft.minutes}</h1>
          </div>
          <span className="text-[#DB4444] md:text-5xl text-2xl mt-4">:</span>
          <div>
            <h3 className="text-sm">Seconds</h3>
            <h1 className="md:text-5xl text-2xl">{timeLeft.seconds}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlashSalesCountdown