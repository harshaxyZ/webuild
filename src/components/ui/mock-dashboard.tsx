import { Activity, Users, CreditCard, Search, Bell, Settings, ArrowUpRight } from "lucide-react";

export function MockDashboard() {
  return (
    <div className="w-full rounded-[2rem] bg-white border border-slate-200/50 shadow-2xl overflow-hidden flex flex-col pointer-events-none ring-1 ring-slate-900/5">
      {/* Top Nav */}
      <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">W</div>
          <span className="font-semibold text-slate-900">Workspace</span>
        </div>
        
        <div className="hidden md:flex flex-1 max-w-sm h-10 rounded-full bg-slate-50 border border-slate-100 items-center px-4 mx-4">
          <Search size={16} className="text-slate-400 mr-2" />
          <span className="text-sm text-slate-400 truncate">Search projects, clients...</span>
        </div>

        <div className="flex items-center gap-4">
          <Bell size={20} className="text-slate-400" />
          <Settings size={20} className="text-slate-400" />
          <div className="w-9 h-9 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 font-semibold text-sm">
            H
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-slate-50/50 flex flex-col gap-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Overview</h2>
          <div className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600">
            Last 30 Days
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-slate-500">
              <Users size={20} />
              <span className="font-medium text-sm">Total Clients</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-slate-900">455</span>
              <span className="text-emerald-500 text-sm font-medium flex items-center bg-emerald-50 px-2 rounded-full">
                <ArrowUpRight size={14} className="mr-1" /> +12%
              </span>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-slate-500">
              <Activity size={20} />
              <span className="font-medium text-sm">Active Projects</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-slate-900">55</span>
              <span className="text-slate-400 text-sm font-medium">In progress</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-slate-500">
              <CreditCard size={20} />
              <span className="font-medium text-sm">Revenue</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-slate-900">$124k</span>
              <span className="text-emerald-500 text-sm font-medium flex items-center bg-emerald-50 px-2 rounded-full">
                <ArrowUpRight size={14} className="mr-1" /> +24%
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity Mock */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm mt-2">
          <h3 className="font-semibold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">New project deployed</p>
                    <p className="text-xs text-slate-500">Acme Corp Frontend</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
