import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import server from "./mocks/server";

// extends Vitest's (global) expect method with methods from react-testing-library
expect.extend(matchers);

// establish API mocking before all tests
beforeAll(() => {
  server.printHandlers();
  server.listen({ onUnhandledRequest: "warn" });
});

// runs a cleanup after each test case (e.g. clearing jsdom)
// also reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// clean up after the tests are finished
afterAll(() => server.close());
