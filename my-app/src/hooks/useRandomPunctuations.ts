import React, { useState } from 'react';

const useRandomPunctuations = () => {
    const [randomPunctuations, setRandomPunctations] = useState<string[]>([]);
    const punctuations = [".", ",", ":", ";", "?", "()", "[]", '""', "'", "!"];

    const getRandomPunctations = (count: number) => {
        const min: number = 1;
        const max: number = 25 * .25;
        
        setRandomPunctations([...new Array(count)].map(() => punctuations[Math.floor(Math.random() * (punctuations.length - min) + min)]));
    }

    return { randomPunctuations, getRandomPunctations };
}

export default useRandomPunctuations;
