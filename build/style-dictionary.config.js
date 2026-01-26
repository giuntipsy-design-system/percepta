const StyleDictionary = require('style-dictionary').default;

StyleDictionary.registerFormat({
  name: 'scss/typography-mixins',
  format: function ({ dictionary }) {
    const typographyTokens = dictionary.allTokens.filter(
      token => token.path[0] === 'typography'
    );

    return typographyTokens
      .map(token => {
        const [, category, name] = token.path;
        const styles = token.value;

        return `
@mixin typography-${category}-${name} {
  font-family: ${styles.fontFamily};
  font-size: ${styles.fontSize};
  font-weight: ${styles.fontWeight};
  line-height: ${styles.lineHeight};
}
`;
      })
      .join('\n');
  }
});

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/sass/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true
          },
          filter: token => token.path[0] !== 'typography'
        },
        {
          destination: '_typography.mixins.scss',
          format: 'scss/typography-mixins',
          filter: token => token.path[0] === 'typography'
        }
      ]
    }
  }
};