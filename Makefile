.PHONY: up down build restart migrate clean

# Запуск всех сервисов
up:
	docker-compose up -d

# Остановка всех сервисов
down:
	docker-compose down

# Пересборка и запуск
build:
	docker-compose up -d --build

# Перезапуск
restart:
	docker-compose restart

# Просмотр логов
logs:
	docker-compose logs -f backend

# Очистка базы данных (удаление volumes)
clean:
	docker-compose down -v

# Запуск миграций вручную (если нужно)
migrate:
	docker-compose exec backend ./main

# Запуск только базы данных
db:
	docker-compose up -d postgres

# Остановка только базы данных
db-down:
	docker-compose stop postgres

