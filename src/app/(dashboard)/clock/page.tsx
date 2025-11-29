"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function ClockPage() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Analog clock calculations
    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = ((minutes * 60 + seconds) / 3600) * 360;
    const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <Header title="World Clock" />

            <div className="relative w-80 h-80 md:w-96 md:h-96 bg-white rounded-full shadow-[0_0_60px_rgba(0,0,0,0.1)] border-8 border-white flex items-center justify-center mb-12">
                {/* Clock Face Markers */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-4 bg-gray-300 origin-bottom"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(-140px)`,
                        }}
                    />
                ))}

                {/* Hands */}
                {/* Hour Hand */}
                <div
                    className="absolute w-2 h-24 bg-gray-800 rounded-full origin-bottom z-10"
                    style={{ transform: `rotate(${hourDeg}deg) translateY(-50%)` }}
                />
                {/* Minute Hand */}
                <div
                    className="absolute w-1.5 h-32 bg-gray-600 rounded-full origin-bottom z-20"
                    style={{ transform: `rotate(${minuteDeg}deg) translateY(-50%)` }}
                />
                {/* Second Hand */}
                <div
                    className="absolute w-1 h-36 bg-red-500 rounded-full origin-bottom z-30"
                    style={{ transform: `rotate(${secondDeg}deg) translateY(-30%)` }}
                />

                {/* Center Dot */}
                <div className="absolute w-4 h-4 bg-red-500 rounded-full z-40 border-2 border-white" />
            </div>

            {/* Digital Display */}
            <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-gray-800 tracking-tighter tabular-nums">
                    {time.toLocaleTimeString([], { hour12: false })}
                </div>
                <div className="text-xl text-gray-500 mt-2 font-medium">
                    {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </div>
    );
}
