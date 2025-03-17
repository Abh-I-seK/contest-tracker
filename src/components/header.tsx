import { Button } from "@/components/ui/button"
import { Code2, CodeSquare } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-around">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">ContestHub</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <CodeSquare className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}