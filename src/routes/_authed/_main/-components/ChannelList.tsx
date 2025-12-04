export const ChannelList = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-67 rounded-tl-xl border-border border-t border-l [grid-area:channelsList]">
      {children}
    </div>
  );
};
