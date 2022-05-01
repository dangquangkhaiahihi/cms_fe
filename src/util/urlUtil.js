export function getUrlFromQuery(query) {
    const keys = Object.keys(query).filter(key => {
        if (Array.isArray(query[key])) {
            return query[key].length > 0;
        } else {
            return query[key] || query[key] === 0;
        }
    });
    let url = '';
    keys.forEach((key, index) => {
        let value = query[key];
        if (Array.isArray(query[key])) {
            value = query[key].join(",");
        }
        if (index === 0) {
            url = url.concat(`?${key}=${value}`);
        } else {
            url = url.concat(`&${key}=${value}`);
        }
    });
    return url;
} 