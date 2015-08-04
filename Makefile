SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

start:
	@supervisor \
		--harmony \
		--ignore app,srv \
		--no-restart-on exit \
		lib
