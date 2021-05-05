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

function FormulaWeight(props) {
  return (
    <p id="fw">式量 = <span id="fw-value">{parseInt(props.fw * 1000 + .5) / 1000}</span></p>
  );
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
    this.renderTableData = this.renderTableData.bind(this);
    this.renderAllTableData = this.renderAllTableData.bind(this);
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

  renderTableData(symbol) {
    const at = this.state.ratio.get(symbol).at;
    const wt = this.state.ratio.get(symbol).wt;
    const z = pt.periodicTable.symbolToNo(symbol);
    return (
      <tr key={z}>
        <td className="table-data data-label">{z}</td>
        <td className="table-data data-label">{symbol}</td>
        <td className="table-data data-label">{this.state.atoms.get(symbol)}</td>
        <td className="table-data data-value">{pt.periodicTable.getWeight(z)}</td>
        <td className="table-data data-value">{(typeof at !== 'undefined') ? (parseInt(at * 10000 + .5) / 100) : '---'}</td>
        <td className="table-data data-value">{(typeof wt !== 'undefined') ? (parseInt(wt * 10000 + .5) / 100) : '---'}</td>
      </tr>
    )
  }

  renderAllTableData() {
    let data = [];
    let keys = [];
    for(let symbol of this.state.atoms.keys()){
      keys.push(symbol);
    }
    for(let symbol of keys.sort(
      (a, b) => pt.periodicTable.symbolToNo(a) - pt.periodicTable.symbolToNo(b)
    )) {
      data.push(this.renderTableData(symbol));
    }
    return(<>{data}</>);
  }

  render() {
    console.log(this.state);
    return (
    <div>
      <h1>式量計算機</h1>
      <InputField onFieldChange={this.handleFieldChange}
                  onFieldSubmit={this.handleSubmit}
                  formula={this.state.formula}
                  status={this.state.status}
      />
      <FormulaWeight fw={this.state.fw}/>
      <table id="element-table">
          <caption>元素情報</caption>
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
          <tbody>
            {this.renderAllTableData()}
          </tbody>
        </table>
    </div>
    );
  }
}

ReactDOM.render(
  <Layout />,
  document.getElementById('app')
);
