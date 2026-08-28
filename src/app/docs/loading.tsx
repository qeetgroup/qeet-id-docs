export default function LoadingDocs() {
  return (
    <article
      id="main-content"
      tabIndex={-1}
      aria-busy="true"
      aria-label="Loading documentation"
      className="mx-auto w-full max-w-3xl px-6 py-14"
    >
      <div className="h-3 w-28 animate-pulse rounded-sm bg-fd-muted" />
      <div className="mt-7 h-11 w-3/4 animate-pulse rounded-sm bg-fd-muted" />
      <div className="mt-4 h-5 w-full animate-pulse rounded-sm bg-fd-muted" />
      <div className="mt-2 h-5 w-4/5 animate-pulse rounded-sm bg-fd-muted" />
      <div className="mt-10 space-y-3 border-t border-fd-border pt-8">
        <div className="h-4 w-full animate-pulse rounded-sm bg-fd-muted/80" />
        <div className="h-4 w-full animate-pulse rounded-sm bg-fd-muted/80" />
        <div className="h-4 w-2/3 animate-pulse rounded-sm bg-fd-muted/80" />
      </div>
      <span className="sr-only">Loading documentation…</span>
    </article>
  );
}
