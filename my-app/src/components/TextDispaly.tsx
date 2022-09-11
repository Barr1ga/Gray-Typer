import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setTyping,
} from "../features/keyboard/keyboardSlice";
import { FaClock } from "react-icons/fa";
import useTextHandler from "../hooks/useTextHandler";

interface TextDisplayProps {}

export const TextDisplay: React.FC<TextDisplayProps> = ({}) => {
  const dispatch = useAppDispatch();
  
  const {
    text,
    typedText,
    errorText,
    initializeText,
    handleKeyPressed,
  } = useTextHandler();

  const { display, typing } = useAppSelector((state) => state.keyboard);

  const { typedWordsCount, accuracy } =
    useAppSelector((state) => state.result);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    initializeText();
  }, []);

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

  return (
    <>
      <div className="type">
        <div className="details" style={typing ? display.block : display.none}>
          <h3>
            <FaClock></FaClock>5.00s
          </h3>
          <h3>{typedWordsCount}/50</h3>
          <h3>{accuracy.toFixed(0)}%</h3>
        </div>
        <span className="text" onClick={handleFocus}>
          <input
            type="text"
            ref={inputRef}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyPressed(e)}
            // onChange={(e) => handleChange(e)}
            className="type-field"
          ></input>
          <p>
            <span className="typed">{typedText}</span>
            <span className="error-typed">{errorText}</span>
            <span className="caret">|</span>
            <span className="untyped">{text}</span>
          </p>
        </span>
      </div>
    </>
  );
};
