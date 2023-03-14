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

  it("should display a notification on the upload success", async () => {
    render(<FileUpload />);

    // 1 - Get the upload button
    const uploadBtn = screen.getByRole("button", { name: /upload/i });

    // 2 - Get the file input
    const fileInput: HTMLInputElement = screen.getByLabelText(/upload image/i);

    // 3 - Prepare a file to upload
    const file = new File(["image"], "image.jpeg", { type: "image/jpeg" });

    // 4 - Assert that no file is added yet
    expect(fileInput.files?.length).toBe(0);

    // 5 - Simulate a change/upload event to the input and add the file
    await userEvent.upload(fileInput, file);

    // 6 - Assert that a file is added and loaded
    expect(fileInput.files?.length).toBe(1);

    // 7 - Simulate a click event on the upload button
    await userEvent.click(uploadBtn);

    // 8 - Assert the apperance of a loading text
    waitFor(() => {
      const uploadStatus = screen.getByRole("status", {
        name: /uploading image.../i,
      });

      expect(uploadStatus).toBeInTheDocument();
    });

    // 9 - Assert the appearance of successful upload text
    waitFor(() => {
      const uploadStatus = screen.getByRole("status", {
        name: /image has been successfully uploaded/i,
      });

      expect(uploadStatus).toBeInTheDocument();
    });
  });
});
