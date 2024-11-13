ENV_FILE=./config/env/.env
COMPOSE_FILE_PATH=./docker/docker-compose.yml

.PHONY: check-env up down build logs dev

check-env:
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "Error: .env file not found in $(ENV_FILE)"; \
		exit 1; \
	fi

up: check-env
	docker compose --env-file $(ENV_FILE) -f $(COMPOSE_FILE_PATH) up -d --build

down: check-env
	docker compose --env-file $(ENV_FILE) -f $(COMPOSE_FILE_PATH) down -v

build: check-env
	docker compose --env-file $(ENV_FILE) -f $(COMPOSE_FILE_PATH) build

logs: check-env
	docker compose --env-file $(ENV_FILE) -f $(COMPOSE_FILE_PATH) logs --follow --tail 500

dev: up