import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
interface ResultState {
    completed: boolean,
    timeStarted: string,
    time: number,
    adjustedSpeed: number[],
    grossWpm: number[],
    netWpm: number[],
    errorCount: number[],
    typedCharactersCount: number,
    typedWordsCount: number,
    totalWordsCount: number,
    accuracy: number,
}
 
const initialState: ResultState = {
    completed: false,
    timeStarted: "",
    time: 0,
    adjustedSpeed: [],
    grossWpm: [],
    netWpm: [],
    errorCount: [],
    typedCharactersCount: 0,
    typedWordsCount: 0,
    totalWordsCount: 0,
    accuracy: 0,
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        resetResults: (state) => initialState,
        setTotalWordsCount: (state, action: PayloadAction<number>) => {
            state.totalWordsCount = action.payload;
        },
        setCompleted: (state) => {
            state.completed = true;
        },
        incrementTypedWordsCount: (state) => {
            state.typedWordsCount += 1;
        },
        decrementTypedWordsCount: (state) => {
            state.typedWordsCount -= 1;
        },
        incrementErrorCount: (state, action: PayloadAction<number>) => {
            state.errorCount[state.typedWordsCount] = action.payload;
        },
        incrementTypedCharactersCount: (state) => {
            state.typedCharactersCount += 1;
        },
        setAccuracy: (state) => {
            const totalErrorCount = state.errorCount.reduce((a: number,b: number) => a + b, 0);
            state.accuracy = 100 - ((totalErrorCount / state.typedCharactersCount) * 100);
        },
        setInitialTime: (state) => {
            state.timeStarted = moment(new Date()).toString();
        },
        setGrossWpm: (state) => {
            const timeNow = moment(new Date());
            const duration = moment.duration(timeNow.diff(state.timeStarted));
            const minutesDuration = duration.asMinutes();
            state.time = minutesDuration;
            state.grossWpm[state.typedWordsCount] = (state.typedCharactersCount / 5) / minutesDuration;
        },
        setAdjustedSpeed: (state) => {
            state.adjustedSpeed[state.typedWordsCount] = state.grossWpm[state.typedWordsCount] * (state.accuracy / 100);
        },
        setNetWpm: (state) => {
            // const timeNow = moment(new Date());
            // const duration = moment.duration(timeNow.diff(state.timeStarted));
            // const minutesDuration = duration.asMinutes();
            // state.time = minutesDuration;
            // state.grossWpm = (state.typedCharactersCount / 5) / minutesDuration;
            // state.netWpm = state.grossWpm - ();
        },
    }
});

export const {
    resetResults,
    setTotalWordsCount,
    setCompleted,
    incrementTypedWordsCount,
    decrementTypedWordsCount,
    incrementErrorCount,
    incrementTypedCharactersCount,
    setAccuracy,
    setInitialTime,
    setGrossWpm,
    setAdjustedSpeed,
    setNetWpm,
} = resultSlice.actions;
export default resultSlice.reducer;
