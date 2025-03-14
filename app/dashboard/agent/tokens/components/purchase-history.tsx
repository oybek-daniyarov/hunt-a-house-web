import { Suspense } from 'react';

import LaravelPagination from '@/components/laravel/pagination/pagination';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPaymentHistory } from '@/lib/data/laravel/product/product.api';
import { cn, formatDate, toMoney } from '@/lib/utils';

// Type reference for PaymentStatus
type PaymentStatus = App.Enums.PaymentStatus;

interface PurchaseHistoryProps {
  page?: number;
}

// Status badge component for better reusability
function StatusBadge({ status }: { status: PaymentStatus }) {
  // Map each payment status to appropriate styling
  // PaymentStatus enum values:
  // - succeeded: Payment completed successfully
  // - processing: Payment is being processed
  // - requires_payment_method: Payment needs a payment method
  // - requires_confirmation: Payment needs confirmation
  // - requires_action: Payment needs additional action
  // - requires_capture: Payment needs to be captured
  // - canceled: Payment was canceled
  // - failed: Payment failed
  const statusConfig = {
    succeeded: {
      variant: 'success' as const,
      className: 'bg-green-50 text-green-700 ring-green-600/20',
    },
    processing: {
      variant: 'warning' as const,
      className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    },
    requires_payment_method: {
      variant: 'warning' as const,
      className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    },
    requires_confirmation: {
      variant: 'warning' as const,
      className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    },
    requires_action: {
      variant: 'warning' as const,
      className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    },
    requires_capture: {
      variant: 'warning' as const,
      className: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    },
    canceled: {
      variant: 'info' as const,
      className: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    },
    failed: {
      variant: 'destructive' as const,
      className: 'bg-red-50 text-red-700 ring-red-600/20',
    },
  } as const;

  // Ensure we have a valid status config or fallback to failed
  const config = statusConfig[status] || statusConfig.failed;

  return (
    <Badge variant="outline" className={cn('capitalize', config.className)}>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}

// Loading skeleton for the table
function PurchaseHistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Main component with error handling
async function PurchaseHistoryContent({ page = 1 }: PurchaseHistoryProps) {
  try {
    // Fetch payment history data
    const response = await getPaymentHistory({ page });
    const payments = response.data;

    if (payments.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
            <CardDescription>
              You haven&apos;t made any purchases yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Your purchase history will appear here once you make a purchase.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>Your recent purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{formatDate(payment.createdAt)}</TableCell>
                      <TableCell>
                        {toMoney(
                          payment.amount.amount,
                          payment.amount.currency
                        )}
                      </TableCell>
                      <TableCell>{payment.credits}</TableCell>
                      <TableCell>
                        <StatusBadge status={payment.status} />
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
    console.error('Error fetching purchase history:', error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>Your recent purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-destructive">
              Failed to load purchase history. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
}

// Export the component with Suspense for better loading experience
export default function PurchaseHistory(props: PurchaseHistoryProps) {
  return (
    <Suspense fallback={<PurchaseHistorySkeleton />}>
      <PurchaseHistoryContent {...props} />
    </Suspense>
  );
}
