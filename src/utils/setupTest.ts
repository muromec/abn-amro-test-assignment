import { createGettext } from 'vue3-gettext'
const { config } = require('@vue/test-utils')
config.global.plugins = [createGettext({ silent: true })]
