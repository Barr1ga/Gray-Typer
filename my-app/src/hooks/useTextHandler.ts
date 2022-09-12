import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    keyPressed,
    setTyping,
} from "../features/keyboard/keyboardSlice";
import {
    incrementErrorCount,
    incrementTypedCharactersCount,
    incrementTypedWordsCount,
    setAccuracy,
} from "../features/result/resultSlice";
import useRandomIntArray from "./useRandomIntArray";

const randomWords = require('random-words');

const useTextHandler = () => {
    const dispatch = useAppDispatch();
    const [typedText, setTypedText] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [text, setText] = useState<string>(
        ""
    );

    const { randomInts, getRandomInt } = useRandomIntArray();

    const { keyIndex, typing } = useAppSelector(
        (state) => state.keyboard
    );

    const {
        language,
        keyboard,
        punctuations,
        uppercase,
        lowercase,
        numbers,
        time,
    } = useAppSelector((state) => state.criterias);

    const { errorCount, typedCharactersCount } =
        useAppSelector((state) => state.result);

    const initializeText = () => {
        const wordsArray = randomWords({ exactly: 25 })
        getRandomInt();

        if (uppercase) {
            wordsArray.forEach((word: string, idx: number) => {
                if (randomInts.find((int) => int === idx)) {
                    wordsArray[idx] = wordsArray[idx].
                        charAt(0).
                        toUpperCase().
                        concat(wordsArray[idx].
                            slice(1));

                }
            })
        }
        
        // if (punctuations) {
        //     setText();
        // }
        
        // if (uppercase) {
            //     setText();
            // }
            
            // if (lowercase) {
                //     setText();
                // }
                
                // if (numbers) {
                    //     setText();
        // }

        setText(wordsArray.join(" "));
    }
    
    useEffect(() => {
        dispatch(setAccuracy());
    }, [errorCount, typedCharactersCount]);

    const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    return { text, typedText, errorText, initializeText, handleKeyPressed };
}

export default useTextHandler;