for directory in *; do
  pushd "$directory"
  for filename in *; do
    extension="${filename##*.}"
    if [ "$filename" != "$extension" ]; then
      extension=".$extension"
    else
      # i.e. there is no dot in the file name
      extension=""
    fi
    target_filename="${directory%.*}${extension}"
    if [ "$extension" = ".jpg" ]; then
        # echo "${target_filename// /-}"
        mv "$filename" "${target_filename}"
        cp "$filename" "../../img/fish"
    fi
  done
  popd
done