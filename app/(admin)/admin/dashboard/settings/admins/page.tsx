"use client";

import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2, ShieldCheck, AlertCircle, Loader2, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
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
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-5">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Users className="text-blue-600 dark:text-blue-400" size={20} />
          <span>Admin Users &amp; Access Control (Supabase)</span>
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Create and revoke admin accounts with server-side bcrypt hashing. Changes take effect immediately without requiring code redeployments.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-600 dark:text-rose-400 font-medium">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Add New Admin Form */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <UserPlus size={16} className="text-blue-600 dark:text-blue-400" />
          <span>Add New Admin User</span>
        </h2>

        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="e.g. arefi or colleague"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-colors shadow-sm dark:shadow-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password (min 8 chars)</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-colors shadow-sm dark:shadow-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

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
      </div>

      {/* Active Admins List */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
          <span>Active Admin Accounts</span>
        </h2>

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
      </div>
    </div>
  );
}
