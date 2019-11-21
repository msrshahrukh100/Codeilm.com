.PHONY: dep build buildOnly fmt run

# this is will init the project for development
setup:
			dep init
			dep ensure
			go build -o champ

dep:
			dep ensure

build:
			go build -o champ

fmt: dep
			go fmt ./...

