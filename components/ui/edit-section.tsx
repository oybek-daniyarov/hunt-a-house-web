'use client';

import { Button } from "@/components/ui/button";
import { Check, Pen, X } from "lucide-react";

interface EditSectionProps {
  title: string;
  isEditing: boolean;
  isDisabled: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export function EditSection({
  title,
  isEditing,
  isDisabled,
  onEdit,
  onSave,
  onCancel,
  children
}: EditSectionProps) {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0 flex items-center gap-1">
        {isEditing ? (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel Edit</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-green-500 hover:text-green-600"
              onClick={onSave}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Save Changes</span>
            </Button>
          </>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 opacity-70 hover:opacity-100 disabled:opacity-30"
            onClick={onEdit}
            disabled={isDisabled}
          >
            <Pen className="h-4 w-4" />
            <span className="sr-only">Edit {title}</span>
          </Button>
        )}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
} 