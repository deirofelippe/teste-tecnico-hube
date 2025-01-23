up:
	@docker compose up -d --build

down:
	@docker compose down

rm:
	@docker container rm -f $$(docker container ls -a -q)

ls:
	@docker container ls -a

exec:
	@docker container exec -it backend ash

test:
	@docker container exec -it backend ash -c "npm run test tests/integration"

test-ci:
	@npm run test:cov tests/

ci-cd:
	@gh extension exec act --job ci