fx_version "adamant"

game "gta5"

author "UX-Systems [Luki]"

description "Roulette-Script for FiveM"

version "1.0.0"

shared_script 'settings/config.lua'

client_scripts {
    "client/client.lua",
    "client/customnotifyevent.lua"
}

server_scripts {
    "server/server.lua",
}

ui_page "html/index.html"

files {
    "settings/config.json",
    "settings/language.json",
    "html/index.html",
    "html/index.css",
    "html/index.js",
    "html/notification.js",
    "html/images/*.ogg",
    "html/sounds/*.ogg",
    "html/images/*.png"
}

escrow_ignore {
    'settings/config.lua',
    'settings/language.json',
    'settings/config.json',
    "client/customnotifyevent.lua"
}

lua54 "yes"
