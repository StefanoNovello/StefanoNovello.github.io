SHELL := /bin/bash

BUNDLE ?= bundle
JEKYLL_PORT ?= 4000

.PHONY: help doctor setup install serve build clean

help:
	@echo "Tumaini website developer tasks"
	@echo ""
	@echo "make doctor   - check local toolchain (ruby, bundler, jekyll)"
	@echo "make setup    - configure local bundle path and install gems"
	@echo "make install  - alias of setup"
	@echo "make serve    - run local Jekyll server with livereload"
	@echo "make build    - build static site into _site/"
	@echo "make clean    - remove generated site and local bundle cache"

doctor:
	@echo "Ruby:   $$(ruby -v 2>/dev/null || echo 'missing')"
	@echo "Gem:    $$(gem -v 2>/dev/null || echo 'missing')"
	@echo "Bundle: $$($(BUNDLE) -v 2>/dev/null || echo 'missing')"
	@echo "Jekyll: $$($(BUNDLE) exec jekyll -v 2>/dev/null || echo 'not installed yet (run make setup)')"

setup:
	$(BUNDLE) config set --local path 'vendor/bundle'
	$(BUNDLE) install

install: setup

serve:
	$(BUNDLE) exec jekyll serve --trace --livereload --port $(JEKYLL_PORT)

build:
	$(BUNDLE) exec jekyll build --trace

clean:
	rm -rf _site .jekyll-cache .sass-cache vendor/bundle
