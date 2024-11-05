import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import SignIn from '../sign-in';
import { BrainCircuitIcon } from 'lucide-react';
import Link from 'next/link';

const Navbar = async () => {
  return (
    <div className="bg-[#EEE5D9] flex flex-row items-center justify-between w-full px-5 py-2 shadow">
      <BrainCircuitIcon className="w-12 h-12 text-[#222D52] bg-white rounded-full p-2 ring-2 ring-[#222D52]/10" />
      <Menubar>
        <SignIn />
        <MenubarMenu>
          <MenubarTrigger>Lisää</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Tekoälyt</MenubarTrigger>
          <MenubarContent>
            {/* <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub> */}
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/chat" className="w-full">
                Chat
              </Link>
            </MenubarItem>
            <MenubarItem>Kuva</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;
