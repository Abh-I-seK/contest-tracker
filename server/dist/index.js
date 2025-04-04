"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 4000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/leetcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield axios_1.default.post('https://leetcode.com/graphql', {
            query: `{
            allContests{
                title
                startTime
                duration
                cardImg
            }
            }`
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        const contests = result.data.data.allContests;
        const mappedContests = contests.map(extractContestFromLeetcode).filter((contest) => contest != null);
        res.send(mappedContests);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
app.get("/codeforces", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fetch("https://codeforces.com/api/contest.list");
        const ok = yield result.json();
        const contests = ok.result;
        res.send(contests.map(extractContestFromCodeforces).filter((contest) => contest != null));
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
app.get("/codechef", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch("https://www.codechef.com/api/list/contests/all");
    const ok = yield result.json();
    const contests = ok.present_contests;
    contests.push(...ok.future_contests);
    contests.push(...ok.past_contests);
    res.send(contests.map(extractContestFromCodechef).filter((contest) => contest != null));
}));
function extractContestFromCodechef(codechefContest) {
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
        duration: codechefContest.contest_duration * 60,
        url: "https://www.codechef.com/" + codechefContest.contest_code,
        platform: "codechef",
    };
}
function extractContestFromLeetcode(leetcodeContest) {
    const currentTime = Math.floor(Date.now() / 1000);
    const startTime = leetcodeContest.startTime;
    const timeDiff = currentTime - startTime;
    const timeDiffInYears = Math.abs(timeDiff) / (60 * 60 * 24 * 365.25);
    if (timeDiffInYears > 1) {
        return null;
    }
    let url = "https://leetcode.com/contest/";
    for (let i = 0; i < leetcodeContest.title.length; i++) {
        if (leetcodeContest.title[i] === " ") {
            url += "-";
        }
        else {
            url += leetcodeContest.title[i].toLowerCase();
        }
    }
    return {
        title: leetcodeContest.title,
        startTime: leetcodeContest.startTime,
        duration: leetcodeContest.duration,
        url: url,
        platform: "leetcode",
    };
}
function extractContestFromCodeforces(codeforcesContest) {
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
    };
}
const url = "https://contest-tracker-09lr.onrender.com/";
function reloadWebsite() {
    fetch(url)
        .then(response => {
        console.log(response.status);
    })
        .catch(error => {
        console.error(error.message);
    });
}
setInterval(reloadWebsite, 29000);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
