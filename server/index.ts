import axios from "axios";
import  express from "express";
import cors from "cors";

const app = express()
app.use(cors());
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get("/leetcode",async(req,res)=>{
    try{
        const result = await axios.post('https://leetcode.com/graphql',{
            query: `{
            allContests{
                title
                startTime
                duration
                cardImg
            }
            }`
        },
        {
        headers:{
            "Content-Type": "application/json",
        }
        }); 
        const contests = result.data.data.allContests;
        const mappedContests = contests.map(extractContestFromLeetcode).filter((contest:any)=>contest!=null);
        res.send(mappedContests);
    }catch(e){
        res.status(500).send(e);
    }
})

app.get("/codeforces",async(req,res)=>{
    try{
        const result = await fetch("https://codeforces.com/api/contest.list");
        const ok = await result.json();
        const contests = ok.result;
        res.send(contests.map(extractContestFromCodeforces).filter((contest:any)=>contest!=null));
    }catch(e){
        res.status(500).send(e);
    }
})

app.get("/codechef",async(req,res)=>{
    const result = await fetch("https://www.codechef.com/api/list/contests/all");
    const ok = await result.json();

    const contests = ok.present_contests;
    contests.push(...ok.future_contests);
    contests.push(...ok.past_contests);

    res.send(contests.map(extractContestFromCodechef).filter((contest:any)=>contest!=null));
})

function extractContestFromCodechef(codechefContest : any) {
    const date = new Date(codechefContest.contest_start_date);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const currentTime = Math.floor(Date.now() / 1000); 
    const startTime = unixTimestamp;
    const timeDiff = currentTime - startTime;
    const timeDiffInYears = Math.abs(timeDiff) / (60 * 60 * 24 * 365.25);
    if (timeDiffInYears > 1) {
        return null;
    }
    
    return {
      title: codechefContest.contest_name,
      startTime: unixTimestamp,
      duration: codechefContest.contest_duration*60,    
      url: "https://www.codechef.com/" + codechefContest.contest_code,
      platform: "codechef",
    }
}

function extractContestFromLeetcode(leetcodeContest : any) {
    const currentTime = Math.floor(Date.now() / 1000); 
    const startTime = leetcodeContest.startTime;
    const timeDiff = currentTime - startTime;
    const timeDiffInYears = Math.abs(timeDiff) / (60 * 60 * 24 * 365.25);
    if (timeDiffInYears > 1) {
        return null;
    }

    let url = "https://leetcode.com/contest/";
    
    for(let i=0;i<leetcodeContest.title.length;i++){
        if(leetcodeContest.title[i]===" "){
            url += "-";
        }else{
            url += leetcodeContest.title[i].toLowerCase();
        }
    }
    
    return {
      title: leetcodeContest.title,
      startTime: leetcodeContest.startTime,
      duration: leetcodeContest.duration,
      url: url,
      platform: "leetcode",
    }
}

function extractContestFromCodeforces(codeforcesContest : any) {
    const currentTime = Math.floor(Date.now() / 1000); 
    const startTime = codeforcesContest.startTimeSeconds;
    const timeDiff = currentTime - startTime;
    const timeDiffInYears = Math.abs(timeDiff) / (60 * 60 * 24 * 365.25);
    if (timeDiffInYears > 1) {
        return null;
    }

    return {
      title: codeforcesContest.name,
      startTime: codeforcesContest.startTimeSeconds,
      duration: codeforcesContest.durationSeconds,
      url: "https://codeforces.com/contest/" + codeforcesContest.id,
      platform: "codeforces",
    }
  }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})