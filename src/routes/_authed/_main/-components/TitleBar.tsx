export const TitleBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="h-8 px-3 [grid-area:titleBar]">{children}</div>;
};
