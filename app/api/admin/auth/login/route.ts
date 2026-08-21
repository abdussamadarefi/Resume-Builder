import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAdminSession } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Default local fallback hash for password 'admin123'
const DEFAULT_LOCAL_HASH = '$2b$10$BZBL4CQ.Bz5YI44AWHzVBObMmHFcGP..a5N7P7EpmdfmoAY34m06y';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();

    // 1. Fallback for local development or when Supabase is not seeded
    const fallbackPasswordHash = process.env.ADMIN_FALLBACK_HASH || DEFAULT_LOCAL_HASH;
    if (cleanUsername === 'admin') {
      const isValidFallback = await bcrypt.compare(password, fallbackPasswordHash);
      if (isValidFallback) {
        const token = await createAdminSession('admin');
        const res = NextResponse.json({ success: true, username: 'admin' });
        res.cookies.set('rf_admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        });
        return res;
      }
    }

    // 2. Query Supabase admin_users table (for production database credentials)
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { data: admin, error } = await supabaseAdmin
          .from('admin_users')
          .select('username, password_hash')
          .eq('username', cleanUsername)
          .maybeSingle();

        if (!error && admin) {
          const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
          if (isPasswordValid) {
            const token = await createAdminSession(admin.username);
            const res = NextResponse.json({ success: true, username: admin.username });

            res.cookies.set('rf_admin_token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 7, // 7 days
              path: '/',
            });

            return res;
          }
        }
      } catch (dbError: any) {
        console.warn('Supabase query error during login:', dbError);
      }
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Login failed' },
      { status: 500 }
    );
  }
}
