include .env
export

UI_DIR := $(shell pwd)
export UI_DIR

# build with yarn.sh
frontend-yarn:
	cd frontend && yarn
general-editor-yarn:
	cd general-editor && yarn
react-image-annotate-yarn:
	cd react-image-annotate && yarn
tool-llm-editor-yarn:
	cd tool-llm-editor && yarn
three-dimensional-editor-yarn:
	cd three-dimensional-editor && yarn
# run dev with yarnsh - windowns - linux - mac

yarn-build:
	make frontend-yarn && make general-editor-yarn && make react-image-annotate-yarn && make tool-llm-editor-yarn && make three-dimensional-editor-yarn

setup:
	make yarn-build && python3 -m pip install aixblock_core && python3 setup_core.py

worker:
	python3 worker.py

run:
	python3 main.py
