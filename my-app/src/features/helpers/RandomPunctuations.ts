import React, { useState } from 'react';

const RandomPunctuations = () => {
    const punctuations = [".", ",", ":", ";", "?", "()", "[]", '""', "'", "!"];

    const getRandomPunctations = (count: number) => {
        const min: number = 1;
        const max: number = 25 * .25;
        const temp = [...new Array(count)].map(() => punctuations[Math.floor(Math.random() * (punctuations.length - min) + min)]);
        return temp;
    }

    return { getRandomPunctations };
}

export default RandomPunctuations;
