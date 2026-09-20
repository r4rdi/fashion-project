'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = authSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: 'Invalid input' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/catalog');
}

export async function register(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  if (!firstName || !lastName) {
    return { error: 'First and last name are required' };
  }

  const result = authSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: 'Invalid input' };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Create User and Profile in database
  if (data.user) {
    try {
      await prisma.user.create({
        data: {
          id: data.user.id,
          email: data.user.email!,
          profile: {
            create: {
              firstName,
              lastName,
            },
          },
        },
      });
    } catch (dbError) {
      console.error('Error creating user profile in database:', dbError);
      // Depending on requirements, we could delete the auth user here or retry.
    }
  }

  revalidatePath('/', 'layout');
  redirect('/catalog');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
