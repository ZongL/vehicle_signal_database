import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, signals, zongtest } from '../lib/placeholder-data';

const client = await db.connect();

async function seedzongtest() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS zongtest (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedzongtest = await Promise.all(
    zongtest.map(async (zongtest) => {
      const hashedPassword = await bcrypt.hash(zongtest.password, 10);
      return client.sql`
        INSERT INTO zongtest (id, name, email, password)
        VALUES (${zongtest.id}, ${zongtest.name}, ${zongtest.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedzongtest;
}


async function seedSignals() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS signals (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        length INT NOT NULL,
        byteorder VARCHAR(255) NOT NULL,
        valuetype VARCHAR(255) NOT NULL,
        startbyte INT,
        startbit INT,
        initialvalue INT NOT NULL,
        factor FLOAT NOT NULL,
        sigoffset FLOAT NOT NULL,
        minivalue INT NOT NULL,
        maxvalue INT NOT NULL,
        rawminivalue INT,
        rawmaxvalue INT,
        unit VARCHAR(255) NOT NULL,
        valuedescription TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const insertedSignals = await Promise.all(
      signals.map((signal) => client.sql`
        INSERT INTO signals (id, name, length, byteorder, valuetype, initialvalue, factor, sigoffset, minivalue, maxvalue, unit)
        VALUES (${signal.id}, ${signal.name}, ${signal.length}, ${signal.byteorder}, ${signal.valuetype}, ${signal.initialvalue}, ${signal.factor}, ${signal.sigoffset}, ${signal.minivalue}, ${signal.maxvalue}, ${signal.unit})
        ON CONFLICT (id) DO NOTHING;
      `),
    );

    return insertedSignals;
  }

  async function seedECUs() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS ecus (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.sql`
      CREATE TABLE IF NOT EXISTS ecu_received_messages (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        ecu_id UUID REFERENCES ecus(id) ON DELETE CASCADE,
        message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
        UNIQUE(ecu_id, message_id)
      );
    `;

    // Add sender_ecu_id column to messages table
    await client.sql`
      ALTER TABLE messages ADD COLUMN IF NOT EXISTS sender_ecu_id UUID REFERENCES ecus(id) ON DELETE SET NULL;
    `;

    return { ecus: 'created', ecu_received_messages: 'created' };
  }

  async function seedMessages() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create messages table
    await client.sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        message_id VARCHAR(50) NOT NULL UNIQUE,
        dlc INTEGER NOT NULL DEFAULT 8,
        cycle_time INTEGER,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create message_signals junction table
    await client.sql`
      CREATE TABLE IF NOT EXISTS message_signals (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
        signal_id UUID REFERENCES signals(id) ON DELETE CASCADE,
        start_bit INTEGER NOT NULL,
        position INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Add constraints if they don't exist
    try {
      await client.sql`
        ALTER TABLE message_signals ADD CONSTRAINT unique_message_signal
        UNIQUE(message_id, signal_id)
      `;
    } catch (error) {
      // Constraint might already exist, ignore error
    }

    try {
      await client.sql`
        ALTER TABLE message_signals ADD CONSTRAINT unique_message_start_bit
        UNIQUE(message_id, start_bit)
      `;
    } catch (error) {
      // Constraint might already exist, ignore error
    }

    return { messages: 'created', message_signals: 'created' };
  }


async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      //await seedSignals(); //add by zong
      //await seedMessages(); //add message tables
      await seedECUs(); //add ECU tables
      //await seedzongtest();
      //await seedUsers();
      await client.sql`COMMIT`;

      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }
