.PHONY: dev
dev:
	(make client & make server & make bs & wait)

.PHONY: client
client: vendor
	webpack --config webpack.config.js --progress --profile --watch

.PHONY: vendor
vendor:
	webpack --config vendor.config.js --progress

.PHONY: test
test:
	mocha --watch --require ts-node/register  --compilers js:babel-core/register spec/foo_spec

# .PHONY: client
# client:
# 	watchify --debug -t babelify client.js  -o public/app.js

.PHONY: server
server:
	PORT=$(PORT) babel-node server.js $(FILE)

.PHONY: bs
bs:
	browser-sync start --proxy="localhost:$(PORT)" --files='public/*'