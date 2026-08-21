import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// DELETE: Revoke/delete an admin user
export async function DELETE(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const targetUsername = params.username.trim().toLowerCase();

    // Check count of admins to prevent deleting the last admin
    const { count } = await supabaseAdmin
      .from('admin_users')
      .select('*', { count: 'exact', head: true });

    if (count && count <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the only remaining admin user.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('admin_users')
      .delete()
      .eq('username', targetUsername);

    if (error) {
      return NextResponse.json(
        { error: `Failed to delete admin: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Admin user "${targetUsername}" revoked successfully.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
