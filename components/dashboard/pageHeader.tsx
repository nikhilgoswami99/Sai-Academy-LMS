import type { ReactNode } from "react";
import { BrandText } from "@/components/brandText";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            <BrandText text={description} />
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
