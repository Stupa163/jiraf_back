class InvalidGithubRepoLinkFormatError extends Error {
    constructor() {
        super(
            'The link you provided for the repository is not valid. Please ensure it is formated as following : '
            + 'https://github.com/[USER_NAME]/[REPO_NAME]',
        );
    }
}

module.exports = InvalidGithubRepoLinkFormatError;
