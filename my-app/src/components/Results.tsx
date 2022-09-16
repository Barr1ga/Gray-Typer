import React from "react";
import { useAppSelector } from "../app/hooks";
import moment from "moment";
import { Graph } from "./Graph";

interface ResultsProps {}

export const Results: React.FC<ResultsProps> = ({}) => {
  const {
    completed,
    timeStarted,
    time,
    grossWpm,
    adjustedSpeed,
    errorCount,
    typedCharactersCount,
    typedWordsCount,
    totalWordsCount,
    accuracy,
  } = useAppSelector((state) => state.result);

  const { language } = useAppSelector((state) => state.criterias);

  const { testLength } = useAppSelector((state) => state.settings);
  const seconds = time * 60;
  const secondsFormatted = seconds.toFixed(0);
  const languageFormatted = language
    ?.charAt(0)
    .toUpperCase()
    .concat(language.slice(1));
  const totalErrorCount = errorCount.reduce(
    (partialSum: number, a: number) => partialSum + a,
    0
  );

  return (
    <>
      <div className="result-stack">
        <Graph></Graph>
        <div className="results">
          <div className="cards">
            <div className="panel">
              <p>Adjusted speed</p>
              <h2 className="sub-result-number">
                {adjustedSpeed[adjustedSpeed.length - 1]?.toFixed(0)}
              </h2>
            </div>

            <div className="panel">
              <p>Gross WPM</p>
              <h2 className="sub-result-number">
                {grossWpm[grossWpm.length - 1]?.toFixed(0)}
              </h2>
            </div>
            <div className="panel">
              <p>Accuracy</p>
              <h2 className="sub-result-number">{accuracy.toFixed(0)}%</h2>
            </div>
            <div className="panel">
              <p>Errors</p>
              <h2 className="sub-result-number">{totalErrorCount}</h2>
            </div>

            <div className="panel">
              <p>Language</p>
              <h2 className="sub-result-number">{languageFormatted}</h2>
            </div>
            <div className="panel">
              <p>Characters</p>
              <h2 className="sub-result-number">{typedCharactersCount}</h2>
            </div>
            <div className="panel">
              <p>Words</p>
              <h2 className="sub-result-number">
                {typedWordsCount} / {totalWordsCount}
              </h2>
            </div>
            <div className="panel">
              <p>Time</p>
              <h2 className="sub-result-number">{secondsFormatted}s</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
