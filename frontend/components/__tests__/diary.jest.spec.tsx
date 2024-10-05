import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Diary, Visibility, Weather } from "../../types/index";
import DiaryEntry from "../diary";

describe("<DiaryEntry />", () => {
	it("should render the diary entry correctly", () => {
		const mockDiary: Diary = {
			id: 1,
			date: "2023-10-05",
			visibility: Visibility.great,
			weather: Weather.sunny,
			comment: "A wonderful sunny day!",
		};

		render(<DiaryEntry diary={mockDiary} />);

		expect(screen.getByText("2023-10-05")).toBeInTheDocument();
		expect(screen.getByText("visibility: great")).toBeInTheDocument();
		expect(screen.getByText("weather: sunny")).toBeInTheDocument();
	});
});
