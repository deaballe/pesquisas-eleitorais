"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { translateLabel } from "@/lib/translations"

type PollFiltersProps = {
  round: number
  institute: string
  rounds: number[]
  institutes: string[]
  onRoundChange: (round: number) => void
  onInstituteChange: (institute: string) => void
}

export function PollFilters({
  round,
  institute,
  rounds,
  institutes,
  onRoundChange,
  onInstituteChange,
}: PollFiltersProps) {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex min-w-40 flex-col gap-1.5">
        <Label htmlFor="round-filter" className="text-xs text-muted-foreground">
          Round
        </Label>
        <Select
          value={String(round)}
          onValueChange={(value) => onRoundChange(Number(value))}
        >
          <SelectTrigger
            id="round-filter"
            className="w-full min-w-40 rounded-full border-transparent bg-muted/50 focus-visible:ring-primary/20"
          >
            <SelectValue placeholder="Select round" />
          </SelectTrigger>
          <SelectContent>
            {rounds.map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex min-w-48 flex-col gap-1.5">
        <Label
          htmlFor="institute-filter"
          className="text-xs text-muted-foreground"
        >
          Institute
        </Label>
        <Select value={institute} onValueChange={onInstituteChange}>
          <SelectTrigger
            id="institute-filter"
            className="w-full min-w-48 rounded-full border-transparent bg-muted/50 focus-visible:ring-primary/20"
          >
            <SelectValue placeholder="Select institute" />
          </SelectTrigger>
          <SelectContent>
            {institutes.map((value) => (
              <SelectItem key={value} value={value}>
                {translateLabel(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
