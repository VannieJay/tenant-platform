import { Plus, Home, Store, Key } from "lucide-react";
import { allUnits, categoryLabels, categoryColors, type TenantCategory } from "@/lib/seed-data";

const unitIcons = {
    residential: Home,
    shop: Store,
    shop_lease: Key,
};

export default function UnitsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Properties & Units</h1>
                    <p className="text-sm text-muted-foreground mt-1">PrinceSteve Residence — {allUnits.length} units</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Plus size={16} />
                    Add Unit
                </button>
            </div>

            {/* Category Tabs */}
            {(["residential", "shop", "shop_lease"] as TenantCategory[]).map((cat) => {
                const units = allUnits.filter((u) => u.category === cat);
                const Icon = unitIcons[cat];
                return (
                    <div key={cat} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColors[cat]}`}>
                                {categoryLabels[cat]}
                            </div>
                            <span className="text-sm text-muted-foreground">{units.length} units</span>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {units.map((unit) => (
                                <div key={unit.id} className="bg-card rounded-lg border shadow-sm p-5 space-y-3 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-muted rounded-md">
                                                <Icon size={18} className="text-muted-foreground" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm">{unit.name}</h3>
                                                <p className="text-xs text-muted-foreground">{unit.type}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border
                                            ${unit.status === 'Occupied' ? 'bg-green-50 text-green-700 border-green-200' :
                                                unit.status === 'Vacant' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                            {unit.status}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 pt-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Rent (Yearly)</span>
                                            <span className="font-medium">₦{unit.rent.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tenant</span>
                                            <span className="font-medium text-primary truncate max-w-[120px]">{unit.tenant}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
