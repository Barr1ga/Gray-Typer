import React from 'react'
import { FaGlobeAmericas, FaKeyboard, FaExclamation, FaClock } from "react-icons/fa"
import { LowerCase } from './customIcons/LowerCase';
import { Numbers } from './customIcons/Numbers';
import { Punctuations } from './customIcons/Punctuations';
import { UpperCase } from './customIcons/UpperCase';

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = ({ }) => {
    return (<>
        <div className="extra-buttons">
            <div className="options">
                <div className="key">TAB</div>
                /
                <span className="combination">
                    <div className="key">CTRL</div>
                    <p>+</p>
                    <div className="key">R</div>
                </span>
            </div>
            <p>—</p>
            <p>Restart</p>
        </div>
        <div className="footer">
            <div className="item"><FaGlobeAmericas></FaGlobeAmericas> English</div>
            <div className="item"><FaKeyboard></FaKeyboard> Keyboard</div>
            <div className="separator"></div>
            <div className="item"><Punctuations></Punctuations> Punctuations</div>
            <div className="item"><UpperCase></UpperCase> Uppercase</div>
            <div className="item"><LowerCase></LowerCase> Lowercase</div>
            <div className="item"><Numbers></Numbers> Numbers</div>
            <div className="item"><FaClock></FaClock> Time</div>
        </div>
    </>);
}