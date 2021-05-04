const pt = require('./element_table.js');

// カッコのない化学式のチェック用
const reFormulaChecker = /^(?:[A-Z][a-z]?[0-9]*)+$/;
// カッコのない化学式のパース用
const reFormula = /([A-Z][a-z]?)([0-9]*)/g;
// 丸括弧を含む化学式のチェック・分割用
const reRBracketSplitter = /(\((?:[A-Z][a-z]?[0-9]*)+\)[0-9]*)/;
// 丸括弧を含む化学式のパース用
const reRBracket = /\(((?:[A-Z][a-z]?[0-9]*)+)\)([0-9]*)/;
// 角括弧を含む化学式のチェック・分割用
const reRectBracketSplitter = /(\[[A-Za-z0-9\(\)]+\][0-9]*)/;
// 角括弧を含む化学式のパース用
const reRectBracket = /\[([A-Za-z0-9\(\)]+)\]([0-9]*)/;

// 化学式を解析する
// 戻り値はMap
function parseFormula(formula) {
  let ret = new Map();
  let tmpRet = new Map();

  if(formula === "" || formula === null || typeof formula === 'undefined') {
    return null;
  }

  // 示性式対応のため'-''='を消去する（三重結合には対応しない）
  for(let x of formula.replace(/\-|\=/g, '').split(reRectBracketSplitter)) {
    let n = 1;

    if(x.length === 0) {
      continue;
    }
    else if(x[0] === '[') {
      const tmp = x.match(reRectBracket);
      tmpRet = parseFormulaBracket(tmp[1]);
      n = (tmp[2] === "") ? 1 : Number(tmp[2]);
    }
    else{
      tmpRet = parseFormulaBracket(x);
    }

    if(tmpRet === null) {
      console.log('error: illegal formula.')
      return null;
    }

    for(let [k, v] of tmpRet) {
      if(ret.has(k)) {
        ret.set(k, ret.get(k) + v * n);
      }
      else {
        ret.set(k, v * n);
      }
    }
    tmpRet.clear();
  }

  return ret;
}

// 角かっこのない化学式のパース
function parseFormulaBracket(formula) {
  let ret = new Map();
  let tmpRet = new Map();

  if(formula === "" || formula === null || typeof formula === 'undefined') {
    return null;
  }

  for(let x of formula.split(reRBracketSplitter)) {
    let n = 1;

    if(x.length === 0) {
      continue;
    }
    else if(x[0] === '(') {
      const tmp = x.match(reRBracket);
      tmpRet = parseFormulaCore(tmp[1]);
      n = (tmp[2] === "") ? 1 : Number(tmp[2]);
    }
    else{
      tmpRet = parseFormulaCore(x);
    }

    if(tmpRet === null) {
      console.log('error: illegal formula.')
      return null;
    }

    for(let [k, v] of tmpRet) {
      if(ret.has(k)) {
        ret.set(k, ret.get(k) + v * n);
      }
      else {
        ret.set(k, v * n);
      }
    }
    tmpRet.clear();
  }

  return ret;
}

// かっこの無い化学式のパース
function parseFormulaCore(formula) {
  let ret = new Map();
  let n = 1;

  if(formula === "" || formula === null || typeof formula === 'undefined') {
    return null;
  }

  // 書式を満たしているかチェック
  if(!reFormulaChecker.test(formula)){
    return null;
  }

  // ([A-Z][a-z]?[0-9]*)
  for(let x of formula.matchAll(reFormula)) {
    const z = pt.periodicTable.symbolToNo(x[1]);
    if(z === -1) {
      console.log('error: illegal Symbol');
      return null;
    }

    n = ((x[2].length === 0) ? 1 : Number(x[2]));

    if(ret.has(x[1])) {
      ret.set(x[1], ret.get(x[1]) + n);
    }
    else {
      ret.set(x[1], n);
    }
  }

  return ret;
}

module.exports = parseFormula;
