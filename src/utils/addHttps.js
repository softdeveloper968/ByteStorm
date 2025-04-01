export default function addHttps(url) {
    if (!/^http:\/\//i.test(url) && !/^https:\/\//i.test(url)) {
        return `https://${url}`;
    }

    return url;
}