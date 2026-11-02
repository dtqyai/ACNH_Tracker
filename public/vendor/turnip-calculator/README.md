# Turnip-Calculator prediction engine

Source: https://github.com/elxris/Turnip-Calculator
Revision: bbed92b0d64d8d6925df34a72c45c819acb25f2e
License: MIT. Repository copyright (c) 2020 Christian Ceciliano; WebAssembly module copyright (c) 2018 Christian Ceciliano. Both upstream notices are preserved in LICENSE.

- `patterns_bg.wasm` is copied unchanged from `wasm/pkg/patterns_bg.wasm`.
- `patterns.js` adapts `wasm/pkg/patterns_bg.js` to explicitly initialize WebAssembly without a bundler.
- `../../turnip.js` adapts the scoring and pattern weights in `src/utils/patterns.js`, without d3, mock predictions, or quantile sampling.
- The UI labels the project's heuristic weights as reference probabilities. Nonzero matching scores are explicitly marked as approximate estimates.

The upstream Rust implementation credits Ninji's reverse engineering:
https://gist.github.com/Treeki/85be14d297c80c8b3c0a76375743325b
