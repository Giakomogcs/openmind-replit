
import os
from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    # Garante que o diretório de screenshots exista
    screenshots_dir = "jules-scratch/verification/screenshots"
    os.makedirs(screenshots_dir, exist_ok=True)

    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    print("Aguardando 30 segundos pelo início do servidor...")
    time.sleep(30)

    try:
        # 1. Navega para a tela de projetos e cria um novo
        print("Acessando a tela de projetos...")
        page.goto("http://localhost:3001/projects", timeout=60000)
        expect(page.get_by_role("heading", name="Project Hub")).to_be_visible(timeout=30000)

        print("Criando um novo projeto chamado 'Projeto de Teste Final'...")
        project_name = "Projeto de Teste Final"
        page.get_by_placeholder("Enter project name").fill(project_name)
        page.get_by_role("button", name="Create Project").click()

        # Espera o novo projeto aparecer na lista e o acessa
        print("Acessando o novo projeto...")
        project_locator = page.get_by_text(project_name)
        expect(project_locator).to_be_visible(timeout=30000)
        project_locator.click()
        expect(page).to_have_url("http://localhost:3001/", timeout=30000)
        print("Projeto acessado.")

        # 2. Navega para a tela de conexões e abre o modal
        print("Navegando para a tela de conexões...")
        page.goto("http://localhost:3001/connections", timeout=60000)
        expect(page.get_by_role("heading", name="Connections")).to_be_visible(timeout=30000)

        print("Abrindo o modal de nova conexão...")
        page.get_by_role("button", name="Nova Conexão").click()

        modal_locator = page.locator(".modal-content")
        expect(modal_locator).to_be_visible(timeout=30000)
        print("Modal de conexão aberto.")

        screenshot_path_modal = os.path.join(screenshots_dir, "final_01_connections_modal.png")
        page.screenshot(path=screenshot_path_modal)
        print(f"Captura de tela do modal salva em: {screenshot_path_modal}")

        # 3. Usa o botão de logout na barra lateral
        print("Clicando no botão de Sair...")
        page.get_by_role("button", name="Sair").click()

        expect(page).to_have_url("http://localhost:3001/projects", timeout=30000)
        print("Logout realizado com sucesso.")

        # 4. Tira a segunda captura de tela
        expect(page.get_by_text(project_name)).to_be_visible(timeout=30000)
        screenshot_path_logout = os.path.join(screenshots_dir, "final_02_project_hub_after_logout.png")
        page.screenshot(path=screenshot_path_logout)
        print(f"Captura de tela final salva em: {screenshot_path_logout}")

    except Exception as e:
        print(f"Ocorreu um erro durante a verificação: {e}")
        error_screenshot_path = os.path.join(screenshots_dir, "final_error_screenshot.png")
        page.screenshot(path=error_screenshot_path)
        print(f"Captura de tela do erro salva em: {error_screenshot_path}")

    finally:
        context.close()
        browser.close()
        print("Verificação finalizada.")

with sync_playwright() as playwright:
    run(playwright)
