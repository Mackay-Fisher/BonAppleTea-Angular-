import { CapitalizeAndReplacePipe } from './capitalize-and-replace.pipe';

describe('CapitalizeAndReplacePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeAndReplacePipe();
    expect(pipe).toBeTruthy();
  });
});
