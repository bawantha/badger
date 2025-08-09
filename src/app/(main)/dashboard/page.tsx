import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage missions, approve submissions, and monitor engagement.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Admin & Organizer Panel</CardTitle>
          <CardDescription>
            This area is restricted. Here you would find tools to create and edit missions,
            moderate content, and view analytics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Full dashboard functionality is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
