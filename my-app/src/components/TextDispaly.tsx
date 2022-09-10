import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  keyPressed,
  removeKeyFromPressed,
  setTyping,
} from "../features/keyboard/keyboardSlice";
import {
  incrementErrorCount,
  incrementTypedCharactersCount,
  incrementTypedWordsCount,
  setAccuracy,
} from "../features/result/resultSlice";
import { FaClock } from "react-icons/fa";

interface TextDisplayProps {}

export const TextDisplay: React.FC<TextDisplayProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [typedText, setTypedText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [text, setText] = useState<string>(
    "Lorem ipsum dolor sit amet consectetur adipsicing elit. Maxime molliti, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident."
  );

  const { keyIndex, display, typing } = useAppSelector(
    (state) => state.keyboard
  );

  const { typedWordsCount, accuracy, errorCount, typedCharactersCount } = useAppSelector(
    (state) => state.result
  );

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    dispatch(setAccuracy());
  }, [errorCount, typedCharactersCount]);

  const handleBackPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (!typing) {
      dispatch(setTyping(true));
    }

    // backspace
    if (key === "Backspace") {
      if (errorText.length !== 0) {
        if (errorText.slice(-1) === "_") {
          setText(" ".concat(text));
          setErrorText(errorText.slice(0, -1));
          return;
        }

        const deletedCharacter = errorText.slice(-1);
        setText(deletedCharacter.concat(text));
        setErrorText(errorText.slice(0, -1));
        return;
      }

      if (typedText.length !== 0) {
        const deletedCharacter = typedText.slice(-1);
        setText(deletedCharacter.concat(text));
        setTypedText(typedText.slice(0, -1));
      }
      return;
    }

    if (key.length > 2) {
      return;
    }

    const indexPressed = keyIndex.indexOf(key.toLowerCase());
    dispatch(incrementTypedCharactersCount());
    dispatch(keyPressed(indexPressed));

    // wrong character
    if (key !== text.charAt(0)) {
      dispatch(incrementErrorCount());

      if (errorText.length === 20) {
        return;
      }

      if (text.charAt(0) === " ") {
        setErrorText(errorText.concat("_"));
        setText(text.slice(1));
        return;
      }

      setErrorText(errorText.concat(text.charAt(0)));
      setText(text.slice(1));
      return;
    }

    // correct character
    if (errorText.length > 0) {
      return;
    }

    if (text.charAt(0) === " ") {
      dispatch(incrementTypedWordsCount());
    }

    setTypedText(typedText.concat(key.charAt(key.length - 1)));
    setText(text.slice(1));
  };

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

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
            onKeyDown={(e) => handleBackPressed(e)}
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
