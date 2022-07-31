#!/bin/zsh
WORKSPACE=$(mktemp -d "${TMPDIR:-/tmp/}$(basename $0).XXXXXXXXXXXX")
trap 'rm -rf -- "$WORKSPACE"' EXIT

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
# Read in default values
source $SCRIPT_DIR/.default_profile
echo $env
# Setup rsa signing keys
openssl genrsa -out $WORKSPACE/privatekey.pem 4096
openssl rsa -in $WORKSPACE/privatekey.pem -out $WORKSPACE/publickey.pem -pubout -outform PEM


export API_RSA_PRIVATE_SIGNING_KEY=$(cat $WORKSPACE/privatekey.pem)
export API_RSA_PUBLIC_SIGNING_KEY=$(cat $WORKSPACE/publickey.pem)

envsubst < .env.template > .env