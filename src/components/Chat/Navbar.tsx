import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import SignIn from '../sign-in';
import { BrainCircuitIcon, Image, MessageCircle } from 'lucide-react';
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
            <MenubarItem>New Tab</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Tekoälyt</MenubarTrigger>
          <MenubarContent>
            <MenubarSeparator />
            <MenubarItem>
              <MenubarShortcut>
                <MessageCircle />
              </MenubarShortcut>
              <Link href="/chat" className="w-full">
                Chat{' '}
              </Link>
            </MenubarItem>
            <MenubarItem>
              <MenubarShortcut>
                <Image />
              </MenubarShortcut>
              <Link href="/imageGenerator" className="w-full">
                Kuva
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;
