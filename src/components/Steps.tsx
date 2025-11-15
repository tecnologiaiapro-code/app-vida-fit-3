"use client";
import { useEffect, useState } from "react";

export function Steps({ dailySummary }: { dailySummary: { steps: number } }) {
  const [steps, setSteps] = useState("");

  useEffect(() => {
    // só roda no cliente → não quebra SSR
    setSteps(dailySummary.steps.toLocaleString("pt-BR"));
  }, [dailySummary.steps]);

  return (
    <p className="text-2xl font-bold text-gray-800 mb-2">
      {steps || "—"}
    </p>
  );
}
