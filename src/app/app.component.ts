import { Component } from '@angular/core';

/**
 *    SEND
 * +  MORE
 * -------
 * = MONEY
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logOutput = '';

  current = new Map<string, number>();
  order = ['S', 'E', 'N', 'D', 'M', 'O', 'R', 'Y'];

  constructor() {
    this.order.forEach(letter => this.current.set(letter, 0));
    this.iterate();
  }

  private async iterate() {
    this.println('Geht los');
    let solCnt = 0;
    let cnt = 0;
    do {
      if (this.isSolution()) {
        ++solCnt;
        this.printCurrent();
      }
      if (++cnt % 1000000 === 0) {
        await this.render();
        this.print('.');
      }
    } while (this.next());
    this.println(`Is fertig. ${solCnt} Solutions in total.`);
  }

  printCurrent() {
    this.println('');
    this.println(`    ${this.current.get('S')}${this.current.get('E')}${this.current.get('N')}${this.current.get('D')}`);
    this.println(` +  ${this.current.get('M')}${this.current.get('O')}${this.current.get('R')}${this.current.get('E')}`);
    this.println(` -------`);
    // tslint:disable-next-line:max-line-length
    this.println(` = ${this.current.get('M')}${this.current.get('O')}${this.current.get('N')}${this.current.get('E')}${this.current.get('Y')}`);
    this.println('');
  }

  private println(msg: string) {
    this.logOutput += `${msg}\r\n`;
  }

  private print(msg: string) {
    this.logOutput += msg;
  }

  private isSolution() {
    return this.isValidNumbering() && this.checksOut();
  }

  private checksOut() {
    const top =
      1000 * this.current.get('S') +
      100 * this.current.get('E') +
      10 * this.current.get('N') +
      this.current.get('D');
    const mid =
      1000 * this.current.get('M') +
      100 * this.current.get('O') +
      10 * this.current.get('R') +
      this.current.get('E');
    const bottom =
      10000 * this.current.get('M') +
      1000 * this.current.get('O') +
      100 * this.current.get('N') +
      10 * this.current.get('E') +
      this.current.get('Y');
      return top + mid === bottom;
  }

  private isValidNumbering() {
    let result = true;
    const seen = new Map<number, boolean>();
    this.order.forEach(letter => {
      const val = this.current.get(letter);
      if (seen.has(val)) {
        result = false;
      }
      seen.set(val, true);
    });
    return result;
  }

  private next() {
    this.current.set(this.order[0], this.current.get(this.order[0]) + 1);
    let carry = false;
    this.order.forEach(letter => {
      let val = this.current.get(letter);
      if (carry) {
        val += 1;
        carry = false;
      }
      if (val > 9) {
        val -= 10;
        carry = true;
      }
      this.current.set(letter, val);
    });
    return !carry;
  }

  private render() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      });
    });
  }
}
