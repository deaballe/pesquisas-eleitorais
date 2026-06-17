"use client"

import { useMemo, useState } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PollFilters } from "@/components/dashboard/poll-filters"
import { PollLineChart } from "@/components/dashboard/poll-line-chart"
import { PollMetadata } from "@/components/dashboard/poll-metadata"
import { ScenarioSelector } from "@/components/dashboard/scenario-selector"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  buildChartData,
  filterPollRows,
  getDefaultInstitute,
  getLastCollected,
  getUniqueInstitutes,
  getUniqueRounds,
} from "@/lib/polls"
import type { PollRow } from "@/lib/types"

type PollDashboardProps = {
  rows: PollRow[]
}

export function PollDashboard({ rows }: PollDashboardProps) {
  const rounds = useMemo(() => getUniqueRounds(rows), [rows])
  const institutes = useMemo(() => getUniqueInstitutes(rows), [rows])
  const lastCollected = useMemo(() => getLastCollected(rows), [rows])

  const [round, setRound] = useState(1)
  const [institute, setInstitute] = useState(() => getDefaultInstitute(rows))

  const filteredRows = useMemo(
    () => filterPollRows(rows, round, institute),
    [rows, round, institute],
  )

  const chart = useMemo(
    () => (filteredRows.length > 0 ? buildChartData(filteredRows) : null),
    [filteredRows],
  )

  return (
    <>
      <DashboardHeader />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
        <PollFilters
          round={round}
          institute={institute}
          rounds={rounds}
          institutes={institutes}
          onRoundChange={setRound}
          onInstituteChange={setInstitute}
        />

      <Card>
        <CardContent>
          <PollMetadata
            rows={filteredRows}
            lastCollected={lastCollected}
            institute={institute}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vote intention over time</CardTitle>
          <CardDescription>
            Percentage by candidate across poll dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chart ? (
            <PollLineChart
              data={chart.data}
              config={chart.config}
              series={chart.series}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No polls for this round and institute
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business scenario analysis</CardTitle>
          <CardDescription>
            Regulatory impact by company under Lula vs Bolsonaro scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScenarioSelector />
        </CardContent>
      </Card>
      </div>
    </>
  )
}
