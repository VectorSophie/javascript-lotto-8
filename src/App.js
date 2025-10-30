import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    try{
      const purchaseAmount = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
    } catch(error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;
