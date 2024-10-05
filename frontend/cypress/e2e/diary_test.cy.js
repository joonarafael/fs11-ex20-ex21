describe("Flight Diary", function () {
	it("Front page can be opened", function () {
		cy.visit("/");
		cy.contains("Add new entry");
		cy.contains("Diary entries");
	});

	it("4 default entries should exist at start", function () {
		cy.visit("/");
		cy.contains("2017-01-01");
		cy.contains("2017-04-01");
		cy.contains("2017-04-15");
		cy.contains("2017-05-11");
	});

	it("Empty form cannot be submited", function () {
		cy.visit("/");

		cy.get('button[type="submit"]').click();

		cy.contains("Please fill all fields");
	});

	it("New entry can be added", function () {
		cy.visit("/");

		cy.get('input[id="date"]')
			.invoke("removeAttr", "type")
			.type("2024-10-05{enter}")
			.trigger("change");
		cy.get('input[id="date"]')
			.invoke("attr", "value", "2024-10-05")
			.trigger("change");
		cy.get('input[id="date"]').invoke("attr", "type", "date");

		cy.get('input[id="visibilityChoice1"]').check();
		cy.get('input[id="weatherChoice1"]').check();

		cy.get('input[id="comment"]').type("Test comment");

		cy.get('button[type="submit"]').click();

		cy.contains("Entry added successfully");

		cy.visit("/");
		cy.contains("2024-10-05");
	});
});
