import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return NextResponse.json({ error: 'Vercel Analytics not configured. Missing environment variables.' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.vercel.com/v8/projects/${projectId}/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Vercel' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
