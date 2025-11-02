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
  const input = await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
  const bonus = Number(input);
  if (winningNumbers.includes(bonus)) {
    const msg = '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.';
    Console.print(msg);
    throw new Error(msg);
  }
  if (bonus < 1 || bonus > 45) {
    const msg = '[ERROR] 보너스 번호는 1~45 사이여야 합니다.';
    Console.print(msg);
    throw new Error(msg);
  }
  return bonus;
}

function validateNumbers(numbers) {
  if (numbers.length !== 6) {
    const msg = '[ERROR] 당첨 번호는 6개여야 합니다.';
    Console.print(msg);
    throw new Error(msg);
  }
  const unique = new Set(numbers);
  if (unique.size !== 6) {
    const msg = '[ERROR] 당첨 번호에 중복이 있습니다.';
    Console.print(msg);
    throw new Error(msg);
  }
  const invalid = numbers.some(num => num < 1 || num > 45 || isNaN(num));
  if (invalid) {
    const msg = '[ERROR] 1~45 사이의 숫자만 입력 가능합니다.';
    Console.print(msg);
    throw new Error(msg);
  }
  // seperate scope from private validator
}

export function calculateResults(tickets, winningNumbers, bonusNumber) {
    const prizeTable = {
        6: 2000000000,
        5.5: 30000000, // 5개 + 보너스
        5: 1500000,
        4: 50000,
        3: 5000,
    };

    const results = { 3: 0, 4: 0, 5: 0, 5.5: 0, 6: 0 };
    tickets.forEach(lotto => {
        const match = lotto.getNumbers().filter(n => winningNumbers.includes(n)).length;
        if (match >= 3) {
        const key = match === 5 && lotto.getNumbers().includes(bonusNumber) ? 5.5 : match;
        results[key]++;
        }
    });

    const totalPrize = Object.entries(results).reduce(
        (sum, [key, count]) => sum + prizeTable[key] * count, 0
    );
    const rate = ((totalPrize / (tickets.length * 1000)) * 100).toFixed(1);

    return { results, rate };
}

export function printResults({ results, rate }) {
    Console.print('당첨 통계\n---');
    Console.print(`3개 일치 (5,000원) - ${results[3]}개`);
    Console.print(`4개 일치 (50,000원) - ${results[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${results[5]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${results[5.5]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${results[6]}개`);
    Console.print(`총 수익률은 ${rate}%입니다.`);
}

export function formatLottoNumbers(numbers) {
    return `[${numbers.join(', ')}]`;
}