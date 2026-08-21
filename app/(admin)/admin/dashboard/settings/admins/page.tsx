"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader, Card, FormField, StatusAlert } from '@/components/admin/ui';
import { Users, UserPlus, Trash2, ShieldCheck, Loader2 } from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  created_at: string;
}

export default function AdminUsersCMS() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch admin list');
      setAdmins(data.admins || []);
    } catch (err: any) {
      setError(err.message || 'Could not load admin accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      setError('Please provide both a username and password.');
      return;
    }

    setCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername.trim(),
          password: newPassword.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create admin');

      setSuccess(`Admin "${data.username}" created successfully!`);
      setNewUsername('');
      setNewPassword('');
      fetchAdmins();
    } catch (err: any) {
      setError(err.message || 'Failed to create admin');
    } finally {
      setCreating(false);
    }
  };

  const handleRevokeAdmin = async (username: string) => {
    if (!confirm(`Are you sure you want to revoke admin access for "${username}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(username)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to revoke admin');

      setSuccess(`Admin "${username}" revoked successfully.`);
      fetchAdmins();
    } catch (err: any) {
      setError(err.message || 'Failed to revoke admin');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        icon={Users}
        title="Admin Users & Access Control (Supabase)"
        description="Create and revoke admin accounts with server-side bcrypt hashing. Changes take effect immediately without requiring code redeployments."
      />

      {error && (
        <StatusAlert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <StatusAlert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}

      {/* Add New Admin Form */}
      <Card title="Add New Admin User" icon={UserPlus}>
        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <FormField
            label="Username"
            placeholder="e.g. arefi or colleague"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />

          <FormField
            label="Password (min 8 chars)"
            type="password"
            placeholder="••••••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <div className="flex items-end">
            <button
              type="submit"
              disabled={creating}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-md shadow-blue-500/20"
            >
              {creating ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  <span>Create Admin</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Card>

      {/* Active Admins List */}
      <Card title="Active Admin Accounts" icon={ShieldCheck} iconColor="text-emerald-600 dark:text-emerald-400">
        {loading ? (
          <div className="flex items-center justify-center p-8 text-slate-500 text-xs gap-2">
            <Loader2 size={16} className="animate-spin" />
            <span>Loading admin accounts...</span>
          </div>
        ) : admins.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs">
            No admin users found in Supabase table. Use the form above to add your first admin account.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800/80">
            {admins.map((admin) => (
              <div
                key={admin.id || admin.username}
                className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    {admin.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{admin.username}</span>
                    <p className="text-[10px] text-slate-500">
                      Created: {admin.created_at ? new Date(admin.created_at).toLocaleDateString() : 'Active'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    Active
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRevokeAdmin(admin.username)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Revoke Admin Access"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
