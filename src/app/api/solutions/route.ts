import { Platform, Solution } from "@/lib/types";

const leetcode_PlaylistId = "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr";
const codechef_PlaylistId = "PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr";
const codeforces_PlaylistId = "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB";
export async function GET() {  
  const result= [];
  const [codechef_sol,codeforces_sol,leetcode_sol]=await Promise.all([fetchPlaylistItems(codechef_PlaylistId,"codechef"),fetchPlaylistItems(codeforces_PlaylistId,"codeforces"),fetchPlaylistItems(leetcode_PlaylistId,"leetcode")]);
  result.push(...codechef_sol);
  result.push(...codeforces_sol);
  result.push(...leetcode_sol);
  return new Response(JSON.stringify(result));
}

function extractTitleCode(title : string){
  let ok = ""
  let st = false;
  for(let i = 0 ; i < title.length ; i++){
      if("0123456789".includes(title[i])){
          ok += title[i];
          st = true;
      }else if(st){
          break;
      }
  }
  ok = ok.trim();
  if(ok.length === 0){
    ok = "-";
  }
  // console.log(ok);
  return ok;
}

async function fetchPlaylistItems(playlistId:string , platform:Platform){
  let res = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistId+"&maxResults=50&key="+process.env.YT_API);
  let ok = await res.json();
  const result : Solution[] = ok.items.map((item : any)=>{
    return {
      title:extractTitleCode(item.snippet.title),
      platform:platform,
      videoUrl:"https://www.youtube.com/watch?v="+item.snippet.resourceId.videoId
    }
  })
  while(ok.nextPageToken){
    res = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistId+"&maxResults=50&key="+process.env.YT_API+"&pageToken="+ok.nextPageToken);
    ok = await res.json();
    result.push(...ok.items.map((item : any)=>{
      return {
        title:extractTitleCode(item.snippet.title),
        platform:platform,
        videoUrl:"https://www.youtube.com/watch?v="+item.snippet.resourceId.videoId
      }
    }))
  }
  return result;
}