#!/bin/sh

echo "Generating env-config.js from runtime environment..."

cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  APP_SERVER_URL: "${APP_SERVER_URL}"
};
EOF

exec "$@"
