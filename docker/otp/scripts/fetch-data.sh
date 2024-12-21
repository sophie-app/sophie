#!/bin/bash

# Fail the script on any error
set -e

# Install curl if not installed
apk add --no-cache curl

# Get API key from environment variable
if [ -z "$ODPT_CHALLENGE_ACCESS_TOKEN" ]; then
  echo "❌ Error: ODPT_CHALLENGE_ACCESS_TOKEN is not set."
fi
if [ -z "$ODPT_ACCESS_TOKEN" ]; then
  echo "❌ Error: ODPT_ACCESS_TOKEN is not set."
fi

if [ -z "$ODPT_CHALLENGE_ACCESS_TOKEN" ] || [ -z "$ODPT_ACCESS_TOKEN" ]; then
  echo "Please set the access tokens in the environment variables."
  exit 1
fi

# URLs for GTFS and OSM data
GTFS_URL="https://api-challenge2024.odpt.org/api/v4/files/JR-East/data/JR-East-Train-GTFS.zip?acl:consumerKey=$API_KEY"
OSM_URL="https://download.geofabrik.de/asia/japan-latest.osm.pbf"

# Ensure the otp directory exists
mkdir -p ./otp

# Download GTFS data
if [ ! -f ./docker/otp/gtfs.zip ]; then
  echo "📥 Downloading GTFS data from $GTFS_URL..."
  curl -L --retry 5 --retry-delay 5 "$GTFS_URL" -o ./otp/gtfs.zip
  echo "✅ GTFS data downloaded."
else
  echo "⏭️ GTFS data already exists. Skipping download."
fi

# Download OSM data
if [ ! -f ./docker/otp/osm.pbf ]; then
  echo "📥 Downloading OSM data from $OSM_URL..."
  curl -L --retry 5 --retry-delay 5 "$OSM_URL" -o ./otp/osm.pbf
  echo "✅ OSM data downloaded."
else
  echo "⏭️ OSM data already exists. Skipping download."
fi

# Replace [Access_Token_for_Challenge2024] in router-config.template.json with the API key
if [ -f ./docker/otp/router-config.template.json ]; then
  echo "⏳ Embedding API key into router-config.json..."
  sed 's/\[Access_Token_for_ODPT\]/'"$ODPT_ACCESS_TOKEN"'/g' ./docker/otp/router-config.template.json > ./docker/otp/router-config.json
  sed 's/\[Access_Token_for_Challenge2024\]/'"$ODPT_CHALLENGE_ACCESS_TOKEN"'/g' ./docker/otp/router-config.template.json > ./docker/otp/router-config.json
  echo "✅ API key successfully embedded in router-config.json."
else
  echo "❌ Error: router-config.template.json not found. Exiting."
  exit 1
fi

echo "🎉 Initial setup completed successfully."
