# 🐳 Docker Setup - Локальная база данных

## Быстрый старт

### 1. Запуск только базы данных (PostgreSQL)

```bash
docker-compose up -d postgres
```

База данных будет доступна на `localhost:5432`

### 2. Запуск всего стека (БД + Backend)

```bash
docker-compose up -d
```

Или с пересборкой:

```bash
docker-compose up -d --build
```

### 3. Просмотр логов

```bash
docker-compose logs -f backend
```

## Использование Makefile

```bash
# Запуск всех сервисов
make up

# Остановка
make down

# Пересборка
make build

# Просмотр логов
make logs

# Очистка базы данных (удаление всех данных)
make clean

# Запуск только БД
make db
```

## Подключение к базе данных

**Из приложения:**
- Host: `localhost` (или `postgres` если внутри Docker сети)
- Port: `5432`
- Database: `englishlessons`
- User: `jaxa`
- Password: `11041104`

**Connection string:**
```
postgres://jaxa:11041104@localhost:5432/englishlessons?sslmode=disable
```

## Локальный запуск без Docker

Если хотите запустить только backend локально (без Docker):

1. Запустите только PostgreSQL:
```bash
docker-compose up -d postgres
```

2. Запустите backend:
```bash
go run main.go
```

Backend автоматически подключится к локальной базе и выполнит миграции.

## Пересоздание базы данных

Если нужно полностью пересоздать базу:

```bash
# Остановить и удалить volumes
docker-compose down -v

# Запустить заново
docker-compose up -d
```

## Проверка подключения

Проверить что база работает:

```bash
docker-compose exec postgres psql -U jaxa -d englishlessons -c "SELECT version();"
```

## Переменные окружения

Можно создать `.env` файл:

```env
DATABASE_URL=postgres://jaxa:11041104@localhost:5432/englishlessons?sslmode=disable
JWT_SECRET=your-secret-key-change-in-production
PORT=8080
```

Или использовать переменные окружения напрямую:

```bash
export DATABASE_URL="postgres://jaxa:11041104@localhost:5432/englishlessons?sslmode=disable"
go run main.go
```

