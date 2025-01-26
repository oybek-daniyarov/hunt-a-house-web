'use client';

import { usePropertyForm } from '@/components/property-generator-ai/providers/property-form-provider';
import { usePropertyGenerator } from '@/components/property-generator-ai/providers/property-generator-provider';
import { Button } from '@/components/ui/button';

const ReviewStepActions = () => {
  const { handleStartOver, handleReviewSubmit, isLoading } =
    usePropertyGenerator();
  const { isEditing } = usePropertyForm();

  return (
    <div className="flex items-center justify-between mx-auto">
      <h2 className="text-lg font-semibold">
        Review & Edit Property Requirements
      </h2>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleStartOver}
          className="text-xs"
          disabled={isLoading || isEditing}
        >
          Start Over
        </Button>
        <Button
          size="sm"
          className="text-xs"
          onClick={handleReviewSubmit}
          disabled={isLoading || isEditing}
        >
          Continue to Preview
        </Button>
      </div>
    </div>
  );
};

export default ReviewStepActions;
