#!/bin/bash

# Custom install with legacy-peer-deps to avoid TypeScript conflict
npm install --legacy-peer-deps

# Then run the regular React build
npm run build



