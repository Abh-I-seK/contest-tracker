


export default function IconSelector(props:{
    theme : string,title : string
}){

    if(props.title.toLowerCase().includes("codeforces")){
        return <img src="/codeforcesIcon.svg" alt="Codeforces Icon" className="h-6 w-6"/>
    }
    if(props.title.toLowerCase().includes("codechef")){
        return <img src="/codechefIcon.svg" alt="Codechef Icon" className="h-6 w-6"/>
    }
    if(props.title.toLowerCase().includes("leetcode")){
        if(props.theme==="dark"){
            return <img src="/leetcodeDark.svg" alt="Leetcode Icon" className="h-6 w-6"/>
        }

        return <img src="/leetcodeLight.svg" alt="Leetcode Icon" className="h-6 w-6"/>
    }


}