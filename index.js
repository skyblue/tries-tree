/**
 * Created by lanhao on 17/4/11.
 */

'use strict';

const fs = require('fs');
const node = require('./libs/node');

class TriesTree {

  constructor(config) {
    this.config = config;
    this.check();

    this.tree = new node('ROOT');
  };

  check() {
    if (this.config.runtimePath) {
      try {
        fs.accessSync(this.config.runtimePath, fs.constants.R_OK | fs.constants.W_OK)
      } catch (e) {
        throw e;
      }
    }
  };

  build(words) {
    if(Array.isArray(words) && words.length){
      for(let k in words){
        let chs = Array.from(words[k]);
        let ch = null;
        let _node = this.tree.children;

        while(ch = chs.shift()){

          if(ch === ' '){
            _node = this.tree.children;
            continue;
          }
          if(_node[ch]){
            _node[ch].count ++;
            _node = _node[ch].children;
          }else {
            _node[ch] = new node(ch);
            _node = _node[ch].children;
          }
        }
      }
    }
  };

  add(word) {
    let chs = Array.from(word);
    let ch = null;
    let _node = this.tree.children;

    while(ch = chs.shift()){

      if(ch === ' '){
        _node = this.tree.children;
        continue;
      }
      if(_node[ch]){
        _node[ch].count ++;
        _node = _node[ch].children;
      }else {
        _node[ch] = new node(ch);
        _node = _node[ch].children;
      }
    }
  };

  dump(identity) {
    if (this.config.runtimePath) {
      fs.writeFileSync(this.config.runtimePath+'/'+identity+'.json',this.tree.toString());
    }
  }

  load(identify) {
    if (this.config.runtimePath) {
      let data = require(this.config.runtimePath+'/'+identify+'.json');
      node.wakeUP(data);
      this.tree = data;
    }
  }
}


module.exports = TriesTree;