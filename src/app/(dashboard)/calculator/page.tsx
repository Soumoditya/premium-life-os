"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function CalculatorPage() {
    const [display, setDisplay] = useState("0");
    const [history, setHistory] = useState<string[]>([]);
    const [expression, setExpression] = useState("");

    const handleBtnClick = (val: string) => {
        if (val === 'C') {
            setDisplay("0");
            setExpression("");
        } else if (val === '=') {
            try {
                // eslint-disable-next-line no-eval
                const result = eval(expression).toString();
                setDisplay(result);
                setHistory([`${expression} = ${result}`, ...history.slice(0, 4)]);
                setExpression(result);
            } catch {
                setDisplay("Error");
            }
        } else if (['+', '-', '*', '/'].includes(val)) {
            setExpression(expression + val);
            setDisplay(val);
        } else {
            if (display === "0" || ['+', '-', '*', '/'].includes(display)) {
                setDisplay(val);
            } else {
                setDisplay(display + val);
            }
            setExpression(expression + val);
        }
    };

    const buttons = [
        'C', '(', ')', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '=',
    ];

    return (
        <div className="calculator-page">
            <Header title="Calculator" />

            <div className="calc-container">
                <div className="calculator glass-panel animate-slide-up">
                    <div className="calc-display">
                        <div className="calc-expression">{expression || '0'}</div>
                        <div className="calc-result">{display}</div>
                    </div>

                    <div className="calc-grid">
                        {buttons.map((btn) => (
                            <button
                                key={btn}
                                className={`calc-btn ${['C', '=', '+', '-', '*', '/'].includes(btn) ? 'accent' : ''} ${btn === '0' ? 'wide' : ''}`}
                                onClick={() => handleBtnClick(btn)}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="history-panel glass-panel animate-slide-up delay-100">
                    <h3>History</h3>
                    <div className="history-list">
                        {history.length === 0 && <p className="empty-text">No calculations yet</p>}
                        {history.map((item, i) => (
                            <div key={i} className="history-item">{item}</div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .calc-container {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          justify-content: center;
          margin-top: 40px;
        }

        .calculator {
          width: 320px;
          padding: 24px;
          background: rgba(0, 0, 0, 0.4);
        }

        .calc-display {
          background: rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          text-align: right;
        }

        .calc-expression {
          font-size: 14px;
          color: var(--fg-secondary);
          min-height: 20px;
        }

        .calc-result {
          font-size: 36px;
          font-weight: 600;
          color: white;
          margin-top: 8px;
        }

        .calc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .calc-btn {
          height: 56px;
          border: none;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .calc-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .calc-btn.accent {
          color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .calc-btn.accent:hover {
          background: rgba(99, 102, 241, 0.2);
        }

        .calc-btn.wide {
          grid-column: span 2;
        }

        .history-panel {
          width: 280px;
          padding: 24px;
          min-height: 400px;
        }

        .history-panel h3 {
          margin-bottom: 20px;
          font-size: 18px;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .history-item {
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
          font-family: monospace;
          font-size: 14px;
          color: var(--fg-secondary);
        }

        .empty-text {
          color: var(--fg-tertiary);
          font-style: italic;
        }
      `}</style>
        </div>
    );
}
