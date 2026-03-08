import { sql } from '@vercel/postgres';
import {
  SignalWithId,
  ECU,
} from './definitions';

export async function fetchLatestSignals() {
  try {
    const data = await sql<SignalWithId>`
      SELECT * FROM signals ORDER BY id DESC LIMIT 3`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest signals.');
  }
}

export async function fetchCardData() {
  try {
    const signalCountPromise = sql`SELECT COUNT(*) FROM signals`;
    const userCountPromise = sql`SELECT COUNT(*) FROM users`;
    const messageCountPromise = sql`SELECT COUNT(*) FROM messages`;
    const ecuCountPromise = sql`SELECT COUNT(*) FROM ecus`.catch(() => ({ rows: [{ count: '0' }] }));

    const data = await Promise.all([
      signalCountPromise,
      userCountPromise,
      messageCountPromise,
      ecuCountPromise,
    ]);

    const numberOfSignals = Number(data[0].rows[0].count ?? '0');
    const numberOfUsers = Number(data[1].rows[0].count ?? '0');
    const numberOfMessages = Number(data[2].rows[0].count ?? '0');
    const numberOfECUs = Number(data[3].rows[0].count ?? '0');

    return {
      numberOfUsers,
      numberOfSignals,
      numberOfMessages,
      numberOfECUs,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredSignals(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const signals = await sql<SignalWithId>`
      SELECT
        signals.id,
        signals.name,
        signals.description,
        signals.length,
        signals.byteorder,
        signals.valuetype,
        signals.startbyte,
        signals.startbit,
        signals.initialvalue,
        signals.factor,
        signals.sigoffset,
        signals.minivalue,
        signals.maxvalue,
        signals.rawminivalue,
        signals.rawmaxvalue,
        signals.unit,
        signals.valuedescription
      FROM signals
      WHERE
        signals.name ILIKE ${`%${query}%`} OR
        signals.description ILIKE ${`%${query}%`} OR
        signals.unit ILIKE ${`%${query}%`} OR
        signals.valuedescription ILIKE ${`%${query}%`}
      ORDER BY signals.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return signals.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch signals.');
  }
}

export async function fetchSignalsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM signals
    WHERE
      signals.name ILIKE ${`%${query}%`} OR
      signals.description ILIKE ${`%${query}%`} OR
      signals.unit ILIKE ${`%${query}%`} OR
      signals.valuedescription ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of signals.');
  }
}

export async function fetchSignals() {
  try {
    const data = await sql<SignalWithId>`
      SELECT
        id,
        name
      FROM signals
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all signals.');
  }
}

// Message-related data fetching functions
export async function fetchMessages() {
  try {
    const data = await sql`
      SELECT
        m.id,
        m.name,
        m.message_id,
        m.dlc,
        m.cycle_time,
        m.description,
        m.created_at,
        COUNT(ms.signal_id) as signal_count
      FROM messages m
      LEFT JOIN message_signals ms ON m.id = ms.message_id
      GROUP BY m.id, m.name, m.message_id, m.dlc, m.cycle_time, m.description, m.created_at
      ORDER BY m.created_at DESC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch messages.');
  }
}

export async function fetchMessageById(id: string) {
  try {
    const data = await sql`
      SELECT
        m.*,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ms.id,
              'signal_id', ms.signal_id,
              'start_bit', ms.start_bit,
              'position', ms.position,
              'signal_name', s.name,
              'signal_length', s.length,
              'signal_unit', s.unit
            )
          ) FILTER (WHERE ms.signal_id IS NOT NULL),
          '[]'
        ) as signals
      FROM messages m
      LEFT JOIN message_signals ms ON m.id = ms.message_id
      LEFT JOIN signals s ON ms.signal_id = s.id
      WHERE m.id = ${id}
      GROUP BY m.id
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch message.');
  }
}

export async function fetchFilteredMessages(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const messages = await sql`
      SELECT
        m.id,
        m.name,
        m.message_id,
        m.dlc,
        m.cycle_time,
        m.description,
        m.created_at,
        COUNT(ms.signal_id) as signal_count
      FROM messages m
      LEFT JOIN message_signals ms ON m.id = ms.message_id
      WHERE
        m.name ILIKE ${`%${query}%`} OR
        m.message_id ILIKE ${`%${query}%`} OR
        m.description ILIKE ${`%${query}%`}
      GROUP BY m.id, m.name, m.message_id, m.dlc, m.cycle_time, m.description, m.created_at
      ORDER BY m.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return messages.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch messages.');
  }
}

export async function fetchMessagesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM messages
    WHERE
      name ILIKE ${`%${query}%`} OR
      message_id ILIKE ${`%${query}%`} OR
      description ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of messages.');
  }
}

// Fetch all signals for dropdown/selection
export async function fetchAllSignals() {
  try {
    const data = await sql<SignalWithId>`
      SELECT *
      FROM signals
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all signals.');
  }
}

export async function fetchAllECUs() {
  try {
    const data = await sql<ECU>`
      SELECT
        e.id,
        e.name,
        e.description,
        e.created_at,
        COUNT(m.id) as message_count
      FROM ecus e
      LEFT JOIN messages m ON m.sender_ecu_id = e.id
      GROUP BY e.id, e.name, e.description, e.created_at
      ORDER BY e.name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}
