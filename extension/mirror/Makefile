JSMIN = uglifyjs
CSSMIN = cat
DATE = $$(date "+%Y-%m-%d")
JSFILE = js/codemirror$(DATE).js
CSSFILE = css/codemirror$(DATE).css

update:
	@rm -rf mirror/
	@git clone http://github.com/marijnh/CodeMirror2 mirror
	@cp -rf mirror/LICENSE .
	@echo "Compressing js files..."
	@cat mirror/lib/codemirror.js | $(JSMIN) > $(JSFILE);  \
	cat mirror/lib/util/*.js | $(JSMIN) >> $(JSFILE);  \
	cat mirror/mode/*/*.js | $(JSMIN) >> $(JSFILE);  \
	cat mirror/mode/rpm/*/*.js | $(JSMIN) >> $(JSFILE);  \
	cat mirror/keymap/*.js | $(JSMIN) >> $(JSFILE)
	@echo "Created: $(JSFILE)"
	@echo "Compressing css files..."
	@cat mirror/lib/*.css | $(CSSMIN) > $(CSSFILE);  \
	cat mirror/lib/util/*.css | $(CSSMIN) >> $(CSSFILE);  \
	cat mirror/theme/*.css | $(CSSMIN) >> $(CSSFILE); \
	cat mirror/mode/*/*.css | $(CSSMIN) >> $(CSSFILE); \
	cat mirror/mode/*/*/*.css | $(CSSMIN) >> $(CSSFILE)
	@echo "Created: $(CSSFILE)"
	@rm -rf mirror
	@echo "Done."

.PHONY: update
