import { NextRequest, NextResponse } from 'next/server'

const GITHUB_USERNAME = "juniordev203"
const GITHUB_ACCESS_TOKEN = process.env.NEXT_GITHUB_TOKEN

const query = `
  query($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`

export async function GET() {
  try {
    if (!GITHUB_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, data: null, error: "GitHub token not configured" },
        { status: 500 }
      )
    }

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          userName: GITHUB_USERNAME,
        },
      }),
    })

    const data = await res.json()
    
    if (data.errors) {
      return NextResponse.json(
        { success: false, data: null, error: data.errors[0]?.message || "GitHub API error" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data.data.user.contributionsCollection.contributionCalendar,
      error: null
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, data: null, error: "Failed to fetch GitHub data" },
      { status: 500 }
    )
  }
}