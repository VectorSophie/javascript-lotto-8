import { Console } from '@woowacourse/mission-utils';

export async function readAmount() {
  const input = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
  const amount = Number(input);
  if (isNaN(amount) || amount % 1000 !== 0) {
    throw new Error('[ERROR] 구입 금액은 1,000원 단위여야 합니다.');
  }
  return amount;
}

export async function readWinningNumbers() {
  const input = await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
  const numbers = input.split(',').map(n => Number(n.trim()));
  validateNumbers(numbers);
  return numbers;
}

export async function readBonusNumber(winningNumbers) {
}

function validateNumbers(numbers) {
}

export function calculateResults(tickets, winningNumbers, bonusNumber) {
  const prizeTable = {
    6: 2000000000,
    5.5: 30000000, // accounting for bonus
    5: 1500000,
    4: 50000,
    3: 5000,
  };
}

export function printResults({ results, rate }) {
}

export function formatLottoNumbers(numbers) {
}
