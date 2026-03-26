#!/usr/bin/env bash
set -euo pipefail

echo "== Local CI validation script =="

USE_DOCKER=0
SKIP_INSTALL=0
SKIP_BUILD=0

show_help(){
  cat <<EOF
Usage: $0 [--docker] [--skip-install] [--skip-build]

Options:
  --docker        Run 'docker compose build' after Node build
  --skip-install  Skip running 'npm ci'
  --skip-build    Skip running 'npm run build'
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --docker) USE_DOCKER=1; shift ;;
    --skip-install) SKIP_INSTALL=1; shift ;;
    --skip-build) SKIP_BUILD=1; shift ;;
    -h|--help) show_help; exit 0 ;;
    *) echo "Unknown arg: $1"; show_help; exit 2 ;;
  esac
done

echo "Node: $(node -v || echo 'node not found')"
echo "NPM: $(npm -v || echo 'npm not found')"

if [[ $SKIP_INSTALL -eq 0 ]]; then
  echo "Installing dependencies (npm ci)..."
  npm ci
else
  echo "Skipping install as requested"
fi

echo "Running linter..."
npm run lint

if [[ $SKIP_BUILD -eq 0 ]]; then
  if [[ -z "${DATABASE_URL:-}" ]]; then
    echo "ERROR: DATABASE_URL is not set. Set it in the environment before running this script or run with --skip-build to skip build step."
    exit 3
  fi
  echo "Running production build (NEXT with DATABASE_URL set)..."
  NODE_ENV=production npm run build
else
  echo "Skipping build as requested"
fi

if [[ $USE_DOCKER -eq 1 ]]; then
  if ! command -v docker >/dev/null 2>&1; then
    echo "Docker not found in PATH; cannot run docker build"
    exit 4
  fi
  echo "Running docker compose build..."
  docker compose -f docker-compose.yml build
fi

echo "All local CI checks passed."
