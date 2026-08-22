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

    const inputUser = username.trim().toLowerCase();
    const configuredUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();

    // 1. Check Environment Variable Fallback Authentication
    // Accepts either the configured username (e.g. 'arefi') or 'admin'
    if (inputUser === configuredUser || inputUser === 'admin') {
      let isMatch = false;

      // Option A: Direct plain password in env (ADMIN_PASSWORD)
      if (process.env.ADMIN_PASSWORD && password.trim() === process.env.ADMIN_PASSWORD.trim()) {
        isMatch = true;
      }
      // Option B: Bcrypt hash in env (ADMIN_FALLBACK_HASH)
      else if (process.env.ADMIN_FALLBACK_HASH) {
        const cleanHash = process.env.ADMIN_FALLBACK_HASH.trim().replace(/^["']|["']$/g, '');
        try {
          isMatch = await bcrypt.compare(password.trim(), cleanHash);
        } catch (err) {
          console.error('Bcrypt comparison error with ADMIN_FALLBACK_HASH:', err);
        }
      }
      // Option C: Built-in default hash for password 'admin123'
      if (!isMatch && inputUser === 'admin') {
        isMatch = await bcrypt.compare(password.trim(), DEFAULT_LOCAL_HASH);
      }

      if (isMatch) {
        const token = await createAdminSession(inputUser);
        const res = NextResponse.json({ success: true, username: inputUser });
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

    // 2. Query Supabase admin_users table (if Supabase is configured)
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { data: admin, error } = await supabaseAdmin
          .from('admin_users')
          .select('username, password_hash')
          .eq('username', inputUser)
          .maybeSingle();

        if (!error && admin && admin.password_hash) {
          const isPasswordValid = await bcrypt.compare(password.trim(), admin.password_hash.trim());
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
        console.warn('Supabase authentication lookup failed:', dbError?.message || dbError);
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
