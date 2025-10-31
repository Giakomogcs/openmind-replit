from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the project hub
    page.goto("http://localhost:3001/projects")

    # Create a new project
    page.get_by_placeholder("Enter project name").fill("Test Project")
    page.get_by_role("button", name="Create Project").click()

    # Wait for navigation to the main page and take a screenshot
    page.wait_for_url("http://localhost:3001/")
    page.screenshot(path="jules-scratch/verification/verification.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
