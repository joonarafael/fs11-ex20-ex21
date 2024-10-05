describe("Flight Diary", function () {
	it("Front page can be opened", function () {
		cy.visit("/");
		cy.contains("Add new entry");
		cy.contains("Diary entries");
	});
});
