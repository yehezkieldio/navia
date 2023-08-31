compose-up:
	docker-compose up -d

compose-down:
	docker-compose down

psql:
	@read -p "Enter username: " username; \
    	psql --host=0.0.0.0 --d=navia --username=$$username

.PHONY: psql compose-up compose-down
