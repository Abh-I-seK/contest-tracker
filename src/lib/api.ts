import type { Contest } from "@/lib/types"

export async function fetchContests(): Promise<Contest[]> {
  const a = async(a:string)=>{
    const res = await fetch(a);
    const ok = await res.json();
    return ok;
  }
  const res : Contest[] =[]

  const [result, leetcodeResult , codechefResult] = await Promise.all([a(process.env.NEXT_PUBLIC_API_URL+"/codeforces"), a(process.env.NEXT_PUBLIC_API_URL+"/leetcode"), a(process.env.NEXT_PUBLIC_API_URL+"/codechef")]);
  res.push(...result);
  res.push(...leetcodeResult);
  res.push(...codechefResult);
  return res;
}

export async function fetchSolutions(){
  const m = await fetch("/api/solutions");
  return await m.json();
}

// curl "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=YOUR_PLAYLIST_ID&maxResults=50&key=YOUR_API_KEY"

// curl "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr&maxResults=50&key=AIzaSyC8hE-N_-SBTNNxVy8bWvNe-OotRd3O7eI&pageToken=EAAaHlBUOkNESWlFREl4UkRKQk5ETXlORU0zTXpKQk16SQ"

// https://www.youtube.com/watch?v=SsgKg6N9zEE (videoId)




// {
//   "kind": "youtube#playlistItem",
//   "etag": "Pq4dFQFsx6cBci3M-Qy5Jwtdix4",
//   "id": "UExjWHBrSTlBLVJaSTZGaHlkTnozSkJ0Xy1wX2kyNUNici4xM0YyM0RDNDE4REQ1NDA0",
//   "snippet": {
//     "publishedAt": "2025-03-15T16:55:36Z",
//     "channelId": "UCqL-fzHtN3NQPbYqGymMbTA",
//     "title": "Leetcode Weekly Contest 441 | Video Solutions - A to D | by Raghav Goel | TLE Eliminators",
//     "description": "Here are the video solutions for problems A, B, C, D of Leetcode Weekly Contest 435. We hope this will be useful for you in up-solving this contest. \n\n📢Check out handpicked problems by Priyansh himself, on our CP-31 sheet: https://www.tle-eliminators.com/cp-sheet\n\nSolution Codes:\nMaximum Unique Subarray Sum After Deletion : https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion/submissions/1575316833\nClosest Equal Element Queries: https://leetcode.com/problems/closest-equal-element-queries/submissions/1575317209\nZero Array Transformation IV: https://leetcode.com/problems/zero-array-transformation-iv/submissions/1575317301\nCount Beautiful Numbers: https://leetcode.com/problems/count-beautiful-numbers/submissions/1575317456\n\nBe sure to check out TLE Eliminators.\nWebsite: https://www.tle-eliminators.com/\nInstagram: https://www.instagram.com/tle_eliminators/ \nLinkedin: https://www.linkedin.com/company/tle-eliminators \nTwitter: https://twitter.com/TLE_Eliminators \nTLE Community Discord Server: https://discord.gg/xmTtS4XdJw\n\nTimestamps:-\n00:00Maximum Unique Subarray Sum After Deletion\n26:20 Closest Equal Element Queries\n47:23 Zero Array Transformation IV\n1:11:30 Count Beautiful Numbers",
//     "thumbnails": {
//       "default": {
//         "url": "https://i.ytimg.com/vi/SsgKg6N9zEE/default_live.jpg",
//         "width": 120,
//         "height": 90
//       },
//       "medium": {
//         "url": "https://i.ytimg.com/vi/SsgKg6N9zEE/mqdefault_live.jpg",
//         "width": 320,
//         "height": 180
//       },
//       "high": {
//         "url": "https://i.ytimg.com/vi/SsgKg6N9zEE/hqdefault_live.jpg",
//         "width": 480,
//         "height": 360
//       },
//       "standard": {
//         "url": "https://i.ytimg.com/vi/SsgKg6N9zEE/sddefault_live.jpg",
//         "width": 640,
//         "height": 480
//       },
//       "maxres": {
//         "url": "https://i.ytimg.com/vi/SsgKg6N9zEE/maxresdefault_live.jpg",
//         "width": 1280,
//         "height": 720
//       }
//     },
//     "channelTitle": "TLE Eliminators - by Priyansh",
//     "playlistId": "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr",
//     "position": 0,
//     "resourceId": {
//       "kind": "youtube#video",
//       "videoId": "SsgKg6N9zEE"
//     },
//     "videoOwnerChannelTitle": "TLE Eliminators - by Priyansh",
//     "videoOwnerChannelId": "UCqL-fzHtN3NQPbYqGymMbTA"
//   }
// },
