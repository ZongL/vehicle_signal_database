import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  SignalWithId,
  Message,
  MessageSignal,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
//added by zong
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
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return signals.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch signals.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
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

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all signals.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
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
      SELECT
        id,
        name,
        description,
        length,
        unit,
        minivalue,
        maxvalue
      FROM signals
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all signals.');
  }
}
