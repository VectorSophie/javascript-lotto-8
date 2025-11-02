import { Console } from '@woowacourse/mission-utils';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      const msg = '[ERROR] 로또 번호는 6개여야 합니다.';
      Console.print(msg);
      throw new Error(msg);
    }
    const invalid = numbers.some(num => num < 1 || num > 45);
    if (invalid) {
      const msg = '[ERROR] 로또 번호는 1부터 45 사이여야 합니다.';
      Console.print(msg);
      throw new Error(msg);
    }
    const unique = new Set(numbers);
    if (unique.size !== 6) {
      const msg = '[ERROR] 로또 번호에 중복이 있습니다.';
      Console.print(msg);
      throw new Error(msg);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
