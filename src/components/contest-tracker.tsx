"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bookmark, Calendar, Clock, Search } from "lucide-react"
import { fetchContests, fetchSolutions } from "@/lib/api"
import type { Contest, Platform, Solution } from "@/lib/types"
import { Header } from "./header"
import ContestList from "./contest-list"
import PlatformFilter from "./platform-filter"


function checkContains(str1 : string,str2:string){
  return str1.toLowerCase().includes(str2.toLowerCase())
}



export default function ContestTracker() {
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([
    "codeforces",
    "codechef",
    "leetcode",
  ])
  const [bookmarkedContests, setBookmarkedContests] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadContests = async () => {
      try {
        setLoading(true)
        const data = await fetchContests()
        setContests(data)
        const sol : Solution[] = await fetchSolutions()
        
        const ok = []
        for(let i=0;i<data.length;i++){
          const contest = data[i]
          if(contest.startTime + contest.duration >
            Math.floor(new Date().getTime() / 1000)){
              ok.push(contest)
              continue;
            }
          for(let j=0;j<sol.length;j++){
            if(sol[j].title.length <= 2){
              continue;
            }
            if(sol[j].platform === contest.platform && checkContains(contest.title,sol[j].title)){
              if(contest.title==="Educational Codeforces Round 176 (Rated for Div. 2)"){
                console.log("ok")
                console.log(sol[j])
              }
              contest.solution=true
              contest.videoUrl = sol[j].videoUrl
              break
            }
          }
          ok.push(contest)
        }
        setContests(ok);
        
        const savedBookmarks = localStorage.getItem("bookmarkedContests")
        if (savedBookmarks) {
          setBookmarkedContests(JSON.parse(savedBookmarks))
        }
      } catch (err) {
        setError("Failed to load contests. Please try again later.")
      } finally {
        setLoading(false)
        // console.log(contests)
      }
    }

    loadContests()
  }, [])

  const toggleBookmark = (contestTitle: string) => {
    setBookmarkedContests((prev) => {
      const newBookmarks = prev.includes(contestTitle)
        ? prev.filter((name) => name !== contestTitle)
        : [...prev, contestTitle]
      localStorage.setItem("bookmarkedContests", JSON.stringify(newBookmarks))
      return newBookmarks
    })
  }

  const handlePlatformChange = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  const filteredContests = contests
    .filter((contest) => selectedPlatforms.includes(contest.platform))
    .filter((contest) =>
      contest.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const upcomingContests = filteredContests.filter(
    (contest) =>
      contest.startTime + contest.duration >
      Math.floor(new Date().getTime() / 1000)
  )
  const pastContests = filteredContests.filter(
    (contest) =>
      contest.startTime + contest.duration <=
      Math.floor(new Date().getTime() / 1000)
  )
  const bookmarked = filteredContests.filter((contest) => bookmarkedContests.includes(contest.title))

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div>
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Contest Tracker
              </CardTitle>
              <CardDescription>
                Track upcoming and past programming contests from Codeforces,
                CodeChef, and LeetCode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search contests..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <PlatformFilter
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={handlePlatformChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="upcoming"
              className="flex gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Upcoming</span>
              <Badge
                variant="secondary"
                className="ml-1 bg-primary/20 text-foreground"
              >
                {upcomingContests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="flex gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Past</span>
              <Badge
                variant="secondary"
                className="ml-1 bg-primary/20 text-foreground"
              >
                {pastContests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="bookmarked"
              className="flex gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Bookmarked</span>
              <Badge
                variant="secondary"
                className="ml-1 bg-primary/20 text-foreground"
              >
                {bookmarked.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <ContestList
              contests={upcomingContests}
              bookmarkedContests={bookmarkedContests}
              toggleBookmark={toggleBookmark}
              loading={loading}
              error={error}
              emptyMessage="No upcoming contests found. Try changing your filters."
            />
          </TabsContent>

          <TabsContent value="past">
            <ContestList
              contests={pastContests}
              bookmarkedContests={bookmarkedContests}
              toggleBookmark={toggleBookmark}
              loading={loading}
              error={error}
              emptyMessage="No past contests found. Try changing your filters."
              isPast
            />
          </TabsContent>

          <TabsContent value="bookmarked">
            <ContestList
              contests={bookmarked}
              bookmarkedContests={bookmarkedContests}
              toggleBookmark={toggleBookmark}
              loading={loading}
              error={error}
              emptyMessage="No bookmarked contests. Bookmark contests to see them here."
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
