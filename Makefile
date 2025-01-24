init-and-start: up
	@docker container exec backend ash -c "npm ci && npm start"

up:
	@docker compose up -d --build

down:
	@docker compose down

rm:
	@docker container rm -f $$(docker container ls -a -q)

ls:
	@docker container ls -a

logs:
	@docker container logs -f backend
	
dev:
	@npm run dev

exec:
	@docker container exec -it backend ash

test:
	@docker container exec -it backend ash -c "npm run test tests/"

test-cov:
	@docker container exec -it backend ash -c "npm run test:cov tests/"

test-ci:
	@npm run test:cov tests/

ci-cd:
	@gh extension exec act --job ci

clear-cache:
	@docker buildx prune -a -f

docker-df:
	@docker system df