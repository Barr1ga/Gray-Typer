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
      <Graph></Graph>
      <div className="results">
        <div className="cards">
          {/* <div className="panel">
            <h3>Net WPM</h3>
            <h1 className="result-number">{grossWpm.toFixed(0)}</h1>
          </div> */}
          <div className="panel">
            <h3>Adjusted speed</h3>
            <h1 className="result-number">
              {adjustedSpeed[adjustedSpeed.length - 1]?.toFixed(0)}
            </h1>
          </div>
          <div className="panel">
            <h3>Gross WPM</h3>
            <h1 className="result-number">
              {grossWpm[grossWpm.length - 1]?.toFixed(0)}
            </h1>
            {/* <small>{grossWpm.toFixed(2)}</small> */}
          </div>
          <div className="panel">
            <h3>Accuracy</h3>
            <h1 className="result-number">{accuracy.toFixed(0)}%</h1>
          </div>
          <div className="panel">
            <h3>Errors</h3>
            <h1 className="result-number">{totalErrorCount}</h1>
          </div>
        </div>

        <div className="cards">
          <div className="panel">
            <p>Date and Time Started</p>
            <h2 className="sub-result-number">
              {moment(timeStarted).format("MM/DD/YYYY, h:mm:ss a")}
            </h2>
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
    </>
  );
};
