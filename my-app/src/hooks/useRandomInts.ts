import React, { useState } from 'react';

const useRandomInt = () => {
    // const [randomInts, setRandomInts] = useState<number[]>([]);
    const [randomCountInt, setRandomCountInt] = useState<number[]>([]);

    const getRandomInts = () => {
        const min: number = 1;
        const max: number = 25 * .50;
        const count: number = Math.floor(Math.random() * (max - min + 1) + min);
        
        let temp = [...new Array(count)].map(() => Math.floor(Math.random() * (max - min + 1) + min));

        temp = temp.filter(function(int: number, idx: number, self) {
            return self.indexOf(int) == idx;
        })

        return temp;
    }

    const getRandomNumbers = (count: number) => {
        const min: number = 0;
        const max: number = 1000;
        const temp = [...new Array(count)].map(() => Math.floor(Math.random() * (max - min + 1) + min));
        return temp;
    }

    return { getRandomInts, randomCountInt, getRandomNumbers };
}

export default useRandomInt;
