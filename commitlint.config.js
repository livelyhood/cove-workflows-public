const COMMIT_REGEX = /^(\w*)(?: ((CAN|REQ)-\d*))?: (.*)$/;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['type', 'scope', '_', 'subject'],
      headerPattern: COMMIT_REGEX,
    },
  },
  plugins: [
    {
      rules: {
        'cove-convention': (parsed) => {
          const { subject, type } = parsed;
          if (type === null || subject === null) {
            return [
              false,
              'Please use conventional commits: https://github.com/livelyhood/engineering-documentation/blob/main/docs/adr/0002-git-workflow.md#conventional-branch-names-and-commit-messages',
            ];
          }

          return [true];
        },
        'cove-convention/jira': (parsed, _when = 'never') => {
          const { scope } = parsed;
          const isScopeEmpty = scope === null;

          if (isScopeEmpty) {
            return [
              false,
              'Please attach a JIRA ticket to your commit message if possible',
            ];
          }

          return [true];
        },
      },
    },
  ],
  rules: {
    'body-empty': [2, 'always'],
    'cove-convention': [2, 'always'],
    'cove-convention/jira': [1, 'never'],
    'type-enum': [2, 'always', ['chore', 'docs', 'feature', 'fix', 'test']],
  },
};
