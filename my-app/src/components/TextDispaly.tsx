import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setTyping } from "../features/keyboard/keyboardSlice";
import { FaClock } from "react-icons/fa";
import useTextHandler from "../hooks/useTextHandler";
import { setInitialTime, setWpm } from "../features/result/resultSlice";

interface TextDisplayProps {}

export const TextDisplay: React.FC<TextDisplayProps> = ({}) => {
  const dispatch = useAppDispatch();
  
  const [typeStart, setTypeStart] = useState<Boolean>(false);
  
  const { text, wordsCount, typedText, errorText, initializeText, handleKeyPressed } =
    useTextHandler();

  const {
    language,
    keyboard,
    punctuations,
    uppercase,
    lowercase,
    numbers,
    time,
  } = useAppSelector((state) => state.criterias);

  const { display, typing } = useAppSelector((state) => state.keyboard);

  const { timeStarted, wpm, typedWordsCount, accuracy } = useAppSelector((state) => state.result);

  const inputRef = useRef<HTMLInputElement | null>(null);
  // setInitialTime
  // setWpm,
  useEffect(() => {
    initializeText();
  }, [language, keyboard, punctuations, uppercase, lowercase, numbers, time]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    if (typing) {
      dispatch(setTyping(false));
    }
  };

  const handlePressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!typeStart) {
      setTypeStart(true);
      dispatch(setInitialTime());
    }


    dispatch(setWpm());
    handleKeyPressed(e)
  }

  return (
    <>
      <div className="type">
        <div className="details" style={typing ? display.block : display.none}>
          <h3>
            <FaClock></FaClock>5.00s
          </h3>
          <h3>{typedWordsCount}/{wordsCount}</h3>
          <h3>{accuracy.toFixed(0)}%</h3>
          <h3>{wpm.toFixed(0)}</h3>
        </div>
        <span className="text" onClick={handleFocus}>
          <input
            type="text"
            ref={inputRef}
            onBlur={handleBlur}
            onKeyDown={(e) => handlePressed(e)}
            // onChange={(e) => handleChange(e)}
            className="type-field"
          ></input>
          <p>
            <span className="typed">{typedText}</span>
            <span className="error-typed">{errorText}</span>
            <span className={typing ? "caret" : "caret-blinking"}>|</span>
            <span className="untyped">{text}</span>
          </p>
        </span>
      </div>
    </>
  );
};
