exports.buildBodyRequest = (title, body, labels) => {
    return {
        "title": title,
        "body": body,
        "labels": labels.split(',')
    };
};
