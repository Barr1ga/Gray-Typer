import React from 'react'
import { FaDiscord, FaFacebook, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <div className="footer">
            <small className="logo">© 2020 Graytyper. All Rights Reserved.</small>
            <ul className="nav">
                <li className="item"><FaEnvelope></FaEnvelope>Contact</li>
                <li className="item"><FaFacebook></FaFacebook>Facebook</li>
                <li className="item"><FaGithub></FaGithub>Github</li>
                <li className="item"><FaDiscord></FaDiscord>Discord</li>
                <li className="item"><FaTwitter></FaTwitter>Twitter</li>
            </ul>
        </div>
    );
}