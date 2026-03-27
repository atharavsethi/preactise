import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { approveAnswer, rejectAnswer, verifyUser } from "./actions";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  let pendingAnswers: any[] = [];
  let pendingUsers: any[] = [];

  try {
     const ansRes = await fetch("http://localhost:8000/api/forum/answers/", { cache: 'no-store' });
     if (ansRes.ok) {
        const allAns = await ansRes.json();
        pendingAnswers = allAns.filter((a: any) => !a.is_verified);
     }
     
     const userRes = await fetch("http://localhost:8000/api/auth/users/", { cache: 'no-store' });
     if (userRes.ok) {
        const allUsers = await userRes.json();
        pendingUsers = allUsers.filter((u: any) => u.verification_status === 'PENDING' && ['DOCTOR', 'STUDENT'].includes(u.role));
     }
  } catch(e) {
     console.error("Admin fetch error", e);
  }

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ marginBottom: "2rem", color: "var(--color-heading)" }}>Admin Dashboard</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        
        {/* Pending Professional Verifications */}
        <div className="card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--color-saffron)" }}>Pending Professionals</h2>
          {pendingUsers.length === 0 ? (
            <p>No pending verifications.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {pendingUsers.map(user => (
                <li key={user.id} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <strong>{user.name}</strong> ({user.email})<br/>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    Role: {user.role} | License: {user.medical_license || 'N/A'} | Specialty: {user.specialty}
                  </span>
                  <div style={{ marginTop: "0.5rem" }}>
                    <form action={verifyUser}>
                      <input type="hidden" name="userId" value={user.id} />
                      <button type="submit" className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>
                        Verify Medical Credential
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pending Answers */}
        <div className="card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--color-green)" }}>Answers Awaiting Moderation</h2>
          {pendingAnswers.length === 0 ? (
            <p>No answers require moderation.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {pendingAnswers.map(ans => (
                <li key={ans.id} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>"{ans.content}"</p>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                     By: {ans.author?.email}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <form action={approveAnswer}>
                      <input type="hidden" name="answerId" value={ans.id} />
                      <button type="submit" className="btn btn-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem", background: "var(--color-green)", borderColor: "var(--color-green)" }}>
                        Approve
                      </button>
                    </form>
                    <form action={rejectAnswer}>
                      <input type="hidden" name="answerId" value={ans.id} />
                      <button type="submit" className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem", color: "#dc2626", borderColor: "#dc2626" }}>
                        Reject / Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
