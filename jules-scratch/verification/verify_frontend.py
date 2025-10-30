from playwright.sync_api import sync_playwright

import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Wait for the dev server to start
    time.sleep(15)

    # Navigate to the project hub
    page.goto("http://localhost:3000/projects")

    # Create a new project
    page.get_by_placeholder("Enter project name").fill("Test Project")
    page.get_by_role("button", name="Create Project").click()

    # Go to the project hub and take a screenshot
    page.goto("http://localhost:3000/projects")
    page.screenshot(path="jules-scratch/verification/project-hub.png")

    # Navigate to the login page and take a screenshot
    page.goto("http://localhost:3000/login")
    page.screenshot(path="jules-scratch/verification/login-page.png")

    # ---------------------
    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
