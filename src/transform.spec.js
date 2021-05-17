import {TransformCustom2} from "./transform";

describe("transform", () => {
  it('check "M"', () => {
    const correctAns = {H: "M", K: 3.02};

    const transform = new TransformCustom2(true, false, true, 1, 2, 2);
    const ans = transform.transform();

    expect(ans.H).toBe(correctAns.H);
    expect(ans.K).toBe(correctAns.K);
  });

  it('check "P"', () => {
    const correctAns = {H: "P", K: 2.02};

    const transform = new TransformCustom2(true, true, true, 1, 2, 2);
    const ans = transform.transform();

    expect(ans.H).toBe(correctAns.H);
    expect(ans.K).toBe(correctAns.K);
  });

  it('check "T"', () => {
    const correctAns = {H: "T", K: 1.5};

    const t = new TransformCustom2(true, true, false, 3.0, 15, 15);
    const ans = t.transform();

    expect(ans.H).toBe(correctAns.H);
    expect(ans.K).toBe(correctAns.K);
  });

  it('input validation error', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});

    const transform = new TransformCustom2(1, 1, 'asdf', 3.0, 15, 15);
    transform.transform();

    expect(consoleSpy).toHaveBeenCalledWith('Input type error');

    console.error.mockRestore();
  });

  it('H and K - could not be found', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});

    const transform = new TransformCustom2(false, false, true, 3.0, 15, 15);
    transform.transform();

    expect(consoleSpy).toHaveBeenCalledWith('H and K - could not be found');

    console.error.mockRestore();
  });
});
