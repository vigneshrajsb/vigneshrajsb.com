.PHONY: help feed check serve

help: ## List available commands
	@grep -E '^[a-z]+:.*##' $(MAKEFILE_LIST) | awk -F ':.*## ' '{printf "  make %-8s %s\n", $$1, $$2}'

feed: ## Regenerate feed.xml from the post pages under writing/
	python3 tools/render-viz.py
	python3 tools/build-feed.py
	xmllint --noout feed.xml

check: ## Validate XML files and verify feed.xml is current
	xmllint --noout feed.xml sitemap.xml
	python3 tools/build-feed.py --check

serve: ## Serve the site locally on http://localhost:4173
	python3 -m http.server 4173
