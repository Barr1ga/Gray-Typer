import React from "react";
import {
  FaKeyboard,
} from "react-icons/fa";
import useTextHandler from "../hooks/useTextHandler";

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
          <span className="combination">
            <div className="key">TAB</div>
            <p>/</p>
            <div className="key">ESC</div>
          </span>
        </div>
        <p>—</p>
        <p>Restart</p>
      </div>
    </>
  );
};
