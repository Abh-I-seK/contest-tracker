"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"
import type { Platform } from "@/lib/types"
import { PlatformLogo } from "./platform-logo"
import IconSelector from "./icon-selector"
import { useTheme } from "next-themes"

interface PlatformFilterProps {
  selectedPlatforms: Platform[]
  onPlatformChange: (platform: Platform) => void
}

export default function PlatformFilter({ selectedPlatforms, onPlatformChange }: PlatformFilterProps) {
  const platforms: { value: Platform; label: string }[] = [
    { value: "codeforces", label: "Codeforces" },
    { value: "codechef", label: "CodeChef" },
    { value: "leetcode", label: "LeetCode" },
  ]
  const { theme } = useTheme()
  const allSelected = selectedPlatforms.length === platforms.length
  const someSelected = selectedPlatforms.length > 0 && !allSelected

  const toggleAll = () => {
    if (allSelected) {
      // Deselect all
      platforms.forEach((platform) => {
        if (selectedPlatforms.includes(platform.value)) {
          onPlatformChange(platform.value)
        }
      })
    } else {
      // Select all
      platforms.forEach((platform) => {
        if (!selectedPlatforms.includes(platform.value)) {
          onPlatformChange(platform.value)
        }
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          <span>Platforms</span>
          <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
            {selectedPlatforms.length}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter Platforms</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={allSelected} onCheckedChange={toggleAll}>
          <span className="font-medium">All Platforms</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {platforms.map((platform) => (
          <DropdownMenuCheckboxItem
            key={platform.value}
            checked={selectedPlatforms.includes(platform.value)}
            onCheckedChange={() => onPlatformChange(platform.value)}
            className="flex items-center gap-2"
          >
            <IconSelector title={platform.value} theme={theme as string} />
            {platform.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

