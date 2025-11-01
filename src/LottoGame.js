import { Console, Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { 
   readAmount, readWinningNumbers, readBonusNumber,
  calculateResults, printResults, formatLottoNumbers 
} from './utils.js';

class LottoGame {
  async start() {
    const amount = await readAmount();
    const count = amount / 1000;

    const tickets = Array.from({ length: count }, () => 
      new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6)) // using imported class!!!
    );

    Console.print(`${count}개를 구매했습니다.`);
    tickets.forEach(l => Console.print(formatLottoNumbers(l.getNumbers())));

    const winningNumbers = await readWinningNumbers();
    const bonusNumber = await readBonusNumber(winningNumbers);

    const results = calculateResults(tickets, winningNumbers, bonusNumber);
    printResults(results);
  }
}

export default LottoGame;
