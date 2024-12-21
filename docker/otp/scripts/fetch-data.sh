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

declare -A GTFS_URLS=(
  ["HakodateCity"]="https://api-public.odpt.org/api/v4/files/odpt/HakodateCity/Alllines.zip?date=20241219"
  ["Keio"]="https://api-challenge2024.odpt.org/api/v4/files/Keio/data/Keio-Train-GTFS.zip?acl:consumerKey=$ODPT_CHALLENGE_ACCESS_TOKEN"
  ["Sotetsu"]="https://api-challenge2024.odpt.org/api/v4/files/Sotetsu/data/Sotetsu-Train-GTFS.zip?acl:consumerKey=$ODPT_CHALLENGE_ACCESS_TOKEN"
  ["KyotoMunicipalTransportation"]="https://api.odpt.org/api/v4/files/odpt/KyotoMunicipalTransportation/Kyoto_City_Subway_GTFS.zip?date=20240815&acl:consumerKey=$ODPT_ACCESS_TOKEN"
  ["JR-East"]="https://api-challenge2024.odpt.org/api/v4/files/JR-East/data/JR-East-Train-GTFS.zip?acl:consumerKey=$ODPT_CHALLENGE_ACCESS_TOKEN"
  ["MIR"]="https://api.odpt.org/api/v4/files/MIR/data/MIR-Train-GTFS.zip?acl:consumerKey=$ODPT_ACCESS_TOKEN"
  ["Toei"]="https://api-public.odpt.org/api/v4/files/Toei/data/Toei-Train-GTFS.zip"
  ["Tobu"]="https://api-challenge2024.odpt.org/api/v4/files/Tobu/data/Tobu-Train-GTFS.zip?acl:consumerKey=$ODPT_CHALLENGE_ACCESS_TOKEN"
  ["TamaMonorail"]="https://api.odpt.org/api/v4/files/TamaMonorail/data/TamaMonorail-Train-GTFS.zip?acl:consumerKey=$ODPT_ACCESS_TOKEN"
  ["TWR"]="https://api.odpt.org/api/v4/files/TWR/data/TWR-Train-GTFS.zip?acl:consumerKey=$ODPT_ACCESS_TOKEN"
  ["TokyoMetro"]="https://api.odpt.org/api/v4/files/TokyoMetro/data/TokyoMetro-Train-GTFS.zip?acl:consumerKey=$ODPT_ACCESS_TOKEN"
  ["YokohamaMunicipal"]="https://api.odpt.org/api/v4/files/YokohamaMunicipal/data/YokohamaMunicipal-Train-GTFS.zip?acl:consumerKey=$ODPT_ACCESS_TOKEN"
)

# URL for OSM data
OSM_URL="https://download.geofabrik.de/asia/japan-latest.osm.pbf"

# Ensure the otp directory exists
mkdir -p ./otp

# Download GTFS data
for key in "${!GTFS_URLS[@]}"; do
  file="./docker/otp/$key.gtfs.zip"
  url="${GTFS_URLS[$key]}"
  if [ ! -f "$file" ]; then
    echo "📥 Downloading GTFS data from $url..."
    curl -L --retry 5 --retry-delay 5 "$url" -o "$file"
    echo "✅ GTFS data downloaded."
  else
    echo "⏭️ GTFS data already exists. Skipping download."
  fi
done

# Download OSM data
if [ ! -f ./docker/otp/osm.pbf ]; then
  echo "📥 Downloading OSM data from $OSM_URL..."
  curl -L --retry 5 --retry-delay 5 "$OSM_URL" -o ./docker/otp/osm.pbf
  echo "✅ OSM data downloaded."
else
  echo "⏭️ OSM data already exists. Skipping download."
fi

# Replace [Access_Token_for_Challenge2024] in router-config.template.json with the API key
if [ -f ./docker/otp/router-config.template.json ]; then
  echo "⏳ Embedding API key into router-config.json..."
  sed 's/\[Access_Token_for_ODPT\]/'"$ODPT_ACCESS_TOKEN"'/g' ./docker/otp/router-config.template.json | sed 's/\[Access_Token_for_Challenge2024\]/'"$ODPT_CHALLENGE_ACCESS_TOKEN"'/g' > ./docker/otp/router-config.json
  echo "✅ API key successfully embedded in router-config.json."
else
  echo "❌ Error: router-config.template.json not found. Exiting."
  exit 1
fi

echo "🎉 Initial setup completed successfully."
