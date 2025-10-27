"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitCommit, Calendar, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContributionDay {
    contributionCount: number
    date: string
    color: string
}

interface ContributionWeek {
    contributionDays: ContributionDay[]
}

interface ContributionCalendar {
    totalContributions: number
    weeks: ContributionWeek[]
}

interface ApiResponse {
    success: boolean
    data: ContributionCalendar | null
    error: string | null
}

export default function GithubStats() {
    const [contributionData, setContributionData] = useState<ContributionCalendar | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const response = await fetch('/api/github')
                const result: ApiResponse = await response.json()

                if (result.success && result.data) {
                    setContributionData(result.data)
                } else {
                    setError(result.error || 'Không thể tải dữ liệu GitHub')
                }
            } catch (err) {
                setError('Lỗi kết nối API')
            } finally {
                setLoading(false)
            }
        }

        fetchGithubData()
    }, [])

    const getContributionLevel = (count: number) => {
        if (count === 0) return "bg-muted"
        if (count <= 3) return "bg-green-300 dark:bg-green-900"
        if (count <= 6) return "bg-green-400 dark:bg-green-700"
        if (count <= 9) return "bg-green-500 dark:bg-green-500"
        return "bg-green-600 dark:bg-green-400"
    }

    const getRecentContributions = () => {
        if (!contributionData) return []

        const allDays: ContributionDay[] = []
        contributionData.weeks.forEach(week => {
            allDays.push(...week.contributionDays)
        })

        return allDays
            .filter(day => day.contributionCount > 0)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
    }

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GitCommit className="h-5 w-5" />
                        GitHub Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="animate-pulse">
                            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                            <div className="grid grid-cols-53 gap-1">
                                {Array.from({ length: 371 }).map((_, i) => (
                                    <div key={i} className="h-3 w-3 bg-muted rounded-sm" />
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error || !contributionData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GitCommit className="h-5 w-5" />
                        GitHub Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <span>{error || 'Không có dữ liệu'}</span>
                    </div>

                    {/* Mock data để demo */}
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            <Badge variant="outline">120+ contributions</Badge> trong năm qua
                        </div>

                        <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
                            {Array.from({ length: 371 }).map((_, i) => {
                                const level = Math.floor(Math.random() * 5)
                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-3 w-3",
                                            level === 0 ? "bg-muted" :
                                                level === 1 ? "bg-green-300 dark:bg-green-900" :
                                                    level === 2 ? "bg-green-400 dark:bg-green-700" :
                                                        level === 3 ? "bg-green-500 dark:bg-green-500" :
                                                            "bg-green-600 dark:bg-green-400"
                                        )}
                                    />
                                )
                            })}
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Hoạt động gần đây (demo data)
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const recentContributions = getRecentContributions()

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <GitCommit className="h-5 w-5" />
                    GitHub Activity
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Contribution Stats */}
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        {contributionData.totalContributions} contributions
                    </Badge>
                    <span className="text-sm text-muted-foreground">trong năm qua</span>
                </div>

                {/* Contribution Calendar */}
                <div className="space-y-2">
                    <div className="text-sm font-medium">Contribution Calendar</div>
                    <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
                        {contributionData.weeks.map((week, weekIndex) =>
                            week.contributionDays.map((day, dayIndex) => (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className={cn(
                                        "h-3 w-3 transition-colors hover:ring-1 hover:ring-primary",
                                        getContributionLevel(day.contributionCount)
                                    )}
                                    title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString('vi-VN')}`}
                                />
                            ))
                        )}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Ít</span>
                        <div className="flex gap-1">
                            <div className="h-3 w-3 bg-muted" />
                            <div className="h-3 w-3 bg-green-300 dark:bg-green-900" />
                            <div className="h-3 w-3 bg-green-400 dark:bg-green-700" />
                            <div className="h-3 w-3 bg-green-500 dark:bg-green-500" />
                            <div className="h-3 w-3 bg-green-600 dark:bg-green-400" />
                        </div>
                        <span>Nhiều</span>
                    </div>
                </div>

                {/* Recent Activity */}
                {recentContributions.length > 0 && (
                    <div className="space-y-3">
                        <div className="text-sm font-medium">Hoạt động gần đây</div>
                        <div className="space-y-2">
                            {recentContributions.map((day, index) => (
                                <div key={`${day.date}-${index}`} className="flex items-center gap-2 text-sm">
                                    <div
                                        className={cn(
                                            "h-3 w-3",
                                            getContributionLevel(day.contributionCount)
                                        )}
                                    />
                                    <span className="text-muted-foreground">
                                        {day.contributionCount} contributions
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        • {new Date(day.date).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}