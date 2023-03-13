import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FileUpload from "./FileUpload";

describe("FileUpload", () => {
  it("should render", () => {
    render(<FileUpload />);
  });

  it("should have a button to upload files", () => {
    render(<FileUpload />);

    const uploadBtn = screen.getByRole("button", { name: /upload/i });
    expect(uploadBtn).toBeInTheDocument();
  });

  it("should disable upload button if file type is not supported", async () => {
    render(<FileUpload />);

    const fileInput: HTMLInputElement = screen.getByLabelText(/upload image/i);

    const uploadBtn = screen.getByRole("button", { name: /upload/i });

    const file = new File(["image"], "image.png", { type: "image/png" });

    expect(fileInput.files?.length).toBe(0);

    expect(uploadBtn).not.toBeDisabled();

    await userEvent.upload(fileInput, file, { applyAccept: false });

    expect(fileInput.files?.length).toBe(1);

    expect(uploadBtn).toBeDisabled();
  });

  it("should only accept JPG images file types", async () => {
    render(<FileUpload />);

    const fileInput: HTMLInputElement = screen.getByLabelText(/upload image/i);

    const file = new File(["image"], "image.png", { type: "image/png" });

    expect(fileInput.files?.length).toBe(0);

    await userEvent.upload(fileInput, file, { applyAccept: false });

    expect(fileInput.files?.length).toBe(1);

    waitFor(() => {
      const errorMessage = screen.getByRole("alert", {
        name: /image type is not supported/i,
      });

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
