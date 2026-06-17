import { PollDashboard } from "@/components/dashboard/poll-dashboard"
import { loadPolls } from "@/lib/polls.server"

export const dynamic = "force-dynamic"

const ERROR_MESSAGES = {
  missing: "Poll data file not found",
  invalid: "Unable to read poll data",
  empty: "No poll data available",
} as const

export default async function Page() {
  const result = await loadPolls()

  if ("error" in result) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          {ERROR_MESSAGES[result.error]}
        </p>
      </div>
    )
  }

  return <PollDashboard rows={result.rows} />
}
