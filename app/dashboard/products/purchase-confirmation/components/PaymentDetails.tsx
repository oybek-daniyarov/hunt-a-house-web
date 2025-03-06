interface PaymentDetailsProps {
  paymentId: string;
  formattedDate: string;
  formattedAmount: string;
  currency: string;
  credits: number;
}

export function PaymentDetails({
  paymentId,
  formattedDate,
  formattedAmount,
  currency,
  credits,
}: PaymentDetailsProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-2 text-sm text-muted-foreground">Payment Details</div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>Payment ID:</span>
          <span className="font-medium">{paymentId}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Date:</span>
          <span className="font-medium">{formattedDate}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Amount:</span>
          <span className="font-medium">
            {formattedAmount} {currency}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>Tokens Added:</span>
          <span className="font-medium">{credits}</span>
        </div>
      </div>
    </div>
  );
}
