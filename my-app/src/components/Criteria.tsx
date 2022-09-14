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
    if (uppercase && !lowercase) {
      dispatch(toggleLowerCase());
    }
    dispatch(toggleUpperCase());
    // initializeText();
  };

  const handleLowerCase = () => {
    if (!uppercase && lowercase) {
      dispatch(toggleUpperCase());
    }
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
        {/* <button type="button" className={time ? "item item-on" : "item"}>
          <label className="form-switch">
            <input type="checkbox" onClick={handleTime} checked={time} />
            <i></i>
            <span>
              <FaClock></FaClock> Time
            </span>
          </label>
        </button> */}
        <div className="separator"></div>
        <button type="button" className={keyboard ? "item item-on" : "item"}>
          <label className="form-switch">
            <input
              readOnly
              type="checkbox"
              onClick={handleKeyboard}
              checked={keyboard}
            />
            <i></i>
            <span>
              <FaKeyboard></FaKeyboard> Keyboard
            </span>
          </label>
        </button>
        <button
          type="button"
          className={punctuations ? "item item-on" : "item"}
        >
          <label className="form-switch">
            <input
              readOnly
              type="checkbox"
              onClick={handlePunctuations}
              checked={punctuations}
            />
            <i></i>
            <span>
              <Punctuations></Punctuations> Punctuations
            </span>
          </label>
        </button>
        <button type="button" className={numbers ? "item item-on" : "item"}>
          <label className="form-switch">
            <input
              readOnly
              type="checkbox"
              onClick={handleNumbers}
              checked={numbers}
            />
            <i></i>
            <span>
              <Numbers></Numbers> Numbers
            </span>
          </label>
        </button>

        <div className="separator"></div>

        <button type="button" className={uppercase ? "item item-on" : "item"}>
          <label className="form-switch">
            <input
              readOnly
              type="checkbox"
              onClick={handleUpperCase}
              checked={uppercase}
            />
            <i></i>
            <span>
              <UpperCase></UpperCase> Uppercase
            </span>
          </label>
        </button>
        <button type="button" className={lowercase ? "item item-on" : "item"}>
          <label className="form-switch">
            <input
              readOnly
              type="checkbox"
              onClick={handleLowerCase}
              checked={lowercase}
            />
            <i></i>
            <span>
              <LowerCase></LowerCase> Lowercase
            </span>
          </label>
        </button>
      </div>
    </>
  );
};
