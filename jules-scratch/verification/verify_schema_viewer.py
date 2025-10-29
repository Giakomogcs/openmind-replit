import os
import requests
from playwright.sync_api import sync_playwright, expect

def setup_test_data():
    """Creates a project and a connection for the test."""
    # Create project
    project_response = requests.post("http://localhost:3000/projects", json={"name": "Test Project"})
    project_id = project_response.json()["id"]

    # Create connection
    connection_data = {
        "name": "Test API",
        "type": "API",
        "apiUrl": "https://petstore.swagger.io/v2/swagger.json",
        "projectId": project_id
    }
    requests.post("http://localhost:3000/connections", json=connection_data)

    return project_id

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    project_id = setup_test_data()

    page.goto(f"http://localhost:3001/projects/{project_id}/schema")

    # Wait for the page to load and the schema viewer to be visible
    expect(page.locator('.schema-viewer')).to_be_visible()

    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
