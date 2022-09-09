import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Keyboard {
    pressedKey: string,
    keyIndex: string[],
}

const initialState: Keyboard = {
    pressedKey: "",
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
    ]
}

const keyboardSlice = createSlice({
    name: "keyboard",
    initialState,
    reducers: {
        keyPressed: (state, action: PayloadAction<string>) => {
            state.pressedKey = action.payload;
        }
    }
})

export const { keyPressed } = keyboardSlice.actions;
export default keyboardSlice.reducer;