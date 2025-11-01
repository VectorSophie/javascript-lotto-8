class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    const invalid = numbers.some(num => num < 1 || num > 45); // range setting
    if (invalid) throw new Error('[ERROR] 로또 번호는 1부터 45 사이여야 합니다.');
    const unique = new Set(numbers); // using set for doubles
    if (unique.size !== 6) throw new Error('[ERROR] 로또 번호에 중복이 있습니다.');
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
