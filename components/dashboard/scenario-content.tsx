import type { ScenarioStance } from "@/lib/scenario-analysis"
import { cn } from "@/lib/utils"

const STANCE_STYLES: Record<ScenarioStance, string> = {
  FAVORABLE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  UNFAVORABLE: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
}

function StanceBadge({ stance }: { stance: ScenarioStance }) {
  return (
    <span
      className={cn(
        "mx-0.5 inline-flex rounded-full px-2 py-0.5 text-xs font-medium align-middle",
        STANCE_STYLES[stance],
      )}
    >
      {stance}
    </span>
  )
}

function renderBodyWithStanceBadges(body: string) {
  const parts = body.split(/(FAVORABLE|UNFAVORABLE)/g)

  return parts.map((part, index) => {
    if (part === "FAVORABLE" || part === "UNFAVORABLE") {
      return <StanceBadge key={index} stance={part} />
    }

    return <span key={index}>{part}</span>
  })
}

type ScenarioTopicProps = {
  title: string
  stance: ScenarioStance
  body: string
  sourceLabel: string
  sourceUrl: string
}

export function ScenarioTopic({
  title,
  stance,
  body,
  sourceLabel,
  sourceUrl,
}: ScenarioTopicProps) {
  return (
    <div className="space-y-1.5 border-b border-border/30 pb-4 last:border-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="font-medium">{title}</h4>
        <StanceBadge stance={stance} />
      </div>
      <p className="text-muted-foreground leading-relaxed">{body}</p>
      <p className="text-xs text-muted-foreground">
        Source:{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          {sourceLabel}
        </a>
      </p>
    </div>
  )
}

function SummaryPoint({ stance, body }: { stance: ScenarioStance; body: string }) {
  return (
    <p className="text-muted-foreground leading-relaxed">
      <StanceBadge stance={stance} /> {body}
    </p>
  )
}

type ScenarioParagraphBlockProps = {
  title?: string
  body?: string
  summaryPoints?: { stance: ScenarioStance; body: string }[]
  sourceLabel?: string
  sourceUrl?: string
}

export function ScenarioParagraphBlock({
  title,
  body,
  summaryPoints,
  sourceLabel,
  sourceUrl,
}: ScenarioParagraphBlockProps) {
  return (
    <div className="space-y-1.5 border-b border-border/30 pb-4 last:border-0 last:pb-0">
      {title ? <h4 className="font-medium">{title}</h4> : null}
      {summaryPoints ? (
        <div className="space-y-2">
          {summaryPoints.map((point) => (
            <SummaryPoint key={point.stance} {...point} />
          ))}
        </div>
      ) : null}
      {body ? (
        <p className="text-muted-foreground leading-relaxed">
          {title === "Scenario Summary"
            ? renderBodyWithStanceBadges(body)
            : body}
        </p>
      ) : null}
      {sourceLabel && sourceUrl ? (
        <p className="text-xs text-muted-foreground">
          Source:{" "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            {sourceLabel}
          </a>
        </p>
      ) : null}
    </div>
  )
}

type ScenarioStrategyBlockProps = {
  title: string
  body: string
  sourceLabel: string
  sourceUrl: string
}

export function ScenarioStrategyBlock({
  title,
  body,
  sourceLabel,
  sourceUrl,
}: ScenarioStrategyBlockProps) {
  return (
    <div className="space-y-1.5 border-b border-border/30 pb-4 last:border-0 last:pb-0">
      <h4 className="font-medium">{title}</h4>
      <p className="text-muted-foreground leading-relaxed">{body}</p>
      <p className="text-xs text-muted-foreground">
        Source:{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          {sourceLabel}
        </a>
      </p>
    </div>
  )
}
