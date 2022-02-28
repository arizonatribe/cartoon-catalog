import {
    State,
    reducer,
    increment,
    decrement,
    incrementByAmount,
} from "./slice";

describe("counter reducer", () => {
    const initialState: State = {
        value: 3,
        status: "idle",
    };
  
    it("should handle initial state", () => {
      expect(reducer(undefined, { type: "unknown" })).toEqual({
          value: 0,
          status: "idle",
      });
    });
  
    it("should handle increment", () => {
      const actual = reducer(initialState, increment());
      expect(actual.value).toEqual(4);
    });
  
    it("should handle decrement", () => {
      const actual = reducer(initialState, decrement());
      expect(actual.value).toEqual(2);
    });
  
    it("should handle incrementByAmount", () => {
      const actual = reducer(initialState, incrementByAmount(2));
      expect(actual.value).toEqual(5);
    });
});
