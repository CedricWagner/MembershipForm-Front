import { amountToString, timestampToDate } from "./transformers";

describe("transformers / amountToString", () => {
  test("it should parse decimal to string", () => {
    const amount = amountToString(13.12);

    expect(amount).toBe("13.12");
    expect(amount).not.toBe(13.12);
  });
  test("it should return '0' on null", () => {
    const amountNull = amountToString(null);
    const amountUndefined = amountToString(undefined);
    const amount0 = amountToString(0);
    const amount0dot0 = amountToString(0.0);

    expect(amountNull).toBe("0");
    expect(amountUndefined).toBe("0");
    expect(amount0).toBe("0");
    expect(amount0dot0).toBe("0");
  });
});

describe("transformers / timestampToDate", () => {
  test("it should return the correct date", () => {
    const date = timestampToDate("2023-08-10T00:00:00+00:00");

    expect(date).toBe("2023-08-10");
  });
});
