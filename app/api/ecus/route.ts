import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await sql`
      SELECT id, name, description
      FROM ecus
      ORDER BY name ASC
    `;

    return NextResponse.json(data.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ECUs' },
      { status: 500 },
    );
  }
}
