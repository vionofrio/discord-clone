export const Page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col border-divider border-t bg-content-1 [grid-area:page]">
      {children}
    </div>
  );
};
