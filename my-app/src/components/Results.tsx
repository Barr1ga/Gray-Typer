import React from "react";
import { useAppSelector } from "../app/hooks";
import moment from "moment";

interface ResultsProps {}

export const Results: React.FC<ResultsProps> = ({}) => {
  const {
    completed,
    timeStarted,
    time,
    grossWpm,
    errorCount,
    typedCharactersCount,
    typedWordsCount,
    totalWordsCount,
    accuracy,
  } = useAppSelector((state) => state.result);

  const { testLength } = useAppSelector((state) => state.settings);
  const seconds = time * 60;
  const secondsFormatted = seconds.toFixed(0);

  return (
    <>
      <div className="results">
        <div className="cards">
          <div className="panel">
            <h3>Gross WPM</h3>
            <h1 className="result-number">{grossWpm.toFixed(0)}</h1>
          </div>
          <div className="panel">
            <h3>Net WPM</h3>
            <h1 className="result-number">{grossWpm.toFixed(0)}</h1>
          </div>
          <div className="panel">
            <h3>Adjusted speed</h3>
            <h1 className="result-number">{accuracy.toFixed(0)}%</h1>
          </div>
          <div className="panel">
            <h3>Accuracy</h3>
            <h1 className="result-number">{accuracy.toFixed(0)}%</h1>
          </div>
          <div className="panel">
            <h3>Consistency</h3>
            <h1 className="result-number">{accuracy.toFixed(0)}%</h1>
          </div>
        </div>

        <div className="cards">
          <div className="panel">
            <p>Date and Time Started</p>
            <h2 className="sub-result-number">
              {moment(timeStarted).format("MMMM Do YYYY, h:mm:ss a")}
            </h2>
          </div>

          <div className="panel">
            <p>Errors</p>
            <h2 className="sub-result-number">{errorCount}</h2>
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
