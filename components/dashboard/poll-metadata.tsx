import {
  formatCollectedAt,
  formatPollDate,
  getPollPeriod,
} from "@/lib/polls"
import { translateLabel } from "@/lib/translations"
import type { PollRow } from "@/lib/types"

type PollMetadataProps = {
  rows: PollRow[]
  lastCollected: string
  institute: string
}

export function PollMetadata({
  rows,
  lastCollected,
  institute,
}: PollMetadataProps) {
  const period = getPollPeriod(rows)

  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-3">
      <div>
        <dt className="text-muted-foreground">Last collected</dt>
        <dd className="font-medium">{formatCollectedAt(lastCollected)}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Poll period</dt>
        <dd className="font-medium">
          {period
            ? `${formatPollDate(period.start)} → ${formatPollDate(period.end)}`
            : "—"}
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Institute</dt>
        <dd className="font-medium">{translateLabel(institute)}</dd>
      </div>
    </dl>
  )
}
