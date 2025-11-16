import React from 'react';
import styles from './AnimatedNumber.module.scss';
import classNames from 'classnames';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  className?: string;
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  decimals = 2,
  className,
}) => {
  const formattedValue = value.toFixed(decimals);
  const characters = formattedValue.split('');

  return (
    <div className={classNames(styles.animatedNumber, className)}>
      {characters.map((char, index) => {
        const isDigit = !isNaN(parseInt(char));
        const isDecimalPoint = char === '.';
        const isMinus = char === '-';

        if (isDecimalPoint || isMinus) {
          return (
            <div
              key={index}
              className={classNames(styles.digitContainer, {
                [styles.isDecimalPoint]: isDecimalPoint,
                [styles.isMinus]: isMinus,
              })}
            >
              <div className={styles.staticChar}>{char}</div>
            </div>
          );
        }

        // For digits, create a column of all numbers 0-9
        const digitValue = parseInt(char);
        const offset = -digitValue * 1.2; // Each digit is 1.2em height

        return (
          <div key={index} className={styles.digitContainer}>
            <div
              className={styles.digitColumn}
              style={{
                transform: `translateY(${offset}em)`,
              }}
            >
              {DIGITS.map((digit) => (
                <div key={digit} className={styles.digit}>
                  {digit}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
