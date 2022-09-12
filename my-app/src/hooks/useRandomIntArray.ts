import React, { useState } from 'react';

const useRandomIntArray = () => {
    const [randomInts, setRandomInt] = useState<number[]>([0]);

    const getRandomInt = () => {
        const min: number = 0;
        const max: number = 25 * .50;
        const count: number = Math.floor(Math.random() * (max - min + 1) + min);

        setRandomInt([...new Array(count)].map(() => Math.floor(Math.random() * (max - min + 1) + min)));
    }

    return { randomInts, getRandomInt };
}

export default useRandomIntArray;
