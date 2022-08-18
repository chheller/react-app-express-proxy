#!/bin/bash
# Setup a temp directory to put the rsa keys
WORKSPACE=$(mktemp -d "${TMPDIR:-/tmp/}$(basename $0).XXXXXXXXXXXX")
# Setup a trap to cleanup the temp directory
trap 'rm -rf -- "$WORKSPACE"' EXIT
# Get the path where the script lives, to reference the default env values in .default_profile
SCRIPT_DIR="$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)"
# Read in default values
source $SCRIPT_DIR/.default_profile.sh

# Setup rsa signing keys
# Note, OpenSSL `genrsa` will generate a PKCS#1 keytype, so we need to use genpkey instead 
openssl genpkey -out $WORKSPACE/privatekey.pem -algorithm RSA -pkeyopt rsa_keygen_bits:4096
# Export the public key
openssl pkey -in $WORKSPACE/privatekey.pem -out $WORKSPACE/publickey.pem -pubout
# Set local environment variables for the keys 
PRIVATE_KEY=$(cat $WORKSPACE/privatekey.pem)
PUBLIC_KEY=$(cat $WORKSPACE/publickey.pem)
# Strip away newlines
export API_RSA_PRIVATE_SIGNING_KEY="${PRIVATE_KEY//$'\n'/\\n}"
export API_RSA_PUBLIC_SIGNING_KEY="${PUBLIC_KEY//$'\n'/\\n}"

# Write out the values to .env file where the script was executed from
envsubst < .env.template > .env