import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Notification from "../notification";

describe("<Notification />", () => {
	it("should not render anything if message is null", () => {
		render(<Notification message={null} />);

		expect(screen.queryByText(/./)).toBeNull();
	});

	it("should render error message in red", () => {
		render(<Notification isError={true} message="Error occurred" />);

		const messageElement = screen.getByText("Error occurred");
		expect(messageElement).toBeInTheDocument();
		expect(messageElement).toHaveStyle(`color: red`);
	});

	it("should render success message in green", () => {
		render(<Notification isError={false} message="Operation successful" />);

		const messageElement = screen.getByText("Operation successful");
		expect(messageElement).toBeInTheDocument();
		expect(messageElement).toHaveStyle(`color: green`);
	});
});
