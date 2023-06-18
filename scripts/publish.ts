import * as ghpages from 'gh-pages'

ghpages.publish('prod', {
  branch: 'main',
  repo: 'git@github.com-baekwon10000:baekwon10000/baekwon10000.github.io.git',
  dotfiles: true,
}, ()=>{});
