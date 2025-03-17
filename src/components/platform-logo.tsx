import type { Platform } from "@/lib/types"

interface PlatformLogoProps {
  platform: Platform
  className?: string
}

export function PlatformLogo({ platform, className = "h-5 w-5" }: PlatformLogoProps) {
  switch (platform) {
    case "codeforces":
      return <CodeForcesLogo className={className} />
    case "codechef":
      return <CodeChefLogo className={className} />
    case "leetcode":
      return <LeetCodeLogo className={className} />
    default:
      return null
  }
}

function CodeForcesLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M4.5 7.5C5.88071 7.5 7 6.38071 7 5C7 3.61929 5.88071 2.5 4.5 2.5C3.11929 2.5 2 3.61929 2 5C2 6.38071 3.11929 7.5 4.5 7.5Z"
        className="fill-blue-600 dark:fill-blue-400"
      />
      <path
        d="M10.5 13.5C11.8807 13.5 13 12.3807 13 11C13 9.61929 11.8807 8.5 10.5 8.5C9.11929 8.5 8 9.61929 8 11C8 12.3807 9.11929 13.5 10.5 13.5Z"
        className="fill-blue-600 dark:fill-blue-400"
      />
      <path
        d="M16.5 19.5C17.8807 19.5 19 18.3807 19 17C19 15.6193 17.8807 14.5 16.5 14.5C15.1193 14.5 14 15.6193 14 17C14 18.3807 15.1193 19.5 16.5 19.5Z"
        className="fill-red-600 dark:fill-red-400"
      />
    </svg>
  )
}

function CodeChefLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M11.2574 1.5C10.7252 1.5 10.219 1.73191 9.86827 2.13818C9.5175 2.54444 9.34375 3.09763 9.34375 3.675V4.5H14.6562V3.675C14.6562 3.09763 14.4825 2.54444 14.1317 2.13818C13.781 1.73191 13.2748 1.5 12.7426 1.5H11.2574Z"
        className="fill-amber-600 dark:fill-amber-400"
      />
      <path
        d="M6.75 6.75C6.75 6.15326 6.98705 5.58097 7.40901 5.15901C7.83097 4.73705 8.40326 4.5 9 4.5H15C15.5967 4.5 16.169 4.73705 16.591 5.15901C17.0129 5.58097 17.25 6.15326 17.25 6.75V7.5H6.75V6.75Z"
        className="fill-amber-600 dark:fill-amber-400"
      />
      <path
        d="M5.25 9.75C5.25 9.15326 5.48705 8.58097 5.90901 8.15901C6.33097 7.73705 6.90326 7.5 7.5 7.5H16.5C17.0967 7.5 17.669 7.73705 18.091 8.15901C18.5129 8.58097 18.75 9.15326 18.75 9.75V10.5H5.25V9.75Z"
        className="fill-amber-600 dark:fill-amber-400"
      />
      <path
        d="M12 22.5C14.3869 22.5 16.6761 21.5518 18.364 19.864C20.0518 18.1761 21 15.8869 21 13.5C21 11.1131 20.0518 8.82387 18.364 7.13604C16.6761 5.44821 14.3869 4.5 12 4.5C9.61305 4.5 7.32387 5.44821 5.63604 7.13604C3.94821 8.82387 3 11.1131 3 13.5C3 15.8869 3.94821 18.1761 5.63604 19.864C7.32387 21.5518 9.61305 22.5 12 22.5Z"
        className="fill-amber-600 dark:fill-amber-400"
      />
      <path
        d="M12 19.5C13.5913 19.5 15.1174 18.8679 16.2426 17.7426C17.3679 16.6174 18 15.0913 18 13.5C18 11.9087 17.3679 10.3826 16.2426 9.25736C15.1174 8.13214 13.5913 7.5 12 7.5C10.4087 7.5 8.88258 8.13214 7.75736 9.25736C6.63214 10.3826 6 11.9087 6 13.5C6 15.0913 6.63214 16.6174 7.75736 17.7426C8.88258 18.8679 10.4087 19.5 12 19.5Z"
        className="fill-white dark:fill-gray-800"
      />
      <path
        d="M9 12C9.55228 12 10 11.5523 10 11C10 10.4477 9.55228 10 9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12Z"
        className="fill-amber-600 dark:fill-amber-400"
      />
      <path
        d="M15 12C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10C14.4477 10 14 10.4477 14 11C14 11.5523 14.4477 12 15 12Z"
        className="fill-amber-600 dark:fill-amber-400"
      />
      <path
        d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z"
        className="fill-amber-600 dark:fill-amber-400"
      />
    </svg>
  )
}

function LeetCodeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M16.102 17.93L14.205 16.65C13.732 16.323 13.732 15.677 14.205 15.35L16.102 14.07C16.575 13.743 17.195 14.067 17.195 14.72V17.28C17.195 17.933 16.575 18.257 16.102 17.93Z"
        className="fill-orange-600 dark:fill-orange-400"
      />
      <path
        d="M11.5 19.085V17.19C11.5 16.5367 12.0367 16 12.69 16H14.585C15.2383 16 15.775 16.5367 15.775 17.19V19.085C15.775 19.7383 15.2383 20.275 14.585 20.275H12.69C12.0367 20.275 11.5 19.7383 11.5 19.085Z"
        className="fill-orange-600 dark:fill-orange-400"
      />
      <path
        d="M11.5 12.69V4.915C11.5 4.26173 12.0367 3.725 12.69 3.725H14.585C15.2383 3.725 15.775 4.26173 15.775 4.915V12.69C15.775 13.3433 15.2383 13.88 14.585 13.88H12.69C12.0367 13.88 11.5 13.3433 11.5 12.69Z"
        className="fill-orange-600 dark:fill-orange-400"
      />
      <path
        d="M8.225 19.085V11.31C8.225 10.6567 8.76173 10.12 9.415 10.12H11.31C11.9633 10.12 12.5 10.6567 12.5 11.31V19.085C12.5 19.7383 11.9633 20.275 11.31 20.275H9.415C8.76173 20.275 8.225 19.7383 8.225 19.085Z"
        className="fill-orange-600 dark:fill-orange-400"
      />
      <path
        d="M8.225 6.81V4.915C8.225 4.26173 8.76173 3.725 9.415 3.725H11.31C11.9633 3.725 12.5 4.26173 12.5 4.915V6.81C12.5 7.46327 11.9633 8 11.31 8H9.415C8.76173 8 8.225 7.46327 8.225 6.81Z"
        className="fill-orange-600 dark:fill-orange-400"
      />
    </svg>
  )
}

