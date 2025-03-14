import LaravelPagination from '@/components/laravel/pagination/pagination';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getLeadPurchases } from '@/lib/data/laravel/lead/lead.api';
import { cn, formatDate } from '@/lib/utils';

interface LeadPurchasesHistoryProps {
  page?: number;
}

// Status badge component for better reusability
function StatusBadge({ status }: { status: string }) {
  // Map each status to appropriate styling
  const statusConfig = {
    completed: {
      className: 'bg-green-50 text-green-700 ring-green-600/20',
    },
    pending: {
      className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    },
    failed: {
      className: 'bg-red-50 text-red-700 ring-red-600/20',
    },
    refunded: {
      className: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    },
  } as const;

  // Ensure we have a valid status config or fallback to pending
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <Badge variant="outline" className={cn('capitalize', config.className)}>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}

// Main component with error handling
export default async function LeadPurchasesHistory({
  page = 1,
}: LeadPurchasesHistoryProps) {
  try {
    // Fetch lead purchase history data using the API function
    const response = await getLeadPurchases({ page });
    const purchases = response.data;

    if (purchases.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Lead Purchases</CardTitle>
            <CardDescription>
              You haven&apos;t purchased any leads yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Your lead purchase history will appear here once you purchase a
              lead.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Lead Purchases</CardTitle>
          <CardDescription>Your lead purchase history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Tokens Used</TableHead>
                    <TableHead>Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>
                        {purchase.purchaseDate
                          ? formatDate(purchase.purchaseDate)
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {purchase.leadSummary?.propertyTypeName || 'N/A'} (
                        {purchase.leadSummary?.activityTypeName || 'N/A'})
                      </TableCell>
                      <TableCell>
                        {purchase.leadSummary?.locationSummary || 'N/A'}
                      </TableCell>
                      <TableCell>{purchase.creditsUsed || 0}</TableCell>
                      <TableCell>
                        {purchase.invoiceUrl ? (
                          <a
                            href={purchase.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Invoice
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {response.last_page > 1 && (
            <div className="mt-6 flex items-center justify-center">
              <LaravelPagination
                currentPage={response.current_page}
                lastPage={response.last_page}
                total={response.total}
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching lead purchase history:', error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lead Purchases</CardTitle>
          <CardDescription>Your lead purchase history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-destructive">
              Failed to load lead purchase history. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
}
