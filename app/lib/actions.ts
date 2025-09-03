'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { signalFields, MessageState, CreateMessage, MessageSignal } from './definitions';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// Message creation schema
const MessageSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  message_id: z.string().min(1, { message: 'Message ID is required.' }).regex(/^0x[0-9A-Fa-f]+$/, { message: 'Message ID must be in hex format (e.g., 0x123).' }),
  dlc: z.coerce.number().min(1).max(8, { message: 'DLC must be between 1 and 8.' }),
  cycle_time: z.coerce.number().optional(),
  description: z.string().optional(),
});

// Generate SignalSchema from signalFields
const SignalSchema = z.object(
  Object.fromEntries(
    signalFields.map(f => [
      f.name,
      f.type === 'number' ? z.coerce.number().optional() : z.string().optional()
    ])
  )
);

export type signalState = {
  errors?: {
    name?: string[];
    description?: string[];
    length?: string[];
    byteorder?: string[];
    valuetype?: string[];
    startbyte?: string[];
    startbit?: string[];
    initialvalue?: string[];
    factor?: string[];
    sigoffset?: string[];
    minivalue?: string[];
    maxvalue?: string[];
    rawminivalue?: string[];
    rawmaxvalue?: string[];
    unit?: string[];
    valuedescription?: string[];
  };
  message: string;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

//const CreateSignalss = SignalSchema.omit({ id: true});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createSignals(prevState: signalState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = SignalSchema.safeParse(
    Object.fromEntries(signalFields.map(f => [f.name, formData.get(f.name)]))
  );

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Signal.',
    };
  }

  // Prepare data for insertion into the database
  const insertData = validatedFields.data;
  const fieldNamesArr = signalFields.map(f => f.name);
  const fieldNames = fieldNamesArr.join(', ');
  const fieldParams = fieldNamesArr.map(name => insertData[name] === undefined || insertData[name] === null ? '' : String(insertData[name]));

  try {
    await sql`
      INSERT INTO signals (
        name, description, length, byteorder, valuetype, startbyte, startbit, initialvalue, factor, sigoffset, minivalue, maxvalue, rawminivalue, rawmaxvalue, unit, valuedescription
      ) VALUES (
        ${fieldParams[0]}, ${fieldParams[1]}, ${fieldParams[2]}, ${fieldParams[3]}, ${fieldParams[4]}, ${fieldParams[5]}, ${fieldParams[6]}, ${fieldParams[7]}, ${fieldParams[8]}, ${fieldParams[9]}, ${fieldParams[10]}, ${fieldParams[11]}, ${fieldParams[12]}, ${fieldParams[13]}, ${fieldParams[14]}, ${fieldParams[15]}
      ) RETURNING *;
    `;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Signal.',
    };
  }

  revalidatePath('/dashboard/signals');
  redirect('/dashboard/signals');
}
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// Message creation action
export async function createMessage(
  prevState: MessageState,
  formData: FormData
): Promise<MessageState> {
  // Validate form fields using Zod
  const validatedFields = MessageSchema.safeParse({
    name: formData.get('name'),
    message_id: formData.get('message_id'),
    dlc: formData.get('dlc'),
    cycle_time: formData.get('cycle_time'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Message.',
    };
  }

  const { name, message_id, dlc, cycle_time, description } = validatedFields.data;

  try {
    // Check if message_id already exists
    const existingMessage = await sql`
      SELECT id FROM messages WHERE message_id = ${message_id}
    `;

    if (existingMessage.rows.length > 0) {
      return {
        errors: { message_id: ['Message ID already exists.'] },
        message: 'Message ID must be unique.',
      };
    }

    // Insert the message into the database
    const result = await sql`
      INSERT INTO messages (name, message_id, dlc, cycle_time, description)
      VALUES (${name}, ${message_id}, ${dlc}, ${cycle_time || null}, ${description || null})
      RETURNING id
    `;

    const messageId = result.rows[0].id;

    // Parse signal mappings from form data if any (now optional for create)
    const signalMappings: MessageSignal[] = [];
    const signalIds = formData.getAll('signal_ids');
    const startBits = formData.getAll('start_bits');
    const positions = formData.getAll('positions');

    // Only process signal mappings if they exist
    if (signalIds.length > 0 && startBits.length > 0 && positions.length > 0) {
      for (let i = 0; i < signalIds.length; i++) {
        if (signalIds[i] && startBits[i] && positions[i]) {
          signalMappings.push({
            message_id: messageId,
            signal_id: signalIds[i] as string,
            start_bit: parseInt(startBits[i] as string),
            position: parseInt(positions[i] as string),
          });
        }
      }
    }

    // Insert signal mappings if any
    if (signalMappings.length > 0) {
      for (const mapping of signalMappings) {
        await sql`
          INSERT INTO message_signals (message_id, signal_id, start_bit, position)
          VALUES (${mapping.message_id}, ${mapping.signal_id}, ${mapping.start_bit}, ${mapping.position})
        `;
      }
    }

  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Message.',
    };
  }

  revalidatePath('/dashboard/messages');
  redirect('/dashboard/messages');
}
