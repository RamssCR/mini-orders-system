export default {
  /**
   * Set of instructions to run during pre-commit.
   * @param {string[]} filenames - The workspace filenames.
   * @returns {string[]} The instructions set.
   */
  '**/*.{ts,js}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `eslint --fix ${filenames.join(' ')}`,
    `jest --bail --findRelatedTests --passWithNoTests ${filenames.join(' ')}`,
  ],
};
