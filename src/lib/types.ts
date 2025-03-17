export type Platform = "codeforces" | "codechef" | "leetcode"

export type codeforcesContest = {
  id: number
  name: string // title
  type: string
  phase: string
  frozen: boolean
  durationSeconds: number //duration
  startTimeSeconds: number //time(seconds)
  relativeTimeSeconds: number
}

export type codechefContest = {
  contest_code: string
  contest_name: string // title
  contest_start_date: string // time(19 Feb 2025  20:00:00)
  contest_end_date: string
  contest_start_date_iso: string
  contest_end_date_iso: string
  contest_duration: string //duration(minutes)
  distinct_users: number
}

export type Solution={
  title:string,
  platform:Platform,
  videoUrl:string
}

export type leetcodeContest = {
  title: string
  startTime: number // time(seconds)
  duration: number //duration
  cardImg: null | string // Assuming cardImg can be either null or a string
}

export type Contest = {
  title: string
  startTime: number 
  duration:number,
  url: string,
  platform: Platform,
  solution?:boolean,
  videoUrl?:string,
}

/*
{
  contest_code: 'START174',
  contest_name: 'Starters 174 (Rated upto 2700)',
  contest_start_date: '19 Feb 2025  20:00:00',
  contest_end_date: '19 Feb 2025  22:15:00',
  contest_start_date_iso: '2025-02-19T20:00:00+05:30',
  contest_end_date_iso: '2025-02-19T22:15:00+05:30',
  contest_duration: '135',
  distinct_users: 42193
}

{
  id: 1985,
  name: 'Codeforces Round 952 (Div. 4)',
  type: 'ICPC',
  phase: 'FINISHED',
  frozen: false,
  durationSeconds: 9000,
  startTimeSeconds: 1718116500,
  relativeTimeSeconds: 23992496
}


{
  title: 'Biweekly Contest 153',
  startTime: 1743258600,
  duration: 5400,
  cardImg: null
}
*/
