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
import useRandomInts from "./useRandomInts";
import useRandomPunctuations from "./useRandomPunctuations"
import useSound from 'use-sound';
// import osuClick from '../../public/assets/osu_click.mp3';

const osuClick = require("../assets/osu_click.mp3");
const punchClick = require("../assets/punch.mp3");
const randomWords = require('random-words');

const useTextHandler = () => {
    const [playOsuSfx] = useSound(osuClick);
    const [playPunchSfx] = useSound(punchClick);

    const dispatch = useAppDispatch();
    const [typedText, setTypedText] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [text, setText] = useState<string>(
        ""
    );

    const [wordsCount, setWordsCount] = useState<number>(0);

    const { getRandomInts, randomCountInt, getRandomNumbers } = useRandomInts();
    const { randomPunctuations, getRandomPunctations } = useRandomPunctuations();

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
        let wordsArray = randomWords({ exactly: 25 })

        if (lowercase && uppercase) {
            const uppercaseIdx = getRandomInts();
            console.log(uppercaseIdx)

            wordsArray.forEach((word: string, idx: number) => {
                if (uppercaseIdx.includes(idx)) {
                    wordsArray[idx] = wordsArray[idx].charAt(0).toUpperCase().concat(wordsArray[idx].slice(1));
                }
            })
        }

        if (numbers) {
            const numberIdxs = getRandomInts();
            const tempRandCountInt = getRandomNumbers(numberIdxs.length);

            numberIdxs.forEach((number: number, idx: number) => {
                wordsArray[number] = wordsArray[number].concat(tempRandCountInt[idx]?.toString());
            })
        }

        if (punctuations) {
            const punctuationIdxs = getRandomInts();
            getRandomPunctations(punctuationIdxs.length);

            randomPunctuations.forEach((punctuation: string, idx: number) => {
                if (punctuation?.length === 1) {
                    wordsArray[punctuationIdxs[idx]] = wordsArray[punctuationIdxs[idx]]?.concat(punctuation);
                } else {
                    wordsArray[punctuationIdxs[idx]] = punctuation.
                        charAt(0).concat(wordsArray[punctuationIdxs[idx]]).
                        concat(punctuation.charAt(punctuation.length - 1));
                }
            })
        }

        if (!lowercase) {
            wordsArray = wordsArray.map((word: string) => word.toUpperCase());
        }

        setWordsCount(wordsArray.length);
        setText(wordsArray.join(" "));
    }

    useEffect(() => {
        dispatch(setAccuracy());
    }, [errorCount, typedCharactersCount]);

    const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("click")
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
            playPunchSfx();
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

        playOsuSfx();
        
        if (text.charAt(0) === " ") {
            dispatch(incrementTypedWordsCount());
        }

        setTypedText(typedText.concat(key.charAt(key.length - 1)));
        setText(text.slice(1));
    };

    return { text, wordsCount, typedText, errorText, initializeText, handleKeyPressed };
}

export default useTextHandler;