// ============================================================
// PrinceSteve Residence - Sample Tenant & Unit Data
// 35, Godylove Street, Akowonjo, Egbeda. Lagos
// Tel: 08054164910, 08024427735
// Email: info.vanniejay@gmail.com
// ============================================================

export type TenantCategory = "residential" | "shop" | "shop_lease";

export interface SampleTenant {
    id: number;
    name: string;
    email: string;
    phone: string;
    unit: string;
    category: TenantCategory;
    status: "Active" | "Moving Out" | "Owing" | "New";
    rentAmount: number; // Annual rent in Naira
    leaseStart: string;
    leaseEnd: string;
}

export interface SampleUnit {
    id: number;
    name: string;
    type: string;
    category: TenantCategory;
    rent: number;
    status: "Occupied" | "Vacant" | "Maintenance";
    tenant: string;
}

// ── Landlord / Property Info ──────────────────────────────────
export const propertyInfo = {
    name: "PrinceSteve Residence",
    address: "35, Godylove Street, Akowonjo, Egbeda, Lagos",
    phones: ["08054164910", "08024427735"],
    email: "info.vanniejay@gmail.com",
};

// ── 10 Residential Tenants ────────────────────────────────────
export const residentialTenants: SampleTenant[] = [
    { id: 1, name: "Adebayo Chioma", email: "chioma.adebayo@gmail.com", phone: "08031234567", unit: "Flat A1", category: "residential", status: "Active", rentAmount: 600000, leaseStart: "2025-03-01", leaseEnd: "2026-02-28" },
    { id: 2, name: "Okafor Emmanuel", email: "emma.okafor@gmail.com", phone: "08062345678", unit: "Flat A2", category: "residential", status: "Active", rentAmount: 600000, leaseStart: "2025-06-01", leaseEnd: "2026-05-31" },
    { id: 3, name: "Ibrahim Fatimah", email: "fatimah.ibrahim@yahoo.com", phone: "08073456789", unit: "Flat B1", category: "residential", status: "Owing", rentAmount: 500000, leaseStart: "2025-01-01", leaseEnd: "2025-12-31" },
    { id: 4, name: "Nwosu Chinonso", email: "chinonso.nwosu@gmail.com", phone: "08094567890", unit: "Flat B2", category: "residential", status: "Active", rentAmount: 500000, leaseStart: "2025-04-01", leaseEnd: "2026-03-31" },
    { id: 5, name: "Adeleke Omotola", email: "omotola.adeleke@gmail.com", phone: "08105678901", unit: "Flat C1", category: "residential", status: "Active", rentAmount: 450000, leaseStart: "2025-07-01", leaseEnd: "2026-06-30" },
    { id: 6, name: "Bakare Oluwaseun", email: "seun.bakare@hotmail.com", phone: "08036789012", unit: "Flat C2", category: "residential", status: "New", rentAmount: 450000, leaseStart: "2026-01-01", leaseEnd: "2026-12-31" },
    { id: 7, name: "Yusuf Aisha", email: "aisha.yusuf@gmail.com", phone: "08147890123", unit: "Flat D1", category: "residential", status: "Active", rentAmount: 700000, leaseStart: "2025-02-01", leaseEnd: "2026-01-31" },
    { id: 8, name: "Ogundele Kayode", email: "kayode.ogundele@gmail.com", phone: "08058901234", unit: "Flat D2", category: "residential", status: "Moving Out", rentAmount: 700000, leaseStart: "2024-06-01", leaseEnd: "2025-05-31" },
    { id: 9, name: "Eze Chidinma", email: "chidinma.eze@gmail.com", phone: "07069012345", unit: "Flat E1", category: "residential", status: "Active", rentAmount: 550000, leaseStart: "2025-09-01", leaseEnd: "2026-08-31" },
    { id: 10, name: "Afolabi Temitope", email: "temitope.afolabi@yahoo.com", phone: "08170123456", unit: "Flat E2", category: "residential", status: "Owing", rentAmount: 550000, leaseStart: "2025-05-01", leaseEnd: "2026-04-30" },
];

// ── 10 Shop Tenants ───────────────────────────────────────────
export const shopTenants: SampleTenant[] = [
    { id: 11, name: "Balogun Rasheed", email: "rasheed.balogun@gmail.com", phone: "08081234001", unit: "Shop 1", category: "shop", status: "Active", rentAmount: 350000, leaseStart: "2025-01-01", leaseEnd: "2025-12-31" },
    { id: 12, name: "Okoro Grace", email: "grace.okoro@gmail.com", phone: "08082345002", unit: "Shop 2", category: "shop", status: "Active", rentAmount: 350000, leaseStart: "2025-03-01", leaseEnd: "2026-02-28" },
    { id: 13, name: "Salami Mustapha", email: "mustapha.salami@yahoo.com", phone: "08083456003", unit: "Shop 3", category: "shop", status: "Owing", rentAmount: 400000, leaseStart: "2025-06-01", leaseEnd: "2026-05-31" },
    { id: 14, name: "Adekunle Bukola", email: "bukola.adekunle@gmail.com", phone: "08084567004", unit: "Shop 4", category: "shop", status: "Active", rentAmount: 400000, leaseStart: "2025-02-01", leaseEnd: "2026-01-31" },
    { id: 15, name: "Obi Chukwuma", email: "chukwuma.obi@gmail.com", phone: "08085678005", unit: "Shop 5", category: "shop", status: "New", rentAmount: 300000, leaseStart: "2026-01-01", leaseEnd: "2026-12-31" },
    { id: 16, name: "Fashola Adeola", email: "adeola.fashola@hotmail.com", phone: "08086789006", unit: "Shop 6", category: "shop", status: "Active", rentAmount: 300000, leaseStart: "2025-08-01", leaseEnd: "2026-07-31" },
    { id: 17, name: "Uche Ngozi", email: "ngozi.uche@gmail.com", phone: "08087890007", unit: "Shop 7", category: "shop", status: "Active", rentAmount: 280000, leaseStart: "2025-04-01", leaseEnd: "2026-03-31" },
    { id: 18, name: "Lawal Ismail", email: "ismail.lawal@gmail.com", phone: "08088901008", unit: "Shop 8", category: "shop", status: "Moving Out", rentAmount: 280000, leaseStart: "2024-11-01", leaseEnd: "2025-10-31" },
    { id: 19, name: "Adeyemo Folake", email: "folake.adeyemo@yahoo.com", phone: "08089012009", unit: "Shop 9", category: "shop", status: "Active", rentAmount: 320000, leaseStart: "2025-05-01", leaseEnd: "2026-04-30" },
    { id: 20, name: "Nnamdi Julius", email: "julius.nnamdi@gmail.com", phone: "08080123010", unit: "Shop 10", category: "shop", status: "Active", rentAmount: 320000, leaseStart: "2025-07-01", leaseEnd: "2026-06-30" },
];

