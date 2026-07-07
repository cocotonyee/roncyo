import { AppLink } from "@/components/AppLink";

export type BreadcrumbItem = { name: string; path: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--color-muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {isLast ? (
                <span className="font-medium text-[var(--color-foreground)]">{item.name}</span>
              ) : (
                <AppLink href={item.path} className="transition hover:text-[var(--color-foreground)]">
                  {item.name}
                </AppLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
