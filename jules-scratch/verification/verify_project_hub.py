from playwright.sync_api import Page, expect

def verify_project_hub(page: Page):

    page.goto("http://localhost:3000")


    expect(page).to_have_title("React App")


    page.screenshot(path="jules-scratch/verification/01_project_hub.png")


    page.get_by_placeholder("Enter project name").fill("Test Project")


    page.get_by_role("button", name="Create Project").click()


    expect(page.get_by_text("Welcome back!")).to_be_visible()


    page.screenshot(path="jules-scratch/verification/02_main_view.png")
