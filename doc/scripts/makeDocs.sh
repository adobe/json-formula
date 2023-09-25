#!/bin/bash

# add x for debugging
set -eu
VERSION=`grep version ../package.json | sed 's/.*"version": "\(.*\)",.*/\1/'`
OUTPUT_NAME="json-formula-specification"

# define the pandoc docker container
PANDOC_IMG=pandoc/core

# define the asciidoctor docker container
AD_DOCKER_IMG=asciidoctor/docker-asciidoctor

#detect platform that we're running on...
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=linux/amd64;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac

# make sure we have an output dir
mkdir -p output

# check the current path
# and get its parent
CURRENT_PATH=`pwd`
echo "CURRENT_PATH = ${CURRENT_PATH}"
if [ "${machine}" == "MinGw" ]; then
	CURRENT_PATH=/`pwd`
fi
PARENT_PATH="$(dirname "${CURRENT_PATH}")"
# echo "Parent = $PARENT_PATH"


# this is the core routine to process one file...
convertOne() {

	# make sure we have the docker images
	if [[ "$(docker images -q "${PANDOC_IMG}" 2> /dev/null)" == "" ]]; then
		echo "Pulling Pandoc Docker image"
		docker pull "${PANDOC_IMG}"
	fi

	if [[ "$(docker images -q "${AD_DOCKER_IMG}" 2> /dev/null)" == "" ]]; then
		echo "Pulling AsciiDoc Docker image"
		docker pull "${AD_DOCKER_IMG}"
	fi

	# compute the base name
	filename=$(basename -- "$1")
	extension="${filename##*.}"
	filename="${filename%.*}"
	BASE_NAME=$filename
	echo "BaseName = $BASE_NAME"

	echo "Converting functions.md to ADOC"
	docker run --rm -v "${CURRENT_PATH}":"${CURRENT_PATH}" -w "${CURRENT_PATH}" --platform "${machine}"\
		pandoc/core functions.md -o functions.adoc

    # apply some touch-ups to the asciidoc output
	node ./scripts/modFunctionsADoc.js

	# Create the HTML version
	echo "Converting "${BASE_NAME}".adoc to HTML"
	docker run --rm -v "${CURRENT_PATH}":"${CURRENT_PATH}" -w "${CURRENT_PATH}" --platform "${machine}"\
			-v "${CURRENT_PATH}/fonts":"${CURRENT_PATH}/fonts"	\
			-v "${PARENT_PATH}/antlr":"${CURRENT_PATH}/antlr"	\
			"${AD_DOCKER_IMG}" asciidoctor \
			--backend html5 \
			-D ./output \
			-a data-uri \
			-a revnumber="${VERSION}" \
			-a USING_DOCKER \
			-o "${OUTPUT_NAME}".html "${BASE_NAME}".adoc

	# Create the PDF version
	echo "Converting "${BASE_NAME}".adoc to PDF"
	docker run --rm -v "${CURRENT_PATH}":"${CURRENT_PATH}" -w "${CURRENT_PATH}" --platform "${machine}"\
			-v "${CURRENT_PATH}/fonts":"${CURRENT_PATH}/fonts"	\
			-v "${PARENT_PATH}/antlr":"${CURRENT_PATH}/antlr"	\
			"${AD_DOCKER_IMG}" asciidoctor-pdf -r asciidoctor-diagram \
			--backend=pdf \
			-D ./output \
			-a revnumber="${VERSION}" \
			-a data-uri \
			-a USING_DOCKER \
			-a pdf-theme="${BASE_NAME}"-theme.yml \
			-a pdf-fontsdir="fonts"  \
			-o "${OUTPUT_NAME}".pdf "${BASE_NAME}".adoc
}

rm -f functions.md functions.adoc
# process all the files
npm run docs
# get a copy of the generated function markdown docs and
# tweak the output so it is suitable for the spec
node ./scripts/modFunctions.js

# remove comments and directives from the antlr grammar
node ./scripts/strip.js
convertOne "./spec.adoc"
rm ./grammar.g4