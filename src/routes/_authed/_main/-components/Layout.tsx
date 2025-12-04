import { ChannelList } from "./ChannelList";
import { GuildList } from "./GuildList";
import { Page } from "./Page";
import { TitleBar } from "./TitleBar";
import { UserPanel } from "./UserPanel";

export const Layout = ({
  titleBar,
  channelsList,
  page,
}: Readonly<{
  titleBar: React.ReactNode;
  channelsList: React.ReactNode;
  page: React.ReactNode;
}>) => {
  return (
    <div className="grid-areas-layout grid h-screen grid-cols-layout grid-rows-layout">
      <TitleBar>{titleBar}</TitleBar>
      {/* <Notice /> */}
      <div className="grid grid-cols-subgrid grid-rows-subgrid [grid-area:titleBarEnd/start/end/end]">
        <div className="relative grid grid-cols-subgrid grid-rows-subgrid [grid-area:titleBarEnd/start/end/channelsEnd] before:absolute before:inset-x-0 before:bottom-0 before:z-10 before:h-2 before:bg-background before:content-['']">
          <GuildList />
          <ChannelList>{channelsList}</ChannelList>
          <UserPanel />
        </div>
        <Page>{page}</Page>
      </div>
    </div>
  );
};
