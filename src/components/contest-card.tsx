"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Bookmark, BookmarkCheck, Car, ExternalLink, Play, Timer, Video } from "lucide-react"
import type { Contest } from "@/lib/types"
import Link from "next/link"
import { useTheme } from "next-themes"
import IconSelector from "./icon-selector"
interface ContestCardProps {
  contest: Contest
  isBookmarked: boolean
  toggleBookmark: (contestId: string) => void
  isPast?: boolean
}

function getDateFromSeconds(unixTimestamp:number){
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString();
}

export function ContestCard({ contest, isBookmarked, toggleBookmark, }: ContestCardProps) {
  const { theme } = useTheme()
  const hasSolution = contest.solution ?? false

  return (
    <div>
      <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5 min-h-[200px] flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <IconSelector theme={theme as string} title={contest.platform}/>
              </div>
              <div>
                <h3 className="font-semibold text-lg leading-tight">{contest.title}</h3>
                <Badge
                  variant="outline"
                  className={`mt-1.5 ${
                    contest.platform === "codeforces"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : contest.platform === "codechef"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                  }`}
                >
                  {contest.platform.charAt(0).toUpperCase() + contest.platform.slice(1)}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleBookmark(contest.title)} className="h-8 w-8">
            {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-emerald-600"/>
            ) : (
                <Bookmark className="h-5 w-5" />
            )}
            <span className="sr-only">{isBookmarked ? "Remove bookmark" : "Add bookmark"}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Start:</span>
                <span>{getDateFromSeconds(contest.startTime)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Duration:</span>
                <span>
                  {contest.duration/3600} hours
                </span>
              </div>
            </div>

            {/* Solution video badge */}
            {hasSolution && (
              <div className="mt-2">
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800 flex items-center gap-1"
                >
                  <Video className="h-3 w-3" />
                  Solution Available
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 flex gap-2 justify-end">
          {hasSolution && (
            <Button variant="secondary" size="sm" className="group">
              <Link href={contest.videoUrl ?? ""} target="_blank" className="flex">
              <Play className="h-3.5 w-3.5 mr-1.5 transition-transform group-hover:scale-110" />
              Watch Solution
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" className="group" asChild>
            <a href={contest.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              Visit
              <ExternalLink className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

