type FormHeaderProps = {
  title: string;
  description: string;
};

export const FormHeader = ({ title, description }: FormHeaderProps) => {
  if (!title && !description) return null;
  return (
    <div>
      {title && (
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      )}
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
};
