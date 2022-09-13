import React from "react";
import {
  FaDiscord,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="footer">
      <small className="logo">© 2020 Graytyper. All Rights Reserved.</small>
      <ul className="nav">
        <li className="item">
          <small>
            <FaEnvelope></FaEnvelope>
          </small>
          <small>Contact</small>
        </li>
        <li className="item">
          <small>
            <FaFacebook></FaFacebook>
          </small>
          <small>Facebook</small>
        </li>
        <li className="item">
          <small>
            <FaGithub></FaGithub>
          </small>
          <small>Github</small>
        </li>
        <li className="item">
          <small>
            <FaDiscord></FaDiscord>
          </small>
          <small>Discord</small>
        </li>
        <li className="item">
          <small>
            <FaTwitter></FaTwitter>
          </small>
          <small>Twitter</small>
        </li>
      </ul>
    </div>
  );
};
