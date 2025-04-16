interface LeadStatusProps {
  status: App.Enums.LeadStatus;
  isActive: boolean;
  activatedAt: string | null;
}

const getStatusColor = (status: string, isActive: boolean) => {
  if (!isActive) return 'bg-gray-100 text-gray-800';
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'closed':
      return 'bg-red-100 text-red-800';
    case 'expired':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function LeadStatus({ status, isActive, activatedAt }: LeadStatusProps) {
  return (
    <div className="space-y-1">
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
          status,
          isActive
        )}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      {activatedAt && (
        <p className="text-xs text-gray-500">
          Since {new Date(activatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
