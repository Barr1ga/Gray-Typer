import React from 'react'
import { FaKeyboard, FaDiscord, FaFacebook, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    return (<>
        <div className="header">
            <h1 className="logo"><FaKeyboard className='icon'></FaKeyboard>Graytyper</h1>
            <ul className="nav">
                <li className="item"><FaEnvelope></FaEnvelope>Contact</li>
                <li className="item"><FaFacebook></FaFacebook>Facebook</li>
                <li className="item"><FaGithub></FaGithub>Github</li>
                <li className="item"><FaDiscord></FaDiscord>Discord</li>
                <li className="item"><FaTwitter></FaTwitter>Twitter</li>
            </ul>
        </div>
    </>);
}