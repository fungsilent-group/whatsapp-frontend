import { Drawer } from "flowbite-react";
import { useAppStore } from "#root/app/store";
import FriendList from "./FriendList";
import Profile from "./Profile";
import NewFriend from "./Addfriend";
import Group from "./AddGroup";

const Container = () => {
  const { primarySection, showSection } = useAppStore();

  const onClose = () => {
    showSection(null);
  };

  return (
    <div className="relative w-[400px] max-lg:w-[300px] max-md:w-[200px] overflow-hidden">
      <FriendList />
      <Drawer
        open={primarySection}
        onClose={onClose}
        className="absolute p-0 bg-slate-900 w-full h-full"
        backdrop={false}
      >
        {primarySection === "profile" && <Profile />}
        {primarySection === "add_friend" && <NewFriend />}
        {primarySection === "add_group" && <Group />}
      </Drawer>
    </div>
  );
};

export default Container;
