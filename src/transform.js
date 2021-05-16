import {stringToBoolean, stringToFloat, stringToInt} from "./convertors";

// Base
class Transform {
  constructor(A, B, C, D, E, F) {
    this.A = stringToBoolean(A);
    this.B = stringToBoolean(B);
    this.C = stringToBoolean(C);
    this.D = stringToFloat(D);
    this.E = stringToInt(E);
    this.F = stringToInt(F);

    if (
      typeof this.A !== "boolean" ||
      typeof this.B !== "boolean" ||
      typeof this.C !== "boolean" ||
      typeof this.D !== "number" ||
      typeof this.E !== "number" ||
      typeof this.F !== "number"
    ) {
      console.error("Input type error");
    }

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
export class TransformCustom2 extends TransformCustom1 {
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

export const transformRequest = (data) => {
  const {A, B, C, D, E, F} = data;

  const transform = new TransformCustom2(A, B, C, D, E, F);

  return transform.transform();
};
