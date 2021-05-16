import React , { useState, useMemo, useCallback } from "react";
import ReactDOM from "react-dom";

const parseFormula = require('./parseformula.js');
const pt = require('./element_table');

const InputField = (props) => {
  return (
    <div>
      <form id="chemical-formula-form">
        <span id="form-title">化学式</span>
        <input type="text" id="form-input" value={ props.formula } onChange={ props.onFieldChange } />
        <button type="button" id="form-button" onClick={ props.onFieldSubmit }>計算</button>
        <span id="form-status-window">{ props.status }</span>
      </form>
    </div>
  );
}

const ShowUsage = (props) => {
  return (
    <details id="show-usage">
      <summary>使い方</summary>
      <ol>
        <li>化学式を入力して計算ボタンを押してください。</li>
        <li>元素記号、数字、&#40;&#41;&#91;&#93;&#123;&#125;、水和水の・（全角）が使用可能です。</li>
      </ol>
      <p><small>
        原子量のデータは<a href="https://www.ptable.com/" target="_blank">Dynamic Periodic Table</a>(Jun 16, 2017 updated)を使用しました。
      </small></p>
    </details>
  );
}

const FormulaWeight = (props) => {
  return (
    <p id="fw">
      式量 = <span id="fw-value">{ parseInt(props.fw * 1000 + .5) / 1000 }</span>
    </p>
  );
}

const ElementInfoTable = (props) => {
  let data = [];
  let keys = [];

  for(let symbol of props.atoms.keys()){
    keys.push(symbol);
  }

  for(let symbol of keys.sort(
    (a, b) => pt.periodicTable.symbolToNo(a) - pt.periodicTable.symbolToNo(b)
  )) {
    const at = props.ratio.get(symbol).at;
    const wt = props.ratio.get(symbol).wt;
    const z = pt.periodicTable.symbolToNo(symbol);
    data.push(
      <tr key={ z }>
        <td className="table-data data-label">{ z }</td>
        <td className="table-data data-label">{ symbol }</td>
        <td className="table-data data-label">{ props.atoms.get(symbol) }</td>
        <td className="table-data data-value">{ pt.periodicTable.getWeight(z) }</td>
        <td className="table-data data-value">{ (typeof at !== 'undefined') ? (parseInt(at * 10000 + .5) / 100) : '---' }</td>
        <td className="table-data data-value">{ (typeof wt !== 'undefined') ? (parseInt(wt * 10000 + .5) / 100) : '---' }</td>
      </tr>
    );
  }

  return (
    <table id="element-table">
      <caption id="caption-info">元素情報</caption>
      <thead>
        <tr>
          <th className="table-header">原子番号</th>
          <th className="table-header">元素記号</th>
          <th className="table-header">原子数</th>
          <th className="table-header">原子量</th>
          <th className="table-header">原子数比(%)</th>
          <th className="table-header">質量比(%)</th>
        </tr>
      </thead>
      <tbody>{ data }</tbody>
    </table>
  );
}

const CopyToClipboadButton = (props) => {
  return (
    <>
      <button type="button" id="button-copy" onClick={ copyResults(props.atoms, props.results) }>結果をクリップボードにコピー</button>
    </>
  );
}

const copyResults = (atoms, results) => {
  if(atoms == null){
    return;
  }

  let keys = [];
  let text = `式量\t${results.fw}\n`;
  text += `原子番号\t元素記号\t原子数\t原子量\t原子数比(%)\t質量比(%)\n`;

  for(let symbol of atoms.keys()){
    keys.push(symbol);
  }

  for(let symbol of keys.sort(
    (a, b) => pt.periodicTable.symbolToNo(a) - pt.periodicTable.symbolToNo(b)
  )) {
    const at = results.ratio.get(symbol).at;
    const wt = results.ratio.get(symbol).wt;
    const z = pt.periodicTable.symbolToNo(symbol);
    text += `${z}\t${symbol}\t${atoms.get(symbol)}\t${pt.periodicTable.getWeight(z)}\t`;
    text += `${(typeof at !== 'undefined') ? (parseInt(at * 10000 + .5) / 100) : '---'}\t`;
    text += `${(typeof wt !== 'undefined') ? (parseInt(wt * 10000 + .5) / 100) : '---'}\n`;
  }

  navigator.clipboard.writeText(text);
}

const updateResults = (atoms) => {
  const ratio = new Map();
  let fw = 0.0;
  let atomCount = 0;

  if(atoms == null) {
    return { ratio: ratio, fw: fw, status: '化学式が正しくありません' };
  }
  else if( atoms.size === 0){
    return { ratio: ratio, fw: fw, status: '' };
  }

  for(let symbol of atoms.keys()) {
    let z = pt.periodicTable.symbolToNo(symbol);
    let a = atoms.get(symbol);
    atomCount += a;
    fw += pt.periodicTable.getWeight(z) * a;
  }

  for(let symbol of atoms.keys()) {
    let z = pt.periodicTable.symbolToNo(symbol);
    let a = atoms.get(symbol);
    ratio.set(symbol, {
      at: parseFloat(a) / parseFloat(atomCount),
      wt: (pt.periodicTable.getWeight(z) * a) / parseFloat(fw)
    });
  }

  return { ratio: ratio, fw: fw, status: '' };
}

const Layout = () => {
  const [ formula, setFormula ] = useState('');
  const [ atoms, setAtoms ] = useState(new Map());
  let results = useMemo(() => updateResults(atoms), [atoms]);

  if(typeof results === 'undefined'){
    results = { ratio: new Map(), fw: 0.0, status: ''};
  }

  const onChange = useCallback((e) => {
    setFormula(e.target.value);
  }, []);

  const onSubmit = useCallback((e) => {
    setAtoms(parseFormula(formula));
    e.preventDefault();
  }, [formula]);

  return (
    <div>
      <h1>式量計算機</h1>
      <ShowUsage />
      <InputField onFieldChange={ onChange }
                  onFieldSubmit={ onSubmit }
                  formula={ formula }
                  status={ results.status }
      />
      <FormulaWeight fw={ results.fw } />
      <ElementInfoTable atoms={ atoms == null ? new Map() : atoms } ratio={ results.ratio } />
      <CopyToClipboadButton atoms={ atoms == null ? new Map() : atoms } results={ results } />
      <p>
        <small>&copy; 2021 Izadori. All rights reserved.</small>
      </p>
    </div>
  );
}

ReactDOM.render(
  <Layout />,
  document.getElementById('app')
);
