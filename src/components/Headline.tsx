import { merchant } from '@/styles/fonts';
import classNames from 'classnames';
import React from 'react';
import styles from './Headline.module.scss';

interface HeadlineProps {
  as?: 'h1' | 'h2';
  /**
   * The text split into an array of lines with an array of words.
   */
  text: (string | { text: string; isHighlighted?: boolean; classNames?: string[] })[][];
}

const charactersWithoutSpace = ['.', ',', '!', '?'];

const Headline: React.FC<HeadlineProps> = ({ as = 'h1', text }) => {
  const parsedText = text.map((line, i) =>
    line.map((word, j) => {
      const text = typeof word === 'string' ? word : word.text;
      const isHighlighted = typeof word === 'string' ? false : word.isHighlighted;
      const hasSpaceBefore = j > 0 && !charactersWithoutSpace.includes(text);
      const hasLineBreakAfter = j === line.length - 1;
      return (
        <React.Fragment key={j}>
          {hasSpaceBefore && <span>&nbsp;</span>}
          <span className={classNames([styles.w, isHighlighted && styles.isHighlighted])}>{text}</span>
          {hasLineBreakAfter && <br />}
        </React.Fragment>
      );
    })
  );

  return as === 'h1' ? (
    <h1 className={classNames([styles.container, merchant.className])}>{parsedText}</h1>
  ) : (
    <h2 className={classNames([styles.container, merchant.className])}>{parsedText}</h2>
  );
};

export default Headline;
