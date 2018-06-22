

/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path ./ --build "platform=fb-instant-games;debug=true"

cp ./build/fb-instant-games/instant-games-example.zip ./"archive-$(date +"%Y-%m-%d-%H-%M-%S").zip"