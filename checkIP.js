name: Check IP Status

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  check-ip-status:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run IP status check script
        run: node checkIP.js

    
