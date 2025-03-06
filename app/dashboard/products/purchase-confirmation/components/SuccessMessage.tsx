import { CheckCircle2 } from 'lucide-react';

interface SuccessMessageProps {
  credits: number;
}

export function SuccessMessage({ credits }: SuccessMessageProps) {
  return (
    <div className="rounded-lg bg-green-50 border border-green-200 p-4">
      <div className="flex gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-green-800">Transaction Complete</p>
          <p className="text-sm text-green-700 mt-1">
            Your payment has been processed successfully. {credits} tokens have
            been added to your account. You can now use these tokens to view
            property details.
          </p>
        </div>
      </div>
    </div>
  );
}
