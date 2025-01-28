'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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

const SignalSchema = z.object({
  // name: z.string({
  //   invalid_type_error: 'Please enter a signal name.',
  // }),
  // length: z.coerce
  //   .number()
  //   .gt(0, { message: 'Please enter a length greater than 0.' }),
  // byteorder: z.enum(['big-endian', 'little-endian'], {
  //   invalid_type_error: 'Please select a byte order.',
  // }),
  // valuetype: z.enum(['signed', 'unsigned'], {
  //   invalid_type_error: 'Please select a value type.',
  // }),
  name: z.string().optional(),
  length: z.coerce.number().optional(),
  byteorder: z.string().optional(),
  valuetype: z.string().optional(),
  initialvalue: z.coerce.number().optional(),
  factor: z.coerce.number().optional(),
  sigoffset: z.coerce.number().optional(),
  minivalue: z.coerce.number().optional(),
  maxvalue: z.coerce.number().optional(),
  unit: z.string().optional(),
});
export type signalState = {
  errors?: {
    name?: string[];
    length?: string[];
    byteorder?: string[];
    valuetype?: string[];
    initialvalue?: string[];
    factor?: string[];
    sigoffset?: string[];
    minivalue?: string[];
    maxvalue?: string[];
    unit?: string[];
  };
  message?: string | null;
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
  const validatedFields = SignalSchema.safeParse({
    name: formData.get('name'),
    length: formData.get('length'),
    byteorder: formData.get('byteorder'),
    valuetype: formData.get('valuetype'),
    initialvalue: formData.get('initialvalue'),
    factor: formData.get('factor'),
    sigoffset: formData.get('sigoffset'),
    minivalue: formData.get('minivalue'),
    maxvalue: formData.get('maxvalue'),
    unit: formData.get('unit'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Signal.',
    };
  }

  // Prepare data for insertion into the database
  const { name, length, byteorder, valuetype, initialvalue, factor, sigoffset, minivalue, maxvalue, unit } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO signals (name, length, byteorder, valuetype, initialvalue, factor, sigoffset, minivalue, maxvalue, unit)
      VALUES (${name}, ${length}, ${byteorder}, ${valuetype}, ${initialvalue}, ${factor}, ${sigoffset}, ${minivalue}, ${maxvalue}, ${unit})
      RETURNING *;
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Signal.',
    };
  }

  // Revalidate the cache for the signals page and redirect the user.
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
