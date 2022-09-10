import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { keyPressed } from "../features/keyboard/keyboardSlice";

interface KeyboardDisplayProps {}

const firstRowKeys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
];
const secondRowKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
const thirdRowKeys = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

export const KeyboardDisplay: React.FC<KeyboardDisplayProps> = ({}) => {
  const dispatch = useAppDispatch();

  const { pressedKeys } = useAppSelector((state) => state.keyboard);

  const keyRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const HandleKeyPressed = (idx: number, key: string) => {
    dispatch(keyPressed(idx));
  };

  console.log(pressedKeys);

  return (
    <>
      <div className="keyboard">
        <span>
          {firstRowKeys.map((key, idx) => (
            <button
              className={pressedKeys.includes(idx) ? "key clicked" : "key"}
              // className="key"
              ref={(ref) => (keyRefs.current[idx] = ref)}
              onClick={() => HandleKeyPressed(idx, key)}
            >
              {key}
            </button>
          ))}
        </span>
        <span>
          {secondRowKeys.map((key, idx) => (
            <button
              key={key + idx + firstRowKeys.length}
              className={pressedKeys.includes(idx + firstRowKeys.length) ? "key clicked" : "key"}
              // className="key"

              ref={(ref) => (keyRefs.current[idx + firstRowKeys.length] = ref)}
              onClick={() => HandleKeyPressed(idx + firstRowKeys.length, key)}
            >
              {key}
            </button>
          ))}
        </span>
        <span>
          {thirdRowKeys.map((key, idx) => (
            <button
              key={key + idx + firstRowKeys.length + secondRowKeys.length}
              className={pressedKeys.includes(idx + firstRowKeys.length + secondRowKeys.length) ? "key clicked" : "key"}
              // className="key"

              ref={(ref) =>
                (keyRefs.current[
                  idx + firstRowKeys.length + secondRowKeys.length
                ] = ref)
              }
              onClick={() =>
                HandleKeyPressed(
                  idx + firstRowKeys.length + secondRowKeys.length,
                  key
                )
              }
            >
              {key}
            </button>
          ))}
        </span>
        <span>
          <button
            className={pressedKeys.includes(firstRowKeys.length + secondRowKeys.length + thirdRowKeys.length + 1) ? "space clicked" : "space"}
            // className="space"
            ref={(ref) =>
              (keyRefs.current[
                firstRowKeys.length +
                  secondRowKeys.length +
                  thirdRowKeys.length +
                  1
              ] = ref)
            }
            onClick={() =>
              HandleKeyPressed(
                firstRowKeys.length +
                  secondRowKeys.length +
                  thirdRowKeys.length +
                  1,
                "  "
              )
            }
          >
            space
          </button>
        </span>
      </div>
    </>
  );
};
