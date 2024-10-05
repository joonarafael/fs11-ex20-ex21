import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import AddDiary from "../adddiary";

describe("<AddDiary />", () => {
	it("should render items", () => {
		const setNotification = (notification: {
			error?: boolean;
			message?: string | null;
		}) => {
			console.log(notification);
		};

		render(
			<BrowserRouter>
				<AddDiary setNotification={setNotification} />
			</BrowserRouter>
		);
		expect(screen.getByText("Add entry")).toBeVisible();
	});
});
