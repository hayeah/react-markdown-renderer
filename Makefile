PORT=9000

.PHONY: client
client:
	make vendor
	webpack --config webpack.config.js --progress --profile --watch

.PHONY: vendor
vendor:
	webpack --config vendor.config.js --progress

.PHONY: all
all:
	(make client & make bs & wait)

.PHONY: test
test:
	mocha --compilers js:mocha-babel spec

# .PHONY: client
# client:
# 	watchify --debug -t babelify client.js  -o public/app.js

.PHONY: server
server:
	PORT=$(PORT) babel-node server.js

.PHONY: bs
bs:
	browser-sync start --proxy="localhost:$(PORT)" --files='public/*'