"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/associates/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Signing out…" : "Logout"}
    </button>
  );
}
