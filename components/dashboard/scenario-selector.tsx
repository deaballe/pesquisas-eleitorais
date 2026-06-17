"use client"

import { useState } from "react"

import { ScenarioPanel } from "@/components/dashboard/scenario-panel"
import { Button } from "@/components/ui/button"
import {
  COMPANY_KEYS,
  COMPANY_SCENARIOS,
  type CompanyKey,
} from "@/lib/scenario-analysis"
import { cn } from "@/lib/utils"

export function ScenarioSelector() {
  const [selected, setSelected] = useState<CompanyKey | null>(null)

  function handleSelect(key: CompanyKey) {
    setSelected((current) => (current === key ? null : key))
  }

  const scenario = selected ? COMPANY_SCENARIOS[selected] : null

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {COMPANY_KEYS.map((key) => {
          const isActive = selected === key
          return (
            <Button
              key={key}
              type="button"
              variant="outline"
              className={cn(
                "h-auto min-h-10 whitespace-normal rounded-full border-transparent bg-muted/40 px-5 py-2.5 text-center transition-all duration-200 hover:bg-muted/60",
                isActive &&
                  "border-primary/30 bg-primary/10 shadow-sm hover:bg-primary/10",
              )}
              aria-pressed={isActive}
              onClick={() => handleSelect(key)}
            >
              {COMPANY_SCENARIOS[key].label}
            </Button>
          )
        })}
      </div>

      {scenario ? (
        <ScenarioPanel lula={scenario.lula} bolsonaro={scenario.bolsonaro} />
      ) : null}
    </div>
  )
}
