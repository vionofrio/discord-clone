export const TitleBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative isolate flex h-8 items-center justify-between px-3 [grid-area:titleBar]">
      <div />

      <div className="-z-10 absolute inset-0 grid place-items-center">
        <div className="flex items-center gap-2 font-medium text-sm [&>svg]:size-4 [&>svg]:text-muted">
          {children}
        </div>
      </div>

      <div />
    </div>
  );
};
