import React from "react";
import sass from "./FastLinks.module.sass";

import { BaseButton } from "../../../shared/ui";

import { AiOutlineYoutube, AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai';
import { FaYandex } from 'react-icons/fa';
import { HiTranslate } from 'react-icons/hi';
import { BsTelegram, BsTwitch } from 'react-icons/bs';
import { SlSocialVkontakte } from 'react-icons/sl';

const links = [
  {
    href: "https://ya.ru/",
    icon: <FaYandex />
  },
  {
    href: "https://www.google.ru/",
    icon: <AiFillGoogleCircle />
  },
  {
    href: "https://www.youtube.com/",
    icon: <AiOutlineYoutube />
  },
  {
    href: "https://www.twitch.tv/",
    icon: <BsTwitch />
  },
  {
    href: "https://vk.com/",
    icon: <SlSocialVkontakte />
  },
  {
    href: "https://telegram.org/",
    icon: <BsTelegram />
  },
  {
    href: "https://facebook.com",
    icon: <AiFillFacebook />
  },
  {
    href: "https://translate.yandex.ru",
    icon: <HiTranslate />
  }
]

const FastLinks = () => {
  return (
    <div className={sass.main}>
      {
        links.map((el) => {
          return (
            <a href={el.href} target="_blank" rel="noopener noreferrer">
              <BaseButton>{el.icon}</BaseButton>
            </a>
          );
        })
      }
    </div >
  );
}

export { FastLinks };