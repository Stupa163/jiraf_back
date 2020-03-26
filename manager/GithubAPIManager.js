exports.buildBodyRequest = (title, body, labels) => ({
    title,
    body,
    labels: labels.split(','),
});
