import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setTyping } from "../features/keyboard/keyboardSlice";
import useTextHandler from "../hooks/useTextHandler";
import { setCompleted, setInitialTime } from "../features/result/resultSlice";

interface TextDisplayProps {}

export const TextDisplay: React.FC<TextDisplayProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState(true);

  const {
    text,
    typedText,
    errorText,
    typeStart,
    setTypeStart,
    initializeText,
    handleKeyPressed,
  } = useTextHandler();

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

  const { adjustedSpeed, errorCount, grossWpm, typedWordsCount, totalWordsCount, accuracy } = useAppSelector(
    (state) => state.result
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    initializeText();
  }, [language, keyboard, punctuations, uppercase, lowercase, numbers, time]);

  const handleFocus = () => {
    setIsFocus(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    handleFocus();
  }, []);

  const handleBlur = () => {
    setIsFocus(false);

    if (typing) {
      dispatch(setTyping(false));
    }
  };

  const handlePressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!typeStart) {
      setTypeStart(true);
      dispatch(setInitialTime());
    }

    handleKeyPressed(e);
  };
  
  if ( (typedWordsCount !== 0 && totalWordsCount !== 0) && (typedWordsCount === totalWordsCount)) {
    dispatch(setTyping(false));
    dispatch(setCompleted());
  }
  console.log(errorCount)
  return (
    <>
      <div className="type">
        <div className="details" style={typing ? display.block : display.none}>
          {/* <h3>
            <FaClock></FaClock>5.00s
          </h3> */}
          <h3>
            {typedWordsCount}/{totalWordsCount}
          </h3>
          <h3>{accuracy.toFixed(0)}%</h3>
          <h3>{grossWpm[grossWpm.length - 1]?.toFixed(0)}</h3>
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
          <p className={isFocus ? "" : "blurred"}>
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
