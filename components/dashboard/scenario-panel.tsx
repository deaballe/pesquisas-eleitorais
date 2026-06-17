import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ScenarioParagraphBlock,
  ScenarioStrategyBlock,
  ScenarioTopic,
} from "@/components/dashboard/scenario-content"
import type { ScenarioSide } from "@/lib/scenario-analysis"
import { cn } from "@/lib/utils"

type ScenarioSidePanelProps = {
  candidate: "LULA" | "BOLSONARO"
  content: ScenarioSide
}

function ScenarioSidePanel({ candidate, content }: ScenarioSidePanelProps) {
  const isLula = candidate === "LULA"

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader
        className={cn(
          "border-b border-border/30",
          isLula ? "bg-red-500/[0.06]" : "bg-blue-500/[0.06]",
        )}
      >
        <CardTitle
          className={cn(
            "text-lg font-medium tracking-wide",
            isLula ? "text-[hsl(0_72%_50%)]" : "text-[hsl(220_75%_50%)]",
          )}
        >
          {candidate}
        </CardTitle>
        {!isLula ? (
          <CardDescription>
            Based on the Jair Bolsonaro administration
          </CardDescription>
        ) : (
          <CardDescription>
            Based on the 2022/2026 Lula administration
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {content.paragraphs?.map((paragraph) => (
          <ScenarioParagraphBlock key={paragraph.title ?? paragraph.body} {...paragraph} />
        ))}
        {content.topics?.map((topic) => (
          <ScenarioTopic key={topic.title} {...topic} />
        ))}
        {content.strategies ? (
          <div className="space-y-4">
            <h3 className="font-medium">{content.strategies.heading}</h3>
            {content.strategies.items.map((strategy) => (
              <ScenarioStrategyBlock key={strategy.title} {...strategy} />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

type ScenarioPanelProps = {
  lula: ScenarioSide
  bolsonaro: ScenarioSide
}

export function ScenarioPanel({ lula, bolsonaro }: ScenarioPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ScenarioSidePanel candidate="LULA" content={lula} />
      <ScenarioSidePanel candidate="BOLSONARO" content={bolsonaro} />
    </div>
  )
}
