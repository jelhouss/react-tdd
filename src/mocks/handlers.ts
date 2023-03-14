import { rest } from "msw";

const handlers = [
  rest.post("/api/file-upload", async (req, res, ctx) => {
    // dummy example
    return res(ctx.delay(2000), ctx.status(201));
  }),
];

export default handlers;
