import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase-admin';

// GET: List all admin users
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, username, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching admin users from Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to fetch admin users' },
        { status: 500 }
      );
    }

    return NextResponse.json({ admins: data || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

// POST: Create a new admin user (hashes password securely on server)
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();

    // Check if user already exists
    const { data: existing } = await supabaseAdmin
      .from('admin_users')
      .select('username')
      .eq('username', cleanUsername)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `An admin with username "${cleanUsername}" already exists.` },
        { status: 400 }
      );
    }

    // Hash password server-side with 12 salt rounds
    const passwordHash = await bcrypt.hash(password, 12);

    const { error: insertError } = await supabaseAdmin
      .from('admin_users')
      .insert({
        username: cleanUsername,
        password_hash: passwordHash,
      });

    if (insertError) {
      console.error('Insert admin error:', insertError);
      return NextResponse.json(
        { error: `Failed to create admin: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin user "${cleanUsername}" created successfully.`,
      username: cleanUsername,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
