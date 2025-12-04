export const Main = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="[grid-area:channelMain]">{children}</main>;
};
