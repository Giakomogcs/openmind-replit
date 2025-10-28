from playwright.sync_api import sync_playwright

from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000")
    page.get_by_role("button", name="Nova Conexão").click()
    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)

with sync_playwright() as playwright:
    run(playwright)
