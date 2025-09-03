import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET all messages
export async function GET() {
  try {
    const result = await sql`
      SELECT 
        m.id,
        m.name,
        m.message_id,
        m.dlc,
        m.cycle_time,
        m.description,
        m.created_at,
        m.updated_at,
        COUNT(ms.signal_id) as signal_count
      FROM messages m
      LEFT JOIN message_signals ms ON m.id = ms.message_id
      GROUP BY m.id, m.name, m.message_id, m.dlc, m.cycle_time, m.description, m.created_at, m.updated_at
      ORDER BY m.created_at DESC
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}