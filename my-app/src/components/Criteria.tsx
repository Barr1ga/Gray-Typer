import React, { useCallback } from "react";
import { FaGlobeAmericas, FaKeyboard, FaClock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { LowerCase } from "./customIcons/LowerCase";
import { Numbers } from "./customIcons/Numbers";
import { Punctuations } from "./customIcons/Punctuations";
import { UpperCase } from "./customIcons/UpperCase";
import {
  toggleKeyboard,
  togglePunctuation,
  toggleUpperCase,
  toggleLowerCase,
  toggleNumbers,
  toggleTime,
} from "../features/criteria/criteriaSlice";
import useTextHandler from "../hooks/useTextHandler";

interface CriteriaProps {}

export const Criteria: React.FC<CriteriaProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {
    language,
    keyboard,
    punctuations,
    uppercase,
    lowercase,
    numbers,
    time,
  } = useAppSelector((state) => state.criterias);

  const handleKeyboard = () => {
    dispatch(toggleKeyboard());
    // initializeText();
  };

  const handlePunctuations = () => {
    dispatch(togglePunctuation());
    // initializeText();
  };

  const handleUpperCase = () => {
    dispatch(toggleUpperCase());
    // initializeText();
  };

  const handleLowerCase = () => {
    dispatch(toggleLowerCase());
    // initializeText();
  };

  const handleNumbers = () => {
    dispatch(toggleNumbers());
    // initializeText();
  };

  const handleTime = () => {
    dispatch(toggleTime());
    // initializeText();
  };

  return (
    <>
      <div className="criteria">
        <button type="button" className="item">
          <FaGlobeAmericas></FaGlobeAmericas>
          English
        </button>
        <button
          type="button"
          className={keyboard ? "item item-on" : "item"}
          onClick={handleKeyboard}
        >
          <div className={keyboard ? "on" : "off"}></div>
          <FaKeyboard></FaKeyboard> Keyboard
        </button>
        <div className="separator"></div>
        <button
          type="button"
          className={punctuations ? "item item-on" : "item"}
          onClick={handlePunctuations}
        >
          <div className={punctuations ? "on" : "off"}></div>
          <Punctuations></Punctuations> Punctuations
        </button>
        <button
          type="button"
          className={uppercase ? "item item-on" : "item"}
          onClick={handleUpperCase}
        >
          <div className={uppercase ? "on" : "off"}></div>
          <UpperCase></UpperCase> Uppercase
        </button>
        <button
          type="button"
          className={lowercase ? "item item-on" : "item"}
          onClick={handleLowerCase}
        >
          <div className={lowercase ? "on" : "off"}></div>
          <LowerCase></LowerCase> Lowercase
        </button>
        <button
          type="button"
          className={numbers ? "item item-on" : "item"}
          onClick={handleNumbers}
        >
          <div className={numbers ? "on" : "off"}></div>
          <Numbers></Numbers> Numbers
        </button>
        <button
          type="button"
          className={time ? "item item-on" : "item"}
          onClick={handleTime}
        >
          <div className={time ? "on" : "off"}></div>
          <FaClock></FaClock> Time
        </button>
      </div>
    </>
  );
};
