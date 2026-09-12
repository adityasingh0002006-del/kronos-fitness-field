"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Flame,
  LogOut,
  Users,
  UserPlus,
  Shield,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Search,
  Calendar,
  Utensils,
} from "lucide-react";
import {
  Member,
  TrialRequest,
  getMembers,
  getTrialRequests,
  saveMembers,
  saveTrialRequests,
  INITIAL_SPLITS,
  INITIAL_MEALS,
  DEMO_MEMBERS,
  DaySplit,
} from "@/lib/kronos-store";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>(() => {
    if (typeof window !== "undefined") {
      return getMembers();
    }
    return DEMO_MEMBERS;
  });
  const [trialRequests, setTrialRequests] = useState<TrialRequest[]>(() => getTrialRequests());
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Member Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("iron123");
  const [newTrainer, setNewTrainer] = useState("Coach Vikram");
  const [newDietStatus, setNewDietStatus] = useState<"Active" | "Pending" | "Inactive">("Active");
  const [newDietTitle, setNewDietTitle] = useState("High-Protein Muscle Protocol");
  const [newDietNotes, setNewDietNotes] = useState("High protein meal schedule with eggs, oats, chicken/paneer, and whey.");
  // 7-day workout split targets
  const [splitMonday, setSplitMonday] = useState("Chest & Triceps");
  const [splitTuesday, setSplitTuesday] = useState("Back & Biceps");
  const [splitWednesday, setSplitWednesday] = useState("Legs");
  const [splitThursday, setSplitThursday] = useState("Shoulders & Abs");
  const [splitFriday, setSplitFriday] = useState("Arms");
  const [splitSaturday, setSplitSaturday] = useState("Conditioning");
  const [splitSunday, setSplitSunday] = useState("Rest");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("kronos_staff_auth");
      localStorage.removeItem("kronos_staff_user");
    }
    router.push("/");
  };

  const handleDeleteMember = (phone: string, name: string) => {
    if (window.confirm(`CONFIRM REMOVAL: Expel athlete "${name}" (${phone}) from KRONOS roster?`)) {
      const updated = members.filter((m) => m.phone !== phone);
      setMembers(updated);
      saveMembers(updated);
      showToast(`Athlete "${name}" expelled from active roster.`);
    }
  };

  const handleTrialRequestDecision = (requestId: string, status: "Allowed" | "Denied") => {
    const updated = trialRequests.map((request) =>
      request.id === requestId ? { ...request, status } : request
    );
    setTrialRequests(updated);
    saveTrialRequests(updated);
    showToast(`Day pass request ${status.toLowerCase()} successfully.`);
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    // Check duplicate phone
    if (members.some((m) => m.phone === newPhone.trim())) {
      alert(`Athlete with phone ${newPhone} already exists!`);
      return;
    }

    const customSplits: DaySplit[] = [
      {
        day: "Monday",
        target: splitMonday || "Chest & Triceps",
        focus: "Heavy Compound Warfare",
        exercises: INITIAL_SPLITS[0].exercises,
      },
      {
        day: "Tuesday",
        target: splitTuesday || "Back & Biceps",
        focus: "Lat Width & Posterior Density",
        exercises: INITIAL_SPLITS[1].exercises,
      },
      {
        day: "Wednesday",
        target: splitWednesday || "Legs",
        focus: "Quad Destruction & Hamstring Torque",
        exercises: INITIAL_SPLITS[2].exercises,
      },
      {
        day: "Thursday",
        target: splitThursday || "Shoulders & Abs",
        focus: "Deltoid Boulder Caps & Core Shield",
        exercises: INITIAL_SPLITS[3].exercises,
      },
      {
        day: "Friday",
        target: splitFriday || "Arms",
        focus: "Arm Pump Overload",
        exercises: INITIAL_SPLITS[4].exercises,
      },
      {
        day: "Saturday",
        target: splitSaturday || "Conditioning",
        focus: "Metabolic Conditioning",
        exercises: INITIAL_SPLITS[5].exercises,
      },
      {
        day: "Sunday",
        target: splitSunday || "Rest",
        focus: "Tissue Repair & Nutrition",
        exercises: INITIAL_SPLITS[6].exercises,
      },
    ];

    const newMember: Member = {
      id: newPhone.trim(),
      name: newName.trim(),
      phone: newPhone.trim(),
      password: newPassword.trim() || "iron123",
      trainer: newTrainer,
      dietStatus: newDietStatus,
      dietPlanTitle: newDietTitle.trim() || "Active High-Protein Plan",
      dietNotes: newDietNotes.trim() || "Follow daily macro recommendations.",
      joinDate: new Date().toISOString().split("T")[0],
      splits: customSplits,
      meals: INITIAL_MEALS,
    };

    const updated = [newMember, ...members];
    setMembers(updated);
    saveMembers(updated);

    // Reset form and close
    setNewName("");
    setNewPhone("");
    setNewPassword("iron123");
    setIsAddModalOpen(false);
    showToast(`Athlete "${newMember.name}" successfully inducted into KRONOS roster!`);
  };

  const handleUpdateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    const updated = members.map((m) => (m.phone === editingMember.phone ? editingMember : m));
    setMembers(updated);
    saveMembers(updated);
    setEditingMember(null);
    showToast(`Member profile for "${editingMember.name}" updated successfully.`);
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.trainer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070709] text-[#f3f4f6] flex flex-col relative bg-tactical-grid selection:bg-[#dc2626] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121217] border-2 border-[#facc15] text-[#facc15] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex items-center gap-3 animate-fade-in font-mono text-xs clip-chamfer-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP COMMAND HEADER */}
      <header className="sticky top-0 z-40 bg-[#0c0c10]/95 backdrop-blur-md border-b-2 border-zinc-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#dc2626] flex items-center justify-center clip-chamfer group-hover:bg-[#ef4444] transition-colors shadow-md shadow-red-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="font-bebas text-xl sm:text-2xl tracking-wider text-white flex items-center gap-2">
                  <span className="text-[#ef4444]">COMMAND CENTER</span>
                  <span className="text-zinc-600">|</span>
                  <span>KRONOS FITNESS FIELD</span>
                </div>
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase -mt-0.5">
                  OWNER &amp; STAFF MANAGEMENT SYSTEM {"//"} SANIGAWAN RD HQ
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#171214] border border-[#dc2626]/50 px-3 py-1.5 font-mono text-xs text-[#ef4444]">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
              <span>OWNER ROOT ACCESS</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1a1315] hover:bg-[#dc2626] text-zinc-300 hover:text-white border border-[#dc2626]/40 hover:border-[#dc2626] font-mono text-xs uppercase tracking-wider transition-all duration-200 clip-chamfer-sm cursor-pointer"
              id="admin-logout-btn"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
        {/* Crimson Hazard Accent Line */}
        <div className="h-1.5 w-full hazard-stripes-crimson" />
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0e0e12] border-2 border-zinc-800 p-4 clip-chamfer">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              TOTAL ATHLETES
            </div>
            <div className="font-bebas text-4xl text-white mt-1 flex items-baseline justify-between">
              <span>{members.length}</span>
              <Users className="w-5 h-5 text-[#facc15]" />
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">
              Active Battle Roster
            </div>
          </div>

          <div className="bg-[#0e0e12] border-2 border-zinc-800 p-4 clip-chamfer">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              STAFF TRAINERS
            </div>
            <div className="font-bebas text-4xl text-white mt-1 flex items-baseline justify-between">
              <span>2 COACHES</span>
              <Shield className="w-5 h-5 text-[#ef4444]" />
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-1">
              Coach Vikram &amp; Coach Rakesh
            </div>
          </div>

          <div className="bg-[#0e0e12] border-2 border-zinc-800 p-4 clip-chamfer">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              ACTIVE DIET PLANS
            </div>
            <div className="font-bebas text-4xl text-white mt-1 flex items-baseline justify-between">
              <span>{members.filter((m) => m.dietStatus === "Active").length}</span>
              <Utensils className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-1">
              High-Protein Protocols
            </div>
          </div>

          <div className="bg-[#0e0e12] border-2 border-zinc-800 p-4 clip-chamfer">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              FACILITY STATUS
            </div>
            <div className="font-bebas text-4xl text-[#facc15] mt-1 flex items-baseline justify-between">
              <span>DEPLOYED</span>
              <Flame className="w-5 h-5 text-[#facc15]" />
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-1">
              Kanpur HQ 05:00 - 22:00
            </div>
          </div>
        </div>

        {/* CONTROLS BAR: Search & Add Member Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0d0d11] border-2 border-zinc-800 p-4 clip-chamfer">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member by name, phone or trainer..."
              className="w-full bg-[#14141a] border border-zinc-700 text-white pl-10 pr-4 py-2 font-mono text-xs placeholder-zinc-500 focus:outline-none focus:border-[#facc15]"
              id="admin-search-input"
            />
          </div>

          {/* Add New Member CTA */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-[#facc15] hover:bg-[#ffe600] text-black font-bebas text-xl tracking-wider clip-chamfer flex items-center justify-center gap-2 transition-all font-bold box-glow-yellow active:scale-95 cursor-pointer"
            id="open-add-member-modal-btn"
          >
            <UserPlus className="w-5 h-5" />
            <span>ADD NEW MEMBER</span>
          </button>
        </div>

        {/* ONE-DAY PASS REQUESTS */}
        <div className="bg-[#0c0c10] border-2 border-[#facc15]/50 clip-chamfer overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-5 bg-[#121217] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#facc15]" />
              <h3 className="font-bebas text-2xl tracking-wider text-white">1-DAY PASS REQUESTS</h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {trialRequests.filter((request) => request.status === "Pending").length} PENDING REVIEW
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-[#09090c] border-b border-zinc-800 text-zinc-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Applicant</th>
                  <th className="py-3.5 px-4 font-bold">Phone</th>
                  <th className="py-3.5 px-4 font-bold">Preferred Slot</th>
                  <th className="py-3.5 px-4 font-bold">Focus</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {trialRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono">
                      NO DAY PASS REQUESTS YET
                    </td>
                  </tr>
                ) : (
                  trialRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-[#13131a] transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bebas text-xl text-white">{request.name}</div>
                        <div className="text-[10px] text-zinc-500">{request.id}</div>
                      </td>
                      <td className="py-4 px-4 text-zinc-300">{request.phone}</td>
                      <td className="py-4 px-4 text-zinc-300">{request.timeSlot}</td>
                      <td className="py-4 px-4 text-zinc-300">{request.discipline}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                            request.status === "Allowed"
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-400"
                              : request.status === "Denied"
                              ? "bg-red-950/60 border-red-500 text-red-400"
                              : "bg-amber-950/60 border-amber-500 text-amber-400"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {request.status === "Pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleTrialRequestDecision(request.id, "Allowed")}
                              className="px-2.5 py-1.5 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/50 transition-colors clip-chamfer-sm cursor-pointer"
                              title="Allow day pass"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> ALLOW
                            </button>
                            <button
                              onClick={() => handleTrialRequestDecision(request.id, "Denied")}
                              className="px-2.5 py-1.5 bg-red-950/60 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 transition-colors clip-chamfer-sm cursor-pointer"
                              title="Deny day pass"
                            >
                              <X className="w-3.5 h-3.5 inline mr-1" /> DENY
                            </button>
                          </div>
                        ) : (
                          <span className="text-zinc-600">DECISION RECORDED</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* REGISTERED MEMBERS TABLE */}
        <div className="bg-[#0c0c10] border-2 border-zinc-800 clip-chamfer overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-5 bg-[#121217] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#facc15]" />
              <h3 className="font-bebas text-2xl tracking-wider text-white">
                REGISTERED ATHLETES ROSTER
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              SHOWING {filteredMembers.length} OF {members.length} ATHLETES
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs" id="members-table">
              <thead>
                <tr className="bg-[#09090c] border-b border-zinc-800 text-zinc-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Athlete Name</th>
                  <th className="py-3.5 px-4 font-bold">Phone / Member ID</th>
                  <th className="py-3.5 px-4 font-bold">Assigned Trainer</th>
                  <th className="py-3.5 px-4 font-bold">Diet Status</th>
                  <th className="py-3.5 px-4 font-bold">Enrolled Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono">
                      NO ATHLETES FOUND MATCHING QUERY
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((m) => (
                    <tr
                      key={m.phone}
                      className="hover:bg-[#13131a] transition-colors group"
                    >
                      {/* Name */}
                      <td className="py-4 px-4 font-semibold text-white group-hover:text-[#facc15] transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#facc15]" />
                          <span className="font-bebas text-xl">{m.name}</span>
                          {m.phone === "9580650262" && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/40 uppercase">
                              DEMO PRIME
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Phone / ID */}
                      <td className="py-4 px-4 text-zinc-300">
                        <span className="px-2 py-1 bg-black/60 border border-zinc-800 text-zinc-200">
                          {m.phone}
                        </span>
                      </td>

                      {/* Trainer */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 text-zinc-200 font-bold">
                          <Shield className="w-3.5 h-3.5 text-[#ef4444]" />
                          {m.trainer}
                        </span>
                      </td>

                      {/* Diet Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                            m.dietStatus === "Active"
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-400"
                              : m.dietStatus === "Pending"
                              ? "bg-amber-950/60 border-amber-500 text-amber-400"
                              : "bg-zinc-900 border-zinc-700 text-zinc-500"
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {m.dietStatus}
                        </span>
                      </td>

                      {/* Join Date */}
                      <td className="py-4 px-4 text-zinc-400">
                        {m.joinDate || "2024-01-15"}
                      </td>

                      {/* Actions (Edit / Delete) */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingMember(m)}
                            className="p-1.5 bg-[#181820] hover:bg-[#facc15] text-zinc-300 hover:text-black border border-zinc-700 hover:border-[#facc15] transition-colors clip-chamfer-sm cursor-pointer"
                            title="Edit Member"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(m.phone, m.name)}
                            className="p-1.5 bg-[#1b1213] hover:bg-[#ef4444] text-[#ef4444] hover:text-white border border-[#ef4444]/40 hover:border-[#ef4444] transition-colors clip-chamfer-sm cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* "ADD NEW MEMBER" MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0e0e13] border-2 border-[#facc15] shadow-[0_0_50px_rgba(250,204,21,0.2)] clip-chamfer my-8">
            <div className="h-2 w-full hazard-stripes" />

            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-[#121218]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#facc15] text-black flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bebas text-2xl tracking-wider text-white">
                    INDUCT NEW KRONOS ATHLETE
                  </h3>
                  <p className="text-zinc-400 text-xs font-mono">
                    Fill out credentials, assigned trainer, diet notes &amp; weekly split.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateMember} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Vikramaditya Singh"
                    className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2.5 font-mono text-xs focus:border-[#facc15] outline-none"
                  />
                </div>

                {/* Phone (Member ID) */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                    Phone / Member ID *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2.5 font-mono text-xs focus:border-[#facc15] outline-none"
                  />
                </div>

                {/* Temporary Password */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                    Temporary Password
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="iron123"
                    className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2.5 font-mono text-xs focus:border-[#facc15] outline-none"
                  />
                </div>

                {/* Assigned Trainer Dropdown */}
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-300 uppercase mb-1">
                    Assigned Trainer
                  </label>
                  <select
                    value={newTrainer}
                    onChange={(e) => setNewTrainer(e.target.value)}
                    className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2.5 font-mono text-xs focus:border-[#facc15] outline-none"
                  >
                    <option value="Coach Vikram">Coach Vikram (Head Strength)</option>
                    <option value="Coach Rakesh">Coach Rakesh (Hypertrophy &amp; Conditioning)</option>
                    <option value="Coach Amit">Coach Amit (Powerlifting Specialist)</option>
                  </select>
                </div>
              </div>

              {/* Diet Plan Section */}
              <div className="pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#facc15] uppercase tracking-wider flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" />
                    Nutrition &amp; Diet Plan
                  </span>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-zinc-300">
                    <span>STATUS:</span>
                    <select
                      value={newDietStatus}
                      onChange={(e) =>
                        setNewDietStatus(e.target.value as "Active" | "Pending" | "Inactive")
                      }
                      className="bg-[#15151c] border border-zinc-700 text-emerald-400 px-2 py-1 text-xs font-mono outline-none"
                    >
                      <option value="Active">Active Plan</option>
                      <option value="Pending">Pending Review</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={newDietTitle}
                    onChange={(e) => setNewDietTitle(e.target.value)}
                    placeholder="Diet Plan Title (e.g. High-Protein Muscle Protocol)"
                    className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2 font-mono text-xs focus:border-[#facc15] outline-none"
                  />
                  <textarea
                    rows={2}
                    value={newDietNotes}
                    onChange={(e) => setNewDietNotes(e.target.value)}
                    placeholder="Diet notes & instructions (eggs, oats, chicken/paneer, whey shake, hydration)..."
                    className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2 font-mono text-xs focus:border-[#facc15] outline-none resize-none"
                  />
                </div>
              </div>

              {/* 7-Day Workout Split Inputs */}
              <div className="pt-2 border-t border-zinc-800">
                <div className="text-xs font-mono font-bold text-[#facc15] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  7-Day Workout Split Assignment
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Mon:</span>
                    <input
                      type="text"
                      value={splitMonday}
                      onChange={(e) => setSplitMonday(e.target.value)}
                      className="w-full bg-[#15151c] border border-zinc-700 text-white px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Tue:</span>
                    <input
                      type="text"
                      value={splitTuesday}
                      onChange={(e) => setSplitTuesday(e.target.value)}
                      className="w-full bg-[#15151c] border border-zinc-700 text-white px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Wed:</span>
                    <input
                      type="text"
                      value={splitWednesday}
                      onChange={(e) => setSplitWednesday(e.target.value)}
                      className="w-full bg-[#15151c] border border-zinc-700 text-white px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Thu:</span>
                    <input
                      type="text"
                      value={splitThursday}
                      onChange={(e) => setSplitThursday(e.target.value)}
                      className="w-full bg-[#15151c] border border-zinc-700 text-white px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Fri:</span>
                    <input
                      type="text"
                      value={splitFriday}
                      onChange={(e) => setSplitFriday(e.target.value)}
                      className="w-full bg-[#15151c] border border-zinc-700 text-white px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Sat:</span>
                    <input
                      type="text"
                      value={splitSaturday}
                      onChange={(e) => setSplitSaturday(e.target.value)}
                      className="w-full bg-[#15151c] border border-zinc-700 text-white px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Sun:</span>
                    <input
                      type="text"
                      value={splitSunday}
                      onChange={(e) => setSplitSunday(e.target.value)}
                      className="w-full bg-[#15151c] border border-zinc-700 text-white px-2 py-1 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#facc15] hover:bg-[#ffe600] text-black font-bebas text-xl tracking-wider clip-chamfer font-bold box-glow-yellow"
                >
                  SAVE &amp; INDUCT ATHLETE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* "EDIT MEMBER" MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0e0e13] border-2 border-[#ef4444] shadow-[0_0_50px_rgba(239,68,68,0.2)] clip-chamfer my-8">
            <div className="h-2 w-full hazard-stripes-crimson" />

            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-[#121218]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#ef4444] text-white flex items-center justify-center font-bold">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bebas text-2xl tracking-wider text-white">
                    EDIT ATHLETE: {editingMember.name}
                  </h3>
                  <p className="text-zinc-400 text-xs font-mono">
                    Modify assigned coach and diet protocol parameters.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingMember(null)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateMember} className="p-6 space-y-4 font-mono text-xs">
              <div>
                <label className="block font-bold text-zinc-300 uppercase mb-1">
                  Athlete Name
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2 outline-none focus:border-[#ef4444]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 uppercase mb-1">
                  Assigned Trainer
                </label>
                <select
                  value={editingMember.trainer}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, trainer: e.target.value })
                  }
                  className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2 outline-none focus:border-[#ef4444]"
                >
                  <option value="Coach Vikram">Coach Vikram (Head Strength)</option>
                  <option value="Coach Rakesh">Coach Rakesh (Hypertrophy &amp; Conditioning)</option>
                  <option value="Coach Amit">Coach Amit (Powerlifting Specialist)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 uppercase mb-1">
                  Diet Status
                </label>
                <select
                  value={editingMember.dietStatus}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      dietStatus: e.target.value as "Active" | "Pending" | "Inactive",
                    })
                  }
                  className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2 outline-none focus:border-[#ef4444]"
                >
                  <option value="Active">Active Plan</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 uppercase mb-1">
                  Diet Plan Title
                </label>
                <input
                  type="text"
                  value={editingMember.dietPlanTitle || ""}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, dietPlanTitle: e.target.value })
                  }
                  className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2 outline-none focus:border-[#ef4444]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-300 uppercase mb-1">
                  Diet Notes &amp; Directives
                </label>
                <textarea
                  rows={3}
                  value={editingMember.dietNotes || ""}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, dietNotes: e.target.value })
                  }
                  className="w-full bg-[#15151c] border border-zinc-700 text-white px-3 py-2 outline-none focus:border-[#ef4444] resize-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bebas text-xl tracking-wider clip-chamfer font-bold box-glow-red"
                >
                  UPDATE ATHLETE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#08080a] py-4 px-4 text-center font-mono text-xs text-zinc-500 mt-12">
        KRONOS COMMAND CENTER {"//"} 270 BHABA NAGAR, SANIGAWAN RD, KANPUR {"//"} SECURE OPERATIONAL DATABASE
      </footer>
    </div>
  );
}
