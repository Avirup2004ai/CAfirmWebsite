"use client";

import { useState, useEffect, useCallback } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import mexp from "math-expression-evaluator";

export default function BasicCalculatorPage() {
    const [display, setDisplay] = useState("0");
    const [expression, setExpression] = useState("");
    const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);
    const [justEvaluated, setJustEvaluated] = useState(false);

    const appendToDisplay = useCallback((val: string) => {
        if (display === "Error" || (justEvaluated && /[0-9.]/.test(val))) {
            setDisplay(val);
            setExpression(val);
            setJustEvaluated(false);
            return;
        }
        setJustEvaluated(false);
        if (display === "0" && val !== ".") {
            setDisplay(val);
            setExpression(val);
        } else {
            setDisplay(display + val);
            setExpression(expression + val);
        }
    }, [display, expression, justEvaluated]);

    const appendOperator = useCallback((op: string) => {
        setJustEvaluated(false);
        const displayOp = op === "*" ? "×" : op === "/" ? "÷" : op;
        if (display === "Error") {
            setDisplay("0" + ` ${displayOp} `);
            setExpression("0" + op);
            return;
        }

        // Prevent consecutive operators
        const lastChar = expression.slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
            setDisplay(display.slice(0, -3) + ` ${displayOp} `);
            setExpression(expression.slice(0, -1) + op);
            return;
        }

        setDisplay(display + ` ${displayOp} `);
        setExpression(expression + op);
    }, [display, expression]);

    const calculate = useCallback(() => {
        if (display === "Error" || !expression) return;
        try {
            // Strip trailing operators before evaluation
            let exprToEval = expression;
            while (["+", "-", "*", "/"].includes(exprToEval.slice(-1))) {
                exprToEval = exprToEval.slice(0, -1);
            }
            if (!exprToEval) return;

            // Safe eval: only allow numbers and basic operators
            const sanitized = exprToEval.replace(/[^0-9+\-*/.%()]/g, "");
            if (!sanitized) return;
            // Handle percentage
            const withPercent = sanitized.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

            const result = (mexp as any).eval(withPercent);

            if (typeof result !== "number" || !isFinite(result) || isNaN(result)) {
                throw new Error("Invalid calculation");
            }

            const formatted = parseFloat(result.toFixed(10)).toString();
            setHistory((prev) => [{ expr: display, result: formatted }, ...prev].slice(0, 10));
            setDisplay(formatted);
            setExpression(formatted);
            setJustEvaluated(true);
        } catch {
            setDisplay("Error");
            setExpression("");
        }
    }, [display, expression]);

    const clear = useCallback(() => {
        setDisplay("0");
        setExpression("");
        setJustEvaluated(false);
    }, []);

    const backspace = useCallback(() => {
        if (display.length <= 1 || display === "Error") {
            clear();
        } else {
            const trimmed = display.trimEnd();
            const newVal = trimmed.slice(0, -1).trimEnd();
            setDisplay(newVal || "0");
            setExpression(expression.slice(0, -1) || "0");
        }
    }, [display, expression, clear]);

    // Keyboard support
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key >= "0" && e.key <= "9") appendToDisplay(e.key);
            else if (e.key === ".") appendToDisplay(".");
            else if (e.key === "+") appendOperator("+");
            else if (e.key === "-") appendOperator("-");
            else if (e.key === "*") appendOperator("*");
            else if (e.key === "/") { e.preventDefault(); appendOperator("/"); }
            else if (e.key === "%") appendToDisplay("%");
            else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); calculate(); }
            else if (e.key === "Backspace") backspace();
            else if (e.key === "Escape") clear();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [appendToDisplay, appendOperator, calculate, backspace, clear]);

    const Button = ({ label, onClick, className = "" }: { label: string; onClick: () => void; className?: string }) => (
        <button
            onClick={onClick}
            className={`rounded-xl py-3 text-base font-medium transition-all active:scale-95 ${className}`}
        >
            {label}
        </button>
    );

    return (
        <>
            <Breadcrumbs items={[{ label: "Knowledge Bank", href: "/knowledge" }, { label: "Calculators", href: "/knowledge/calculators" }, { label: "Basic Calculator" }]} />
            <section className="section-padding gradient-bg">
                <div className="section-container max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-heading">Basic Calculator</h1>
                    <p className="mt-3 text-neutral-600">Standard arithmetic calculator with keyboard support and history log.</p>
                </div>
            </section>
            <section className="section-padding bg-white">
                <div className="section-container max-w-sm mx-auto">
                    <div className="card !p-4">
                        {/* Display */}
                        <div className="rounded-xl bg-neutral-900 p-4 mb-4">
                            <div className="text-right text-xs text-neutral-400 h-4 overflow-hidden">{expression !== display ? expression : ""}</div>
                            <div className="text-right text-3xl font-bold text-white font-mono tracking-wider overflow-x-auto">{display}</div>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-4 gap-2">
                            <Button label="C" onClick={clear} className="bg-red-100 text-red-700 hover:bg-red-200" />
                            <Button label="⌫" onClick={backspace} className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200" />
                            <Button label="%" onClick={() => appendToDisplay("%")} className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200" />
                            <Button label="÷" onClick={() => appendOperator("/")} className="bg-primary-100 text-primary-700 hover:bg-primary-200" />

                            <Button label="7" onClick={() => appendToDisplay("7")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="8" onClick={() => appendToDisplay("8")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="9" onClick={() => appendToDisplay("9")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="×" onClick={() => appendOperator("*")} className="bg-primary-100 text-primary-700 hover:bg-primary-200" />

                            <Button label="4" onClick={() => appendToDisplay("4")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="5" onClick={() => appendToDisplay("5")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="6" onClick={() => appendToDisplay("6")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="−" onClick={() => appendOperator("-")} className="bg-primary-100 text-primary-700 hover:bg-primary-200" />

                            <Button label="1" onClick={() => appendToDisplay("1")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="2" onClick={() => appendToDisplay("2")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="3" onClick={() => appendToDisplay("3")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="+" onClick={() => appendOperator("+")} className="bg-primary-100 text-primary-700 hover:bg-primary-200" />

                            <Button label="0" onClick={() => appendToDisplay("0")} className="col-span-2 bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="." onClick={() => appendToDisplay(".")} className="bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50" />
                            <Button label="=" onClick={calculate} className="bg-primary-500 text-white hover:bg-primary-600" />
                        </div>
                    </div>

                    {/* History */}
                    {history.length > 0 && (
                        <div className="mt-6 card !p-4">
                            <h3 className="text-sm font-semibold text-neutral-700 mb-3">History</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {history.map((h, i) => (
                                    <div key={i} className="flex justify-between text-sm border-b border-neutral-100 pb-1">
                                        <span className="text-neutral-500 truncate mr-2">{h.expr}</span>
                                        <span className="font-medium text-neutral-800 whitespace-nowrap">= {h.result}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