// ── 10 Shop Lease Tenants ─────────────────────────────────────
export const shopLeaseTenants: SampleTenant[] = [
    { id: 21, name: "Ogundimu Segun", email: "segun.ogundimu@gmail.com", phone: "08091234101", unit: "Lease Unit 1", category: "shop_lease", status: "Active", rentAmount: 800000, leaseStart: "2024-01-01", leaseEnd: "2026-12-31" },
    { id: 22, name: "Akinwale Damilola", email: "damilola.akinwale@gmail.com", phone: "08092345102", unit: "Lease Unit 2", category: "shop_lease", status: "Active", rentAmount: 800000, leaseStart: "2024-06-01", leaseEnd: "2027-05-31" },
    { id: 23, name: "Oni Olayinka", email: "olayinka.oni@yahoo.com", phone: "08093456103", unit: "Lease Unit 3", category: "shop_lease", status: "Owing", rentAmount: 1000000, leaseStart: "2023-03-01", leaseEnd: "2026-02-28" },
    { id: 24, name: "Chinedu Obiora", email: "obiora.chinedu@gmail.com", phone: "08094567104", unit: "Lease Unit 4", category: "shop_lease", status: "Active", rentAmount: 1000000, leaseStart: "2024-09-01", leaseEnd: "2027-08-31" },
    { id: 25, name: "Sanni Khadija", email: "khadija.sanni@gmail.com", phone: "08095678105", unit: "Lease Unit 5", category: "shop_lease", status: "Active", rentAmount: 750000, leaseStart: "2025-01-01", leaseEnd: "2027-12-31" },
    { id: 26, name: "Oladipo Yemi", email: "yemi.oladipo@hotmail.com", phone: "08096789106", unit: "Lease Unit 6", category: "shop_lease", status: "New", rentAmount: 750000, leaseStart: "2026-01-01", leaseEnd: "2028-12-31" },
    { id: 27, name: "Amadi Ikechukwu", email: "ikechukwu.amadi@gmail.com", phone: "08097890107", unit: "Lease Unit 7", category: "shop_lease", status: "Active", rentAmount: 900000, leaseStart: "2024-04-01", leaseEnd: "2027-03-31" },
    { id: 28, name: "Dosunmu Funke", email: "funke.dosunmu@gmail.com", phone: "08098901108", unit: "Lease Unit 8", category: "shop_lease", status: "Active", rentAmount: 900000, leaseStart: "2024-07-01", leaseEnd: "2027-06-30" },
    { id: 29, name: "Yakubu Amina", email: "amina.yakubu@yahoo.com", phone: "08099012109", unit: "Lease Unit 9", category: "shop_lease", status: "Moving Out", rentAmount: 850000, leaseStart: "2023-01-01", leaseEnd: "2025-12-31" },
    { id: 30, name: "Ojo Babatunde", email: "babatunde.ojo@gmail.com", phone: "08090123110", unit: "Lease Unit 10", category: "shop_lease", status: "Active", rentAmount: 850000, leaseStart: "2024-11-01", leaseEnd: "2027-10-31" },
];

// ── All Tenants Combined ──────────────────────────────────────
export const allTenants: SampleTenant[] = [
    ...residentialTenants,
    ...shopTenants,
    ...shopLeaseTenants,
];

// ── Category Labels ───────────────────────────────────────────
export const categoryLabels: Record<TenantCategory, string> = {
    residential: "Residential",
    shop: "Shop",
    shop_lease: "Shop Lease",
};

export const categoryColors: Record<TenantCategory, string> = {
    residential: "bg-blue-100 text-blue-800",
    shop: "bg-purple-100 text-purple-800",
    shop_lease: "bg-amber-100 text-amber-800",
};

// ── Units derived from tenants ────────────────────────────────
export const allUnits: SampleUnit[] = allTenants.map((t) => ({
    id: t.id,
    name: t.unit,
    type: t.category === "residential" ? "Residential Flat" : t.category === "shop" ? "Shop Space" : "Shop Lease (Long-term)",
    category: t.category,
    rent: t.rentAmount,
    status: (t.status === "Active" || t.status === "Owing" || t.status === "New" ? "Occupied" : "Vacant") as SampleUnit["status"],
    tenant: t.name,
}));
