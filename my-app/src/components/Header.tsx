import React from "react";
import {
  FaKeyboard,
  FaDiscord,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import { useAppSelector } from "../app/hooks";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      <div className="header">
        <h1 className="logo">
          <FaKeyboard className="icon"></FaKeyboard>Graytyper
        </h1>
      </div>
      <div className="extra-buttons">
        <div className="options">
          <div className="key">TAB</div>/
          <span className="combination">
            <div className="key">CTRL</div>
            <p>+</p>
            <div className="key">R</div>
          </span>
        </div>
        <p>—</p>
        <p>Restart</p>
      </div>
    </>
  );
};
