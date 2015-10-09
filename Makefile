.PHONY: test
test:
	mocha --compilers js:mocha-babel spec

.PHONY: client
client:
	watchify --debug -t babelify client.js  -o public/app.js