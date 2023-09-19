#!/bin/bash

# add x for debugging
set -eu

# define the docker container
AD_DOCKER_IMG=asciidoctor/docker-asciidoctor

#detect platform that we're running on...
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
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
	if [[ "$(docker images -q "${AD_DOCKER_IMG}" 2> /dev/null)" == "" ]]; then
		echo "Pulling AsciiDoc Docker image"
		docker pull "${AD_DOCKER_IMG}"
	fi

	# compute the base name
	filename=$(basename -- "$1")
	extension="${filename##*.}"
	filename="${filename%.*}"
	BASE_NAME=$filename
	# echo "BaseName = $BASE_NAME"

	# Create the HTML version
	echo "Converting "${BASE_NAME}".adoc to HTML"
	docker run --rm -v "${CURRENT_PATH}":"${CURRENT_PATH}" -w "${CURRENT_PATH}" \
			-v "${CURRENT_PATH}/fonts":"${CURRENT_PATH}/fonts"	\
			-v "${PARENT_PATH}/antlr":"${CURRENT_PATH}/antlr"	\
			"${AD_DOCKER_IMG}" asciidoctor \
			--backend html5 \
			-D ./output \
			-a data-uri \
			-a USING_DOCKER \
			-o "${BASE_NAME}".html "${BASE_NAME}".adoc

	# Create the PDF version
	echo "Converting "${BASE_NAME}".adoc to PDF"
	docker run --rm -v "${CURRENT_PATH}":"${CURRENT_PATH}" -w "${CURRENT_PATH}" \
			-v "${CURRENT_PATH}/fonts":"${CURRENT_PATH}/fonts"	\
			-v "${PARENT_PATH}/antlr":"${CURRENT_PATH}/antlr"	\
			"${AD_DOCKER_IMG}" asciidoctor-pdf -r asciidoctor-diagram \
			--backend=pdf \
			-D ./output \
			-a data-uri \
			-a USING_DOCKER \
			-a pdf-theme="${BASE_NAME}"-theme.yml \
			-a pdf-fontsdir="fonts"  \
			-o "${BASE_NAME}".pdf "${BASE_NAME}".adoc
}

# process all the files
node strip.js
convertOne "./spec.adoc"
