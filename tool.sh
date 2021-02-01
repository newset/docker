

download() {
    wget -P ./nginx/sites/$SITE -mpck --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36" -e robots=off --wait 1 -E $SITE_URL
}


SITE=$1
SITE_URL=$2
echo downloading $SITE from $SITE_URL
download $SITE $SITE_URL 