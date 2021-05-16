import {TransformCustom2} from "./transform";

describe("transform", () => {
  it('check "M"', () => {
    const correctAns = {H: "M", K: 3.02};

    const t = new TransformCustom2(true, false, true, 1, 2, 2);
    const ans = t.transform();

    expect(ans.H).toBe(correctAns.H);
    expect(ans.K).toBe(correctAns.K);
  });

  it('check "P"', () => {
    const correctAns = {H: "P", K: 2.02};

    const t = new TransformCustom2(true, true, true, 1, 2, 2);
    const ans = t.transform();

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
});
