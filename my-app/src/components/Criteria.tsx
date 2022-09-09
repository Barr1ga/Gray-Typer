import React, { useCallback } from 'react'
import { FaGlobeAmericas, FaKeyboard, FaClock } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LowerCase } from './customIcons/LowerCase';
import { Numbers } from './customIcons/Numbers';
import { Punctuations } from './customIcons/Punctuations';
import { UpperCase } from './customIcons/UpperCase';
import {
    toggleKeyboard, togglePunctuation,
    toggleUpperCase,
    toggleLowerCase,
    toggleNumbers,
    toggleTime
} from "../features/criteria/criteriaSlice";

interface CriteriaProps {

}

export const Criteria: React.FC<CriteriaProps> = ({ }) => {
    const dispatch = useAppDispatch();
    const { language,
        keyboard,
        punctuations,
        uppercase,
        lowercase,
        numbers,
        time } = useAppSelector((state) => state.criterias);

    console.log(keyboard,
        punctuations,
        uppercase,
        lowercase,
        numbers,
        time);

    return (<>
        
        <div className="criteria">
            <button type="button" className="item">
                <FaGlobeAmericas></FaGlobeAmericas>
                English
            </button>
            <button type="button" className="item" onClick={() => dispatch(toggleKeyboard())}>
                <div className={keyboard ? "on" : "off"}>
                </div><FaKeyboard></FaKeyboard> Keyboard</button>
            <div className="separator"></div>
            <button type="button" className="item" onClick={() => dispatch(togglePunctuation())}>
                <div className={punctuations ? "on" : "off"}></div>
                <Punctuations></Punctuations> Punctuations
            </button>
            <button type="button" className="item" onClick={() => dispatch(toggleUpperCase())}>
                <div className={uppercase ? "on" : "off"}></div>
                <UpperCase></UpperCase> Uppercase
            </button>
            <button type="button" className="item" onClick={() => dispatch(toggleLowerCase())}>
                <div className={lowercase ? "on" : "off"}></div>
                <LowerCase></LowerCase> Lowercase</button>
            <button type="button" className="item" onClick={() => dispatch(toggleNumbers())}>
                <div className={numbers ? "on" : "off"}></div>
                <Numbers></Numbers> Numbers
            </button>
            <button type="button" className="item" onClick={() => dispatch(toggleTime())}>
                <div className={time ? "on" : "off"}></div>
                <FaClock></FaClock> Time
            </button>
        </div>
    </>);
}