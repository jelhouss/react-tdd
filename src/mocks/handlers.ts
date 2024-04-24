import { HttpResponse, http } from "msw";

const handlers = [
  http.post(
    "/api/file-upload",
    async () =>
      new HttpResponse(null, {
        status: 201,
      })
  ),
];

export default handlers;
