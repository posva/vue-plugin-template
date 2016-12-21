let gitConfig
try {
  gitConfig = require('git-config').sync()
} catch (e) {
  gitConfig = {}
}

function kebabToCamel (name) {
  name = name.replace(/\-(\w)/g, (match, p1) => p1.toUpperCase())
  name = name.replace(/^\w/, (match) => match.toUpperCase())
  return name
}

/*
 * TODO
 * tests?
 * visual tests?
 * github contrib
 * license
 * eslint
 * coding style
 */

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Plugin name'
    },
    library: {
      type: 'string',
      required: true,
      message: 'Library name',
      default (answers) {
        return answers.name ? kebabToCamel(answers.name) : null
      }
    },
    description: {
      type: 'string',
      required: false,
      message: 'Plugin description',
      default: 'A Vue.js Plugin'
    },
    version: {
      type: 'string',
      required: false,
      message: 'Current version',
      default: '0.0.0'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    githubAccount: {
      type: 'string',
      required: false,
      message: 'GitHub Account',
      default: gitConfig.github && gitConfig.github.user
    }
  },
  helpers: {
    nowYear () {
      return new Date().getFullYear()
    },
    authorFullNameFrom (author) {
      const startPosition = author.indexOf('<')
      return author.slice(0, startPosition - 1)
    },
    authorEmailFrom (author) {
      const startPosition = author.indexOf('<')
      const endPosition = author.indexOf('>')
      return author.slice(startPosition + 1, endPosition)
    }
  },
  skipInterpolation: 'src/**/*.vue'
}
