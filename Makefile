.PHONY: help feed check lint shots serve

help: ## List available commands
	@grep -E '^[a-z]+:.*##' $(MAKEFILE_LIST) | awk -F ':.*## ' '{printf "  make %-8s %s\n", $$1, $$2}'

feed: ## Regenerate feed.xml from the post pages under writing/
	python3 tools/render-viz.py
	python3 tools/build-feed.py
	xmllint --noout feed.xml

check: ## Validate XML, verify feed.xml is current, and lint the pages
	xmllint --noout feed.xml sitemap.xml
	python3 tools/build-feed.py --check
	python3 tools/lint-site.py

lint: ## Check pages for dark mode, share cards, images, links, JSON-LD, stray files
	python3 tools/lint-site.py

shots: ## Screenshot every page light/dark at 1100px and 375px (needs make serve)
	node tools/screenshots.js

serve: ## Serve the site locally on http://localhost:4173
	python3 -m http.server 4173
