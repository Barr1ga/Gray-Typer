import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { keyPressed } from "../features/keyboard/keyboardSlice";

interface KeyboardDisplayProps {}

export const KeyboardDisplay: React.FC<KeyboardDisplayProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { pressedKey } = useAppSelector((state) => state.keyboard);

  const keyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const HandleKeyPressed = (idx: number, key: string) => {
    dispatch(keyPressed(key));
  };

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

  useEffect(() => {
    if (keyRefs.current) {
      
    }
  }, [pressedKey])
  

  return (
    <>
      <div className="keyboard">
        <span>
          {firstRowKeys.map((key, idx) => (
            <div
              className="key"
              ref={(ref) => (keyRefs.current[idx] = ref)}
              onClick={() => HandleKeyPressed(idx, key)}
            >
              {key}
            </div>
          ))}
        </span>
        <span>
          {secondRowKeys.map((key, idx) => (
            <div
              key={key + idx}
              className="key"
              ref={(ref) => (keyRefs.current[idx + firstRowKeys.length] = ref)}
              onClick={() => HandleKeyPressed(idx, key)}
            >
              {key}
            </div>
          ))}
        </span>
        <span>
          {thirdRowKeys.map((key, idx) => (
            <div
              key={key + idx}
              className="key"
              ref={(ref) =>
                (keyRefs.current[
                  idx + firstRowKeys.length + secondRowKeys.length
                ] = ref)
              }
              onClick={() => HandleKeyPressed(idx, key)}
            >
              {key}
            </div>
          ))}
        </span>
        <span>
          <div
            className="space"
            ref={(ref) =>
              (keyRefs.current[
                firstRowKeys.length + secondRowKeys.length + thirdRowKeys.length
              ] = ref)
            }
            onClick={() =>
              HandleKeyPressed(
                firstRowKeys.length +
                  secondRowKeys.length +
                  thirdRowKeys.length,
                " "
              )
            }
          >
            —
          </div>
        </span>
      </div>
    </>
  );
};
