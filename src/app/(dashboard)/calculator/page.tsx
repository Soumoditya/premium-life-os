"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Delete, RotateCcw } from "lucide-react";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setHistory(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const expression = history + display;
      // Use Function constructor for safe evaluation of math expression
      // eslint-disable-next-line no-new-func
      const result = new Function("return " + expression.replace(/×/g, "*").replace(/÷/g, "/"))();
      setDisplay(String(result));
      setHistory("");
    } catch (error) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setHistory("");
  };

  const deleteLast = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const scientific = (func: string) => {
    try {
      const val = parseFloat(display);
      let res = 0;
      switch (func) {
        case "sin": res = Math.sin(val); break;
        case "cos": res = Math.cos(val); break;
        case "tan": res = Math.tan(val); break;
        case "sqrt": res = Math.sqrt(val); break;
        case "log": res = Math.log10(val); break;
        case "ln": res = Math.log(val); break;
        case "pow2": res = Math.pow(val, 2); break;
      }
      setDisplay(String(res));
    } catch (e) {
      setDisplay("Error");
    }
  };

  const btnClass = "h-16 rounded-2xl text-xl font-medium transition-all active:scale-95 flex items-center justify-center shadow-sm";
  const numBtn = `${btnClass} bg-white hover:bg-gray-50 text-gray-800`;
  const opBtn = `${btnClass} bg-purple-100 hover:bg-purple-200 text-purple-700`;
  const funcBtn = `${btnClass} bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm`;

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <Header title="Calculator" />

      <div className="flex-1 max-w-md mx-auto w-full flex flex-col justify-end pb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Display */}
          <div className="p-8 bg-gradient-to-b from-gray-50 to-white text-right border-b border-gray-100">
            <div className="text-gray-400 text-sm h-6 mb-1">{history}</div>
            <div className="text-5xl font-light text-gray-800 tracking-tight overflow-x-auto whitespace-nowrap scrollbar-hide">
              {display}
            </div>
          </div>

          {/* Keypad */}
          <div className="p-6 grid grid-cols-4 gap-3 bg-white/50">
            <button onClick={() => scientific("sin")} className={funcBtn}>sin</button>
            <button onClick={() => scientific("cos")} className={funcBtn}>cos</button>
            <button onClick={() => scientific("tan")} className={funcBtn}>tan</button>
            <button onClick={() => scientific("log")} className={funcBtn}>log</button>

            <button onClick={() => scientific("ln")} className={funcBtn}>ln</button>
            <button onClick={() => scientific("sqrt")} className={funcBtn}>√</button>
            <button onClick={() => scientific("pow2")} className={funcBtn}>x²</button>
            <button onClick={clear} className={`${btnClass} bg-red-100 text-red-500 hover:bg-red-200`}>AC</button>

            <button onClick={() => handleNumber("7")} className={numBtn}>7</button>
            <button onClick={() => handleNumber("8")} className={numBtn}>8</button>
            <button onClick={() => handleNumber("9")} className={numBtn}>9</button>
            <button onClick={() => handleOperator("÷")} className={opBtn}>÷</button>

            <button onClick={() => handleNumber("4")} className={numBtn}>4</button>
            <button onClick={() => handleNumber("5")} className={numBtn}>5</button>
            <button onClick={() => handleNumber("6")} className={numBtn}>6</button>
            <button onClick={() => handleOperator("×")} className={opBtn}>×</button>

            <button onClick={() => handleNumber("1")} className={numBtn}>1</button>
            <button onClick={() => handleNumber("2")} className={numBtn}>2</button>
            <button onClick={() => handleNumber("3")} className={numBtn}>3</button>
            <button onClick={() => handleOperator("-")} className={opBtn}>-</button>

            <button onClick={() => handleNumber("0")} className={numBtn}>0</button>
            <button onClick={() => handleNumber(".")} className={numBtn}>.</button>
            <button onClick={deleteLast} className={numBtn}><Delete className="w-5 h-5" /></button>
            <button onClick={() => handleOperator("+")} className={opBtn}>+</button>

            <button onClick={calculate} className={`${btnClass} col-span-4 bg-purple-600 hover:bg-purple-700 text-white mt-2`}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}
