import React, { useState } from 'react';

const RandomInt = () => {
    // const [randomInts, setRandomInts] = useState<number[]>([]);
    const getRandomSingleNumber = (count: number) => {
        const min: number = 0;

        let temp = Math.floor(Math.random() * (count - min + 1) + min);

        return temp;
    }

    const getRandomNumbers = (count: number, max: number) => {
        const min: number = 0;
        
        let temp = [...new Array(count)].map(() => Math.floor(Math.random() * (max - min + 1) + min));

        temp = temp.filter(function(int: number, idx: number, self) {
            return self.indexOf(int) == idx;
        })

        return temp;
    }

    return { getRandomSingleNumber, getRandomNumbers };
}

export default RandomInt;
