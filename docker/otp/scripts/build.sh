#!/bin/sh

GRAPH_FILE="/var/opentripplanner/graph.obj"

if [ -f "$GRAPH_FILE" ]; then
  echo "⏭️ Graph.obj already exists. Skipping build."
else
  echo "⏳ Graph.obj not found. Building graph..."
  otp --build --save
fi
