import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import diaryService from "../../services/diary";
import AddDiary from "../adddiary";

jest.mock("../../services/diary");

describe("<AddDiary />", () => {
	const setNotification = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render form elements", () => {
		render(<AddDiary setNotification={setNotification} />);

		expect(screen.getByLabelText("Date")).toBeInTheDocument();
		expect(screen.getByText("visibility")).toBeInTheDocument();
		expect(screen.getByLabelText("Great")).toBeInTheDocument();
		expect(screen.getByLabelText("Sunny")).toBeInTheDocument();
		expect(screen.getByLabelText("Comment")).toBeInTheDocument();
		expect(screen.getByText("Add entry")).toBeInTheDocument();
	});

	it("should show error notification if required fields are missing", async () => {
		render(<AddDiary setNotification={setNotification} />);

		fireEvent.click(screen.getByText("Add entry"));

		await waitFor(() =>
			expect(setNotification).toHaveBeenCalledWith({
				error: true,
				message: "Please fill all fields",
			})
		);
	});

	it("should show success notification when form is submitted successfully", async () => {
		(diaryService.addEntry as jest.Mock).mockResolvedValue("success");

		render(<AddDiary setNotification={setNotification} />);

		fireEvent.change(screen.getByLabelText("Date"), {
			target: { value: "2023-10-05" },
		});
		fireEvent.click(screen.getByLabelText("Great"));
		fireEvent.click(screen.getByLabelText("Sunny"));
		fireEvent.change(screen.getByLabelText("Comment"), {
			target: { value: "A sunny day with great visibility" },
		});

		fireEvent.click(screen.getByText("Add entry"));

		await waitFor(() =>
			expect(setNotification).toHaveBeenCalledWith({
				error: false,
				message: "Entry added successfully",
			})
		);
	});

	it("should show error notification when form submission fails", async () => {
		(diaryService.addEntry as jest.Mock).mockResolvedValue("Network error");

		render(<AddDiary setNotification={setNotification} />);

		fireEvent.change(screen.getByLabelText("Date"), {
			target: { value: "2023-10-05" },
		});
		fireEvent.click(screen.getByLabelText("Good"));
		fireEvent.click(screen.getByLabelText("Cloudy"));
		fireEvent.change(screen.getByLabelText("Comment"), {
			target: { value: "Cloudy day with good visibility" },
		});

		fireEvent.click(screen.getByText("Add entry"));

		await waitFor(() =>
			expect(setNotification).toHaveBeenCalledWith({
				error: true,
				message: "Network error",
			})
		);
	});
});
