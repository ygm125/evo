import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default {
    input: 'src/evo.js',
    output: {
        file: process.env.NODE_ENV === 'production' ? 'dist/evo.min.js' : 'dist/evo.js',
        format: 'iife',
        name:'Evo'
    },
    plugins: [
        resolve(),
        commonjs(),
        (process.env.NODE_ENV === 'production' && uglify())
    ],
    //external: ['vue']
}  