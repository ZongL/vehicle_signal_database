import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await sql`SELECT * FROM signals`;
    const signals = data.rows;
    
    // Convert signals to CSV format
    const headers = ['name', 'length', 'byteorder', 'valuetype', 'initialvalue', 'factor', 'sigoffset', 'minivalue', 'maxvalue', 'unit'];
    const csvContent = [
      headers.join(','),
      ...signals.map(signal => 
        headers.map(header => signal[header] === null ? '' : signal[header]).join(',')
      )
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=signals.csv'
      }
    });
  } catch (error) {
    console.error('Failed to export signals:', error);
    return NextResponse.json({ error: 'Failed to export signals' }, { status: 500 });
  }
} 