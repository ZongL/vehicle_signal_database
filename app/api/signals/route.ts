import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await sql`SELECT * FROM signals ORDER BY name ASC`;
    return NextResponse.json(data.rows);
  } catch (error) {
    console.error('Failed to fetch signals:', error);
    return NextResponse.json({ error: 'Failed to fetch signals' }, { status: 500 });
  }
} 