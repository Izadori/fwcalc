import React from "react";
import ReactDOM from "react-dom";

const parseFormula = require('./parseformula.js');
const pt = require('./element_table');

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onFieldChange(e.target.value);
  }

  handleSubmit(e) {
    this.props.onFieldSubmit(this.props.formula);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form id="chemical-formula-form">
          <span id="form-title">化学式</span>
          <input type="text" id="form-input" value={this.props.formula} onChange={this.handleChange}/>
          <button type="button" id="form-button" onClick={this.handleSubmit}>計算</button>
          <span id="form-status-window">{this.props.status}</span>
        </form>
      </div>
    );
  }
}

function ShowUsage(props) {
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

function FormulaWeight(props) {
  return (
    <p id="fw">式量 = <span id="fw-value">{parseInt(props.fw * 1000 + .5) / 1000}</span></p>
  );
}

function ElementInfoTable(props) {
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
      <tr key={z}>
        <td className="table-data data-label">{z}</td>
        <td className="table-data data-label">{symbol}</td>
        <td className="table-data data-label">{props.atoms.get(symbol)}</td>
        <td className="table-data data-value">{pt.periodicTable.getWeight(z)}</td>
        <td className="table-data data-value">{(typeof at !== 'undefined') ? (parseInt(at * 10000 + .5) / 100) : '---'}</td>
        <td className="table-data data-value">{(typeof wt !== 'undefined') ? (parseInt(wt * 10000 + .5) / 100) : '---'}</td>
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
      <tbody>{data}</tbody>
    </table>
  );
}

class CopyToClipboadButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClickCopy();
  }

  render() {
    return (
      <>
        <button type="button" id="button-copy" onClick={this.handleClick}>結果をクリップボードにコピー</button>
      </>
    );
  }
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      atoms: new Map(),
      ratio: new Map(),
      fw: 0.0,
      status: '',
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickToCopy = this.handleClickToCopy.bind(this);
  }

  handleFieldChange(formula) {
    this.setState({ formula: formula });
  }

  handleSubmit() {
    const atoms = parseFormula(this.state.formula);
    const ratio = new Map();
    let fw = 0.0;
    let atomCount = 0;

    if(atoms == null) {
      this.setState({
        atoms: new Map(),
        ratio: new Map(),
        fw: 0.0,
        status: '化学式が正しくありません'
      });
      return;
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

    this.setState({
      atoms: atoms,
      ratio: ratio,
      fw: fw,
      status: ''
    });
  }

  handleClickToCopy() {
    if(this.state.atoms == null){
      return;
    }

    let keys = [];
    let text = `式量\t${this.state.fw}\n`;
    text += `原子番号\t元素記号\t原子数\t原子量\t原子数比(%)\t質量比(%)\n`;

    for(let symbol of this.state.atoms.keys()){
      keys.push(symbol);
    }

    for(let symbol of keys.sort(
      (a, b) => pt.periodicTable.symbolToNo(a) - pt.periodicTable.symbolToNo(b)
    )) {
      const at = this.state.ratio.get(symbol).at;
      const wt = this.state.ratio.get(symbol).wt;
      const z = pt.periodicTable.symbolToNo(symbol);
      text += `${z}\t${symbol}\t${this.state.atoms.get(symbol)}\t${pt.periodicTable.getWeight(z)}\t`;
      text += `${(typeof at !== 'undefined') ? (parseInt(at * 10000 + .5) / 100) : '---'}\t`;
      text += `${(typeof wt !== 'undefined') ? (parseInt(wt * 10000 + .5) / 100) : '---'}\n`;
    }

    navigator.clipboard.writeText(text);
  }

  render() {
    console.log(this.state);
    return (
    <div>
      <h1>式量計算機</h1>
      <ShowUsage />
      <InputField onFieldChange={this.handleFieldChange}
                  onFieldSubmit={this.handleSubmit}
                  formula={this.state.formula}
                  status={this.state.status}
      />
      <FormulaWeight fw={this.state.fw} />
      <ElementInfoTable atoms={this.state.atoms} ratio={this.state.ratio} />
      <CopyToClipboadButton onClickCopy={this.handleClickToCopy} />
      <p>
        <small>&copy; 2021 Izadori. All rights reserved.</small>
      </p>
    </div>
    );
  }
}

ReactDOM.render(
  <Layout />,
  document.getElementById('app')
);
