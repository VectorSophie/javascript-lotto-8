import { Console } from '@woowacourse/mission-utils';
import LottoGame from './LottoGame.js';

class App {
  async run() {
    try {
      const game = new LottoGame();
      await game.start();
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default App;
