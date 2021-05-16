import {stringToBoolean, stringToFloat, stringToInt} from "./convertors";

describe("convertor", () => {
  describe("stringToBoolean", () => {
    it('"true" => true', () => {
      const result = stringToBoolean("true");
      expect(result).toBeTruthy();
    });

    it('"False" => false', () => {
      const result = stringToBoolean("False");
      expect(result).toBeFalsy();
    });

    it('"False" => false', () => {
      const result = stringToBoolean("fff");
      expect(result).toBeNull();
    });
  });

  describe("stringToFloat", () => {
    it('"1.222" => 1.222', () => {
      const result = stringToFloat("1.222");
      expect(result).toBe(1.222);
    });

    it('"1,222" => 1.222', () => {
      const result = stringToFloat("1,222");
      expect(result).toBe(1.222);
    });

    it('"fff" => NaN', () => {
      const result = stringToFloat("fff");
      expect(result).toBeNaN();
    });
  });

  describe("stringToInt", () => {
    it('"1.222" => 1.', () => {
      const result = stringToInt("1.222");
      expect(result).toBe(1);
    });

    it('"1,222" => 1.', () => {
      const result = stringToInt("1,222");
      expect(result).toBe(1);
    });

    it('"fff" => NaN', () => {
      const result = stringToInt("fff");
      expect(result).toBeNaN();
    });
  });
});
