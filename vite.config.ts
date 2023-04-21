import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
   root: 'src',
   resolve: {
      alias: {
         '~/': `${resolve(__dirname, 'src')}/`,
      },
   },
})
