import { useEffect, useState } from "react";
import jblSpeaker from "../assets/Frame694.png"

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function Banner() {
  const targetDate = "2025-12-31T23:59:59";
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
    <div className="my-10 md:my-16 bg-black rounded-sm md:p-10 p-5 w-[90%] mx-auto md:flex justify-between">
      <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10">
        <h1 className="text-white text-2xl font-semibold md:text-5xl">
          Enhance Your Music Experience
        </h1>

        <div className="flex gap-2 md:gap-0 justify-between text-xs font-semibold md:w-[60%]">
          <div className="rounded-full bg-white p-2 text-center">
            <p>{timeLeft.hours}</p>
            <p>hours</p>
          </div>
          <div className="rounded-full bg-white p-2 text-center">
            <p>{timeLeft.days}</p>
            <p>days</p>
          </div>
          <div className="rounded-full bg-white p-2 text-center">
            <p>{timeLeft.minutes}</p>
            <p>mins</p>
          </div>
          <div className="rounded-full bg-white p-2 text-center">
            <p>{timeLeft.seconds}</p>
            <p>secs</p>
          </div>
        </div>

        <button className="bg-[#00FF66] self-start rounded-sm px-4 py-1 md:px-8 md:py-2 text-white">
          Buy Now
        </button>
      </div>
      <img src={jblSpeaker} alt="speaker" />
    </div>
  );
}

export default Banner;
