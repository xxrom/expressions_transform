// Base
class Transform {
  constructor(A, B, C, D, E, F) {
    if (
      typeof A !== "boolean" ||
      typeof B !== "boolean" ||
      typeof C !== "boolean" ||
      typeof D !== "number" ||
      typeof E !== "number" ||
      typeof F !== "number"
    ) {
      console.error("Input type error");
    }

    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.E = E;
    this.F = F;

    this.findMap = {
      HisEqualTo: {
        M: {
          // A && B && !C => H = M
          check: () => this.A && this.B && !this.C,
          // H = M => K = D + (D * E / 10)
          getK: () => this.D + (this.D * this.E) / 10,
        },
        P: {
          // A && B && C => H = P
          check: () => this.A && this.B && this.C,
          // H = P => K = D + (D * (E - F) / 25.5)
          getK: () => this.D + (this.D * (this.E - this.F)) / 25.5,
        },
        T: {
          // !A && B && C => H = T
          check: () => !this.A && this.B && this.C,
          // H = T => K = D - (D * F / 30)
          getK: () => this.D - (this.D * this.F) / 30,
        },
      },
    };
  }

  getAnswer(variants) {
    for (let variant of variants) {
      const {check, getK} = this.findMap.HisEqualTo[variant];

      if (check()) {
        return {H: variant, K: getK()};
      }
    }
  }

  transform() {
    const variantsForH = Object.keys(this.findMap.HisEqualTo);

    const ans = this.getAnswer(variantsForH);

    if (!ans) {
      console.error("H and K - could not be found");

      return null;
    }

    return ans;
  }
}

// Custom 1
class TransformCustom1 extends Transform {
  constructor(...args) {
    super(...args);

    // H = P => K = 2 * D + (D * E / 100)
    this.findMap.HisEqualTo.P.getK = () => 2 * this.D + (this.D * this.E) / 100;
  }
}

// Custom 2
class TransformCustom2 extends TransformCustom1 {
  constructor(...args) {
    super(...args);

    // A && B && !C => H = T
    this.findMap.HisEqualTo.T.check = () => this.A && this.B && !this.C;

    this.findMap.HisEqualTo.M = {
      // A && !B && C => H = M
      check: () => this.A && !this.B && this.C,
      // H = M => K = F + D + (D * E / 100)
      getK: () => this.F + this.D + (this.D * this.E) / 100,
    };
  }
}

if (1) {
  // check 'M'
  const correctAns = {H: "M", K: 3.02};

  const t = new TransformCustom2(true, false, true, 1, 2, 2);
  const ans = t.transform();

  console.log(ans, ans.H === correctAns.H, ans.K === correctAns.K);
}

if (1) {
  // check 'P'
  const correctAns = {H: "P", K: 2.02};

  const t = new TransformCustom2(true, true, true, 1, 2, 2);
  const ans = t.transform();

  console.log(ans, ans.H === correctAns.H, ans.K === correctAns.K);
}

if (1) {
  // check 'T'
  const correctAns = {H: "T", K: 1.0};

  const t = new TransformCustom2(true, true, false, 2.0, 15, 15);
  const ans = t.transform();

  console.log(ans, ans.H === correctAns.H, ans.K === correctAns.K);
}
