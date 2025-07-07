# Digistore

A modern digital product showcase built with **PERN stack** (PostgreSQL, Express, React, Node.js) + **TailwindCSS** & **Daisy UI**. View, add, update, and delete digital products including images, names, and prices.

## Features

- **Tech Stack**: PERN (PostgreSQL, Express, React, Node) + TailwindCSS + Daisy UI  
- Display digital products with **image, name, and price**
- **Create**, **update**, and **delete** products
- User-friendly interface styled with **TailwindCSS** and **Daisy UI**
- API protection with **Arcjet** (bot protection & rate limiting)
- Centralized state management via **Zustand**
- Robust server and client-side error handling
- Deployed on render

## Quick Start

### 1. Clone the repository
```
git clone https://github.com/annie-olivia/Digistore.git
cd digistore
```
### 2. Setup .env file in the root directory
```
PORT=3000

PGUSER=your_pg_user
PGPASSWORD=your_pg_password
PGHOST=your_pg_host
PGDATABASE=your_pg_database

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

NODE_ENV=
```
### 3. Install backend dependencies and run API
```
npm install
npm run dev
```
### 4. Install frontend dependencies and run frontend
```
cd frontend
npm install
npm run dev
```
