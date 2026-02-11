import { Search, Filter, UserPlus } from "lucide-react";
import Link from "next/link";
import { allTenants, categoryLabels, categoryColors, type TenantCategory } from "@/lib/seed-data";

export default function TenantsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
                    <p className="text-sm text-muted-foreground mt-1">{allTenants.length} total tenants across all categories</p>
                </div>
                <Link href="/admin/tenants/invite" className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <UserPlus size={16} />
                    Invite Tenant
                </Link>
            </div>

            {/* Category Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
                {(["residential", "shop", "shop_lease"] as TenantCategory[]).map((cat) => {
                    const count = allTenants.filter((t) => t.category === cat).length;
                    const active = allTenants.filter((t) => t.category === cat && t.status === "Active").length;
                    return (
                        <div key={cat} className="bg-card rounded-lg border shadow-sm p-4 flex items-center gap-4">
                            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColors[cat]}`}>
                                {categoryLabels[cat]}
                            </div>
                            <div className="flex-1">
                                <p className="text-xl font-bold">{count}</p>
                                <p className="text-xs text-muted-foreground">{active} active</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tenant Table */}
            <div className="bg-card rounded-lg border shadow-sm">
                <div className="p-4 border-b flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search tenants..."
                            className="w-full rounded-md border border-input pl-9 pr-4 py-2 text-sm bg-background focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-muted">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-3">Tenant</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Unit</th>
                                <th className="px-6 py-3">Rent (Yearly)</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {allTenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-muted/10 group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{tenant.name}</div>
                                        <div className="text-xs text-muted-foreground">{tenant.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[tenant.category]}`}>
                                            {categoryLabels[tenant.category]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{tenant.unit}</td>
                                    <td className="px-6 py-4 font-medium">₦{tenant.rentAmount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${tenant.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                tenant.status === 'Owing' ? 'bg-red-100 text-red-800' :
                                                    tenant.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                            {tenant.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/tenants/${tenant.id}`} className="text-sm font-medium text-primary hover:underline">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
