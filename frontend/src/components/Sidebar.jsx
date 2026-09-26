import {
  LayoutDashboard,
  Package,
  PackagePlus,
  PackageMinus,
  ArrowLeftRight,
  ClipboardCheck,
  SlidersHorizontal,
  ShoppingCart,
  Users,
  BarChart3,
  Database,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Inventory",
    icon: Package,
    active: true,
  },
  {
    name: "Receive Stock",
    icon: PackagePlus,
  },
  {
    name: "Issue Stock",
    icon: PackageMinus,
  },
  {
    name: "Stock Transfer",
    icon: ArrowLeftRight,
  },
  {
    name: "Stock Count",
    icon: ClipboardCheck,
  },
  {
    name: "Adjustments",
    icon: SlidersHorizontal,
  },
];

const managementItems = [
  {
    name: "Purchase Orders",
    icon: ShoppingCart,
  },
  {
    name: "Suppliers",
    icon: Users,
  },
  {
    name: "Reports",
    icon: BarChart3,
  },
  {
    name: "Master Data",
    icon: Database,
  },
];

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 bg-slate-950 text-white lg:block">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div>
          <h1 className="text-2xl font-bold">DMart</h1>

          <p className="text-xs text-slate-400">
            Inventory System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Operations
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-emerald-700 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="my-5 border-t border-slate-800" />

        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Management
        </p>

        <div className="space-y-1">
          {managementItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Icon className="h-5 w-5" />

                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="my-5 border-t border-slate-800" />

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800">
          <Settings className="h-5 w-5" />

          <span>Settings</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;