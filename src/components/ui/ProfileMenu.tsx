"use client";
import { useEffect, useRef } from "react";
import scss from "./ProfileMenu.module.scss";
import { FC } from "react";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
  logout: () => void;
}

const ProfileMenu: FC<ProfileMenuProps> = () => {
  const { isOpenProfileMenu, setIsOpenProfileMenu } = useHeaderStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleRouterToContact = () => {
    router.push("/telegram-contact")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpenProfileMenu(); 
      }
    };

    if (isOpenProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenProfileMenu, setIsOpenProfileMenu]);

  return (
    <div>
        <div className="container">
        <div
      ref={menuRef}
      className={
        isOpenProfileMenu
          ? `${scss.ProfileMenu} ${scss.active}`
          : `${scss.ProfileMenu}`
      }
    >
      <div className={scss.content}>
		<button onClick={handleRouterToContact}>Связаться</button>
      </div>
    </div>
        </div>
    </div>
  );
};

export default ProfileMenu;
