# Деплой на GitHub Pages

## Что сделано

В папке `.github/workflows/deploy.yml` настроен workflow: при каждом пуше в ветку `main` или `master` сайт публикуется на GitHub Pages.

## Что нужно сделать в репозитории

1. Откройте репозиторий на GitHub → **Settings** → **Pages**.
2. В блоке **Build and deployment** в поле **Source** выберите **GitHub Actions**.
3. Сделайте пуш в ветку `main` или `master` — workflow запустится сам.

После первого успешного запуска сайт будет доступен по адресу:
`https://<ваш-username>.github.io/<имя-репозитория>/`

## Если репозиторий в организации

Для окружения `github-pages` может понадобиться один раз подтвердить права (если GitHub попросит при первом запуске workflow).
