import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

import server from "./mocks/server";

// establish API mocking before all tests
beforeAll(() => {
  server.listHandlers();
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
