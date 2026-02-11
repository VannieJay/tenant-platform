import { createClient } from "@/utils/supabase/server";
import { FileText, Download, UploadCloud } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DocumentsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch documents from storage or DB
    // For demo, we use static list
    const agreements = [
        { id: 1, name: "Tenancy Agreement 2026.pdf", date: "Jan 1, 2026", size: "2.4 MB" },
        { id: 2, name: "House Rules & Regulations.pdf", date: "Jan 1, 2026", size: "1.1 MB" },
    ];

    return (
        <div className="space-y-8">
            <PageHeader
                title="Documents"
                description="Access and download your important tenancy documents."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agreements.map((doc) => (
                    <Card key={doc.id} className="group hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex flex-col h-full justify-between">
                            <div className="flex items-start justify-between">
                                <div className="p-2 bg-primary/10 rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-primary">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-medium truncate text-foreground">{doc.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{doc.date} • {doc.size}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="p-12 bg-muted/20 rounded-lg border border-dashed border-muted-foreground/25 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-background rounded-full mb-4 shadow-sm">
                    <UploadCloud className="text-muted-foreground h-8 w-8" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">No other documents</h3>
                <p className="text-sm text-muted-foreground max-w-sm mt-2">
                    Important documents like rent receipts and maintenance reports will appear here automatically.
                </p>
            </div>
        </div>
    );
}
