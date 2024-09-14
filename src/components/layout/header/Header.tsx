"use client"

import React from 'react'
import scss from "./Header.module.scss";
import MenuIcon from '@mui/icons-material/Menu';
import ProfileMenu from '@/components/ui/ProfileMenu';
import { useHeaderStore } from '@/stores/useHeaderStore';
import { useRouter } from 'next/navigation';

const Header = () => {
	const { isOpenProfileMenu, setIsOpenProfileMenu } = useHeaderStore();
  const router = useRouter();

  const handleProfileClick = () => {
    setIsOpenProfileMenu();
  };

  const handleRouterToHome = () => {
    router.push('/');
  }

  return (
    <header className={scss.header}>
        <div className="container">
            <div className={scss.content}>
                <h1 onClick={handleRouterToHome}>A translator.</h1>

                <div className={scss.user_section} onClick={handleProfileClick}>
                    <MenuIcon sx={{fontSize: "40px"}}/>
                    {isOpenProfileMenu && <ProfileMenu />}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header