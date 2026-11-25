from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(SimpleHTTPRequestHandler, directory=str(ROOT)))
Thread(target=server.serve_forever, daemon=True).start()
base = f'http://127.0.0.1:{server.server_port}'

try:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))

        page.goto(base + '/catalog.html')
        assert page.locator('.product-card').count() == 12
        assert page.locator('#catalog-count').inner_text() == 'Найдено товаров: 12'
        page.locator('#catalog-search').fill('термос')
        assert page.locator('.product-card').count() == 2
        page.locator('#catalog-search').fill('нет такого товара')
        assert page.locator('#catalog-empty').is_visible()
        page.locator('#catalog-reset').click()
        page.locator('#catalog-category').select_option('tech')
        assert page.locator('.product-card').count() == 2
        page.locator('#catalog-category').select_option('all')
        page.locator('#catalog-sort').select_option('price-asc')
        assert 'Линейка-лупа' in page.locator('.product-card').first.inner_text()
        page.locator('#catalog-sort').select_option('default')
        page.locator('[data-favorite="1"]').click()
        page.locator('#catalog-favorites').check()
        assert page.locator('.product-card').count() == 1
        page.reload()
        page.locator('#catalog-favorites').check()
        assert page.locator('.product-card').count() == 1
        page.locator('#catalog-favorites').uncheck()
        page.locator('[data-id="1"]').click()
        page.locator('[data-id="1"]').click()
        assert page.locator('.cart-count').first.inner_text() == '2'

        page.goto(base + '/cart.html')
        assert '7' in page.locator('#cart-total').inner_text()
        assert page.locator('#cart-items-count').inner_text() == '2'
        page.get_by_role('button', name='Добавить одну единицу: Бирюзовая футболка 1С').click()
        assert page.locator('.quantity-value').inner_text() == '3'
        assert page.locator('#cart-items-count').inner_text() == '3'
        assert '11 700' in page.locator('#cart-total').inner_text().replace('\xa0', ' ')
        page.get_by_role('button', name='Убрать одну единицу: Бирюзовая футболка 1С').click()
        assert page.locator('.quantity-value').inner_text() == '2'
        page.reload()
        assert page.locator('.quantity-value').inner_text() == '2'
        page.get_by_role('button', name='Убрать одну единицу: Бирюзовая футболка 1С').click()
        assert page.locator('#cart-items-count').inner_text() == '1'

        page.goto(base + '/order.html')
        assert page.locator('#order-product').count() == 0
        assert page.locator('#order-items li').count() == 1
        assert 'Бирюзовая футболка 1С' in page.locator('#order-items').inner_text()
        assert '3 900' in page.locator('#order-total').inner_text().replace('\xa0', ' ')
        page.locator('#order-form button[type="submit"]').click()
        assert page.locator('#order-message').is_visible()
        assert page.locator('#order-email').get_attribute('aria-invalid') == 'true'
        page.locator('#order-name').fill('Андрей')
        page.locator('#order-email').fill('andrey@example.com')
        page.locator('#order-phone').fill('+7 967 942-52-67')
        page.locator('input[type="checkbox"]').check()
        page.locator('#order-form button[type="submit"]').click()
        assert 'Заявка подготовлена' in page.locator('#order-message').inner_text()
        assert page.locator('#order-name').input_value() == ''

        page.evaluate("localStorage.removeItem('kr4-cart')")
        page.reload()
        assert page.locator('#order-empty').is_visible()
        page.locator('#order-form button[type="submit"]').click()
        assert 'Добавьте товары' in page.locator('#order-message').inner_text()
        page.goto(base + '/order.html?product=1')
        assert page.locator('#order-items li').count() == 1
        page.reload()
        assert page.locator('#order-items li').count() == 1
        page.goto(base + '/cart.html')
        page.get_by_role('button', name='Убрать одну единицу: Бирюзовая футболка 1С').click()
        assert page.locator('#cart-empty').is_visible()
        assert page.locator('#cart-summary').is_hidden()
        assert page.locator('.cart-count').first.inner_text() == '0'

        for file in [*ROOT.glob('*.html'), *(ROOT / 'products').glob('*.html')]:
            page.goto(base + '/' + file.relative_to(ROOT).as_posix(), wait_until='networkidle')
        assert not errors, errors
        browser.close()
finally:
    server.shutdown()
