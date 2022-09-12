import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Keyboard {
    display: any
    typing: boolean,
    pressedKeys: number[],
    keyIndex: string[],
}

const initialState: Keyboard = {
    display: {
        none: {
            transition: ".3s ease-out 0s",
            opacity: 0,
        },
        block: {
            transition: ".3s ease-out 0s",
            opacity: 1,
        },
    },
    typing: false,
    pressedKeys: [],
    keyIndex: [
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
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        ";",
        "'",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "/",
        "'",
        " ",
    ],
}

const keyboardSlice = createSlice({
    name: "keyboard",
    initialState,
    reducers: {
        keyPressed: (state, action: PayloadAction<number>) => {
            state.pressedKeys.push(action.payload);
            if (state.pressedKeys.length === 3) {
                state.pressedKeys.shift();
            }
        },
        removeKeyFromPressed: (state, action: PayloadAction<number>) => {
            state.pressedKeys = state.pressedKeys.filter((key) => key !== action.payload);
        },
        setTyping: (state, action: PayloadAction<boolean>) => {
            state.typing = action.payload;
        }
    }
})

export const { keyPressed, removeKeyFromPressed, setTyping } = keyboardSlice.actions;
export default keyboardSlice.reducer;