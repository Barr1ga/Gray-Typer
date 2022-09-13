import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
interface ResultState {
    timeStarted: string,
    wpm: number,
    errorCount: number,
    typedCharactersCount: number,
    typedWordsCount: number,
    accuracy: number,
}

const initialState: ResultState = {
    timeStarted: "",
    wpm: 0,
    errorCount: 0,
    typedCharactersCount: 0,
    typedWordsCount: 0,
    accuracy: 100,
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        incrementTypedWordsCount: (state) => {
            state.typedWordsCount += 1;
        },
        incrementErrorCount: (state) => {
            state.errorCount += 1;
        },
        incrementTypedCharactersCount: (state) => {
            state.typedCharactersCount += 1;
        },
        setAccuracy: (state) => {
            state.accuracy = 100 - ((state.errorCount / state.typedCharactersCount) * 100);
        },
        setInitialTime: (state) => {
            state.timeStarted = moment(new Date()).toString();
        },
        setWpm: (state) => {
            const timeNow = moment(new Date());
            const duration = moment.duration(timeNow.diff(state.timeStarted));
            const minutesDuration = duration.asMinutes();
            state.wpm = (state.typedCharactersCount / 5) / minutesDuration;
        }
    }
});

export const {
    incrementTypedWordsCount,
    incrementErrorCount,
    incrementTypedCharactersCount,
    setAccuracy,
    setInitialTime,
    setWpm,
} = resultSlice.actions;
export default resultSlice.reducer;
