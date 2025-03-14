# Dashboard Shared Components

This directory contains shared components for the dashboard UI to ensure consistent styling and layout across all dashboard pages.

## Components

### PageContainer

A container component that provides consistent spacing and layout for dashboard pages.

```tsx
import { PageContainer } from '../_components';

<PageContainer>{/* Your page content */}</PageContainer>;
```

Props:

- `children`: ReactNode - The content of the page
- `className`: string (optional) - Additional classes to apply to the container
- `centered`: boolean (optional) - Whether to center the content horizontally (default: true)

### PageHeader

A header component for dashboard pages that includes a title and optional description.

```tsx
import { PageHeader } from '../_components';

<PageHeader title="Page Title" description="Optional page description" />;
```

Props:

- `title`: string - The page title
- `description`: string (optional) - The page description
- `children`: ReactNode (optional) - Additional content to render on the right side of the header
- `className`: string (optional) - Additional classes to apply to the header
- `textAlign`: 'start' | 'center' | 'end' (optional) - Text alignment for the title and description (default: 'start')

### Section

A section component for organizing content within dashboard pages.

```tsx
import { Section } from '../_components';

<Section
  title="Section Title"
  description="Optional section description"
  headerRight={<Button>Action</Button>}
>
  {/* Section content */}
</Section>;
```

Props:

- `title`: string (optional) - The section title
- `description`: string (optional) - The section description
- `children`: ReactNode - The content of the section
- `className`: string (optional) - Additional classes to apply to the section
- `headerClassName`: string (optional) - Additional classes to apply to the section header
- `contentClassName`: string (optional) - Additional classes to apply to the section content
- `headerRight`: ReactNode (optional) - Content to render on the right side of the section header
- `textAlign`: 'start' | 'center' | 'end' (optional) - Text alignment for the title and description (default: 'start')

## Usage Example

```tsx
import { PageContainer, PageHeader, Section } from '../_components';

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Welcome to your dashboard" />

      <Section title="Recent Activity">{/* Activity content */}</Section>

      <Section title="Statistics" headerRight={<Button>View All</Button>}>
        {/* Statistics content */}
      </Section>
    </PageContainer>
  );
}
```
