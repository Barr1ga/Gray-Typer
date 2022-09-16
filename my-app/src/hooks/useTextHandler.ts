import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    keyPressed,
    resetKeyboard,
    setTyping,
} from "../features/keyboard/keyboardSlice";
import {
    incrementErrorCount,
    incrementTypedCharactersCount,
    incrementTypedWordsCount,
    decrementTypedWordsCount,
    resetResults,
    setAccuracy,
    setTotalWordsCount,
    setCompleted,
    setGrossWpm,
    setAdjustedSpeed,
} from "../features/result/resultSlice";
import RandomInts from "../features/helpers/RandomInts";
import RandomPunctuations from "../features/helpers/RandomPunctuations"
import useSound from 'use-sound';
// import osuClick from '../../public/assets/osu_click.mp3';

const osuClick = require("../assets/osu_click.mp3");
const punchClick = require("../assets/punch.mp3");
const boomClick = require("../assets/boom.mp3");

const randomWords = require('random-words');

const useTextHandler = () => {
    const dispatch = useAppDispatch();
    const [typedText, setTypedText] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [tempErrorCount, setTempErrorCount] = useState<number>(0);

    // const [wordsCount, setWordsCount] = useState<number>(0);
    const [text, setText] = useState<string>(
        ""
    );
    const [typeStart, setTypeStart] = useState<Boolean>(false);

    const { getRandomSingleNumber, getRandomNumbers } = RandomInts();
    const { getRandomPunctations } = RandomPunctuations();

    const { totalWordsCount, errorCount, typedWordsCount, typedCharactersCount } =
        useAppSelector((state) => state.result);

    const { keyIndex, typing } = useAppSelector(
        (state) => state.keyboard
    );

    const { sfxVolume, testLength } = useAppSelector(
        (state) => state.settings
    );

    const [playOsuSfx] = useSound(osuClick, { volume: sfxVolume });
    const [playPunchSfx] = useSound(punchClick, { volume: sfxVolume });
    const [playBoomSfx] = useSound(boomClick, { volume: sfxVolume });

    const {
        language,
        keyboard,
        punctuations,
        uppercase,
        lowercase,
        numbers,
        time,
    } = useAppSelector((state) => state.criterias);

    const resetTest = () => {
        setTypedText("");
        setErrorText("");
        // setWordsCount(0);
        initializeText();
        dispatch(resetResults());
        setTypeStart(false);
        resetKeyboard();
    }

    const getTextLength = () => {
        if (testLength === "short") {
            const count = 15;
            dispatch(setTotalWordsCount(count));
            return count;
        }

        if (testLength === "medium") {
            const count = 25;
            dispatch(setTotalWordsCount(count));
            return count;
        }

        if (testLength === "long") {
            const count = 50;
            dispatch(setTotalWordsCount(count));
            return count;
        }
    }

    const initializeText = () => {
        const length = getTextLength();
        let wordsArray = randomWords({ exactly: length });

        if (lowercase && uppercase) {
            const count = getRandomSingleNumber(wordsArray.length);
            const uppercaseIdxs = getRandomNumbers(count, wordsArray.length);

            uppercaseIdxs.forEach((int: number) => {
                wordsArray[int] = wordsArray[int]?.charAt(0).toUpperCase().concat(wordsArray[int].slice(1));
            })
        }

        if (numbers) {
            const count = getRandomSingleNumber(wordsArray.length);
            const numberIdxs = getRandomNumbers(count, wordsArray.length);
            const tempRandCountInt = getRandomNumbers(count, 1000);

            numberIdxs.forEach((idx: number) => {
                wordsArray[idx] = wordsArray[idx]?.concat(tempRandCountInt[idx]?.toString());
            })
        }

        if (punctuations) {
            const count = getRandomSingleNumber(wordsArray.length);
            const punctuationIdxs = getRandomNumbers(count, wordsArray.length);
            const punctuations = getRandomPunctations(count);
            console.log(punctuations)
            punctuationIdxs.forEach((idx) => {
                if (punctuations[idx]?.length === 1) {
                    wordsArray[idx] = wordsArray[idx]?.concat(punctuations[idx]);
                }
                else {
                    wordsArray[idx] = punctuations[idx]?.
                        charAt(0).concat(wordsArray[idx]).
                        concat(punctuations[idx]?.charAt(punctuations[idx].length - 1));
                }
            })
        }

        if (!lowercase && uppercase) {
            wordsArray = wordsArray.map((word: string) => word?.toUpperCase());
        }

        dispatch(setTotalWordsCount(wordsArray.length));
        // setWordsCount(wordsArray.length);
        setText(wordsArray.join(" "));
    }

    useEffect(() => {
        if (typedText !== "") {
            dispatch(setAccuracy());
        }
    }, [errorCount, typedCharactersCount]);

    useEffect(() => {
        resetTest();
    }, [punctuations,
        uppercase,
        lowercase,
        numbers,
        time]);


    const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;

        if (key === "Tab" || key === "Escape") {
            resetTest();
        }

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

                if (text.charAt(0) === " ") {
                    dispatch(decrementTypedWordsCount());
                }

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
            setTempErrorCount((prev) => prev + 1);
            playPunchSfx();
            // playBoomSfx();
            
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
        
        
        if (text.charAt(0) === " " || text.length === 1) {
            dispatch(incrementErrorCount(tempErrorCount));
            setTempErrorCount(0);

            dispatch(setGrossWpm());
            dispatch(setAdjustedSpeed());
            dispatch(incrementTypedWordsCount());
        }

        setTypedText(typedText.concat(key.charAt(key.length - 1)));
        setText(text.slice(1));
    };

    // console.log(totalWordsCount)


    return { text, typedText, errorText, typeStart, setTypeStart, resetTest, initializeText, handleKeyPressed };
}

export default useTextHandler;