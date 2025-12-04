export const Page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col border-border border-t bg-surface-1 [grid-area:page]">
      {children}
    </div>
  );
};
