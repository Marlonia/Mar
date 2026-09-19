#!/usr/bin/env bash
# Convierte una Raspberry Pi con pantalla (táctil o no) en el "monitor de pared" del homelab:
# arranca directamente con el panel NETOPS a pantalla completa, como en el video.
# Ejecutar como el usuario del escritorio (NO con sudo):   ./scripts/kiosk-pi.sh http://192.168.1.10:3000
set -euo pipefail
URL="${1:?URL del panel, ej: http://192.168.1.10:3000 o https://panel.agencia.com}"

sudo apt-get update -y
sudo apt-get install -y chromium-browser unclutter 2>/dev/null || sudo apt-get install -y chromium unclutter
BIN=$(command -v chromium-browser || command -v chromium)
CMD="$BIN --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble --incognito --check-for-update-interval=31536000 $URL"

# Raspberry Pi OS Bookworm+ usa Wayland (labwc; wayfire en versiones anteriores)
mkdir -p ~/.config/labwc ~/.config/autostart
grep -qF -- "$CMD" ~/.config/labwc/autostart 2>/dev/null || echo "$CMD &" >> ~/.config/labwc/autostart
if [[ -f ~/.config/wayfire.ini ]] && ! grep -q '^kiosk' ~/.config/wayfire.ini; then
  printf '\n[autostart]\nkiosk = %s\n' "$CMD" >> ~/.config/wayfire.ini
fi
# Escritorios X11 (Pi OS "Legacy")
cat > ~/.config/autostart/kiosk.desktop <<DESK
[Desktop Entry]
Type=Application
Name=Kiosk NETOPS
Exec=sh -c "$CMD"
DESK
# Que la pantalla no se apague sola
sudo raspi-config nonint do_blanking 1 2>/dev/null || true
echo "✅ Reinicia la Pi: arrancará mostrando $URL a pantalla completa."
