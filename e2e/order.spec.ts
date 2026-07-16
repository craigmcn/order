import { test, expect } from "@playwright/test";

test("generates a speaking order from entered names", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Participant names").fill("Alice, Bob, Carol");
  await page.getByRole("button", { name: "Generate" }).click();

  const results = page.getByTestId("results");
  await expect(results).toBeVisible();
  await expect(results).toContainText("Alice");
  await expect(results).toContainText("Bob");
  await expect(results).toContainText("Carol");
});

test("clears the current list", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Participant names").fill("Alice, Bob, Carol");
  await page.getByRole("button", { name: "Generate" }).click();
  await expect(page.getByTestId("results")).toBeVisible();

  await page.getByRole("button", { name: "Clear current list" }).click();
  await expect(page.getByTestId("results")).toBeHidden();
});
