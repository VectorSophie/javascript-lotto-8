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
    if (winningNumbers.includes(bonus)) throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
    if (bonus < 1 || bonus > 45) throw new Error('[ERROR] 보너스 번호는 1~45 사이여야 합니다.');
    return bonus;
}

function validateNumbers(numbers) {
    if (numbers.length !== 6) throw new Error('[ERROR] 당첨 번호는 6개여야 합니다.');
    const unique = new Set(numbers);
    if (unique.size !== 6) throw new Error('[ERROR] 당첨 번호에 중복이 있습니다.');
    const invalid = numbers.some(num => num < 1 || num > 45 || isNaN(num));
    if (invalid) throw new Error('[ERROR] 1~45 사이의 숫자만 입력 가능합니다.');
    // seperate scope from private validator
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
