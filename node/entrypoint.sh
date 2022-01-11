#!/bin/bash

### BACK-END
if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm ci 
npm run build 

node dist/main.js
