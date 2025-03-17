"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDownAZ, Clock } from "lucide-react"
import type { Contest } from "@/lib/types"
import { ContestCard } from "@/components/contest-card"

interface ContestListProps {
  contests: Contest[]
  bookmarkedContests: string[]
  toggleBookmark: (contestId: string) => void
  loading: boolean
  error: string | null
  emptyMessage: string
  isPast?: boolean
}

export default function ContestList({
  contests,
  bookmarkedContests,
  toggleBookmark,
  loading,
  error,
  emptyMessage,
  isPast = false,
}: ContestListProps) {
  const [sortBy, setSortBy] = useState<"startTime" | "duration">("startTime")

  if (loading) {
    return (
      <div className="space-y-4 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const filteredContests = contests

  const sortedContests = [...filteredContests].sort((a, b) => {
    if (sortBy === "startTime") {
      return isPast
        ? new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        : new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    } else {
      return a.duration - b.duration
    }
  })


  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm ml-auto">
          <span className="text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === "startTime" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSortBy("startTime")}
            className="gap-1.5"
          >
            {isPast ? "Recent" : "Soonest"}
            <Clock className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={sortBy === "duration" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSortBy("duration")}
            className="gap-1.5"
          >
            Duration
            <ArrowDownAZ className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {sortedContests.map((contest,ind) => (
          <ContestCard
            key={ind}
            contest={contest}
            isBookmarked={bookmarkedContests.includes(contest.title)}
            toggleBookmark={toggleBookmark}
            isPast={contest.startTime+contest.duration <= Math.floor(new Date().getTime()/1000)}
          />
        ))}
      </div>
    </div>
  )
}

