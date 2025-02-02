up:
	docker compose -f ./docker/compose.yml up --build

down:
	docker compose -f ./docker/compose.yml down

logs:
	docker compose -f ./docker/compose.yml logs -f

up-dev:
	docker compose -f ./docker/compose-dev.yml up --build

down-dev:
	docker compose -f ./docker/compose-dev.yml down