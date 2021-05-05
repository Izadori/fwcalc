// 元素データ
const table = [
  { z: 1, symbol: "H", weight: 1.008 },
  { z: 2, symbol: "He", weight: 4.0026 },
  { z: 3, symbol: "Li", weight: 6.94 },
  { z: 4, symbol: "Be", weight: 9.0122 },
  { z: 5, symbol: "B", weight: 10.81 },
  { z: 6, symbol: "C", weight: 12.011 },
  { z: 7, symbol: "N", weight: 14.007 },
  { z: 8, symbol: "O", weight: 15.999 },
  { z: 9, symbol: "F", weight: 18.998 },
  { z: 10, symbol: "Ne", weight: 20.18 },
  { z: 11, symbol: "Na", weight: 22.99 },
  { z: 12, symbol: "Mg", weight: 24.305 },
  { z: 13, symbol: "Al", weight: 26.982 },
  { z: 14, symbol: "Si", weight: 28.085 },
  { z: 15, symbol: "P", weight: 30.974 },
  { z: 16, symbol: "S", weight: 32.06 },
  { z: 17, symbol: "Cl", weight: 35.45 },
  { z: 18, symbol: "Ar", weight: 39.948 },
  { z: 19, symbol: "K", weight: 39.098 },
  { z: 20, symbol: "Ca", weight: 40.078 },
  { z: 21, symbol: "Sc", weight: 44.956 },
  { z: 22, symbol: "Ti", weight: 47.867 },
  { z: 23, symbol: "V", weight: 50.942 },
  { z: 24, symbol: "Cr", weight: 51.996 },
  { z: 25, symbol: "Mn", weight: 54.938 },
  { z: 26, symbol: "Fe", weight: 55.845 },
  { z: 27, symbol: "Co", weight: 58.933 },
  { z: 28, symbol: "Ni", weight: 58.693 },
  { z: 29, symbol: "Cu", weight: 63.546 },
  { z: 30, symbol: "Zn", weight: 65.38 },
  { z: 31, symbol: "Ga", weight: 69.723 },
  { z: 32, symbol: "Ge", weight: 72.63 },
  { z: 33, symbol: "As", weight: 74.922 },
  { z: 34, symbol: "Se", weight: 78.971 },
  { z: 35, symbol: "Br", weight: 79.904 },
  { z: 36, symbol: "Kr", weight: 83.798 },
  { z: 37, symbol: "Rb", weight: 85.468 },
  { z: 38, symbol: "Sr", weight: 87.62 },
  { z: 39, symbol: "Y", weight: 88.906 },
  { z: 40, symbol: "Zr", weight: 91.224 },
  { z: 41, symbol: "Nb", weight: 92.906 },
  { z: 42, symbol: "Mo", weight: 95.95 },
  { z: 43, symbol: "Tc", weight: 98 },
  { z: 44, symbol: "Ru", weight: 101.07 },
  { z: 45, symbol: "Rh", weight: 102.91 },
  { z: 46, symbol: "Pd", weight: 106.42 },
  { z: 47, symbol: "Ag", weight: 107.87 },
  { z: 48, symbol: "Cd", weight: 112.41 },
  { z: 49, symbol: "In", weight: 114.82 },
  { z: 50, symbol: "Sn", weight: 118.71 },
  { z: 51, symbol: "Sb", weight: 121.76 },
  { z: 52, symbol: "Te", weight: 127.6 },
  { z: 53, symbol: "I", weight: 126.9 },
  { z: 54, symbol: "Xe", weight: 131.29 },
  { z: 55, symbol: "Cs", weight: 132.91 },
  { z: 56, symbol: "Ba", weight: 137.33 },
  { z: 57, symbol: "La", weight: 138.91 },
  { z: 58, symbol: "Ce", weight: 140.12 },
  { z: 59, symbol: "Pr", weight: 140.91 },
  { z: 60, symbol: "Nd", weight: 144.24 },
  { z: 61, symbol: "Pm", weight: 145 },
  { z: 62, symbol: "Sm", weight: 150.46 },
  { z: 63, symbol: "Eu", weight: 151.96 },
  { z: 64, symbol: "Gd", weight: 157.25 },
  { z: 65, symbol: "Tb", weight: 158.93 },
  { z: 66, symbol: "Dy", weight: 162.5 },
  { z: 67, symbol: "Ho", weight: 164.93 },
  { z: 68, symbol: "Er", weight: 167.26 },
  { z: 69, symbol: "Tm", weight: 168.93 },
  { z: 70, symbol: "Yb", weight: 173.05 },
  { z: 71, symbol: "Lu", weight: 174.97 },
  { z: 72, symbol: "Hf", weight: 178.49 },
  { z: 73, symbol: "Ta", weight: 180.95 },
  { z: 74, symbol: "W", weight: 183.84 },
  { z: 75, symbol: "Re", weight: 186.21 },
  { z: 76, symbol: "Os", weight: 190.23 },
  { z: 77, symbol: "Ir", weight: 192.22 },
  { z: 78, symbol: "Pt", weight: 195.08 },
  { z: 79, symbol: "Au", weight: 196.97 },
  { z: 80, symbol: "Hg", weight: 200.59 },
  { z: 81, symbol: "Tl", weight: 204.38 },
  { z: 82, symbol: "Pb", weight: 207.2 },
  { z: 83, symbol: "Bi", weight: 208.98 },
  { z: 84, symbol: "Po", weight: 209 },
  { z: 85, symbol: "At", weight: 210 },
  { z: 86, symbol: "Rn", weight: 222 },
  { z: 87, symbol: "Fr", weight: 223 },
  { z: 88, symbol: "Ra", weight: 226 },
  { z: 89, symbol: "Ac", weight: 227 },
  { z: 90, symbol: "Th", weight: 230.04 },
  { z: 91, symbol: "Pa", weight: 231.04 },
  { z: 92, symbol: "U", weight: 238.03 },
  { z: 93, symbol: "Np", weight: 237 },
  { z: 94, symbol: "Pu", weight: 244 },
  { z: 95, symbol: "Am", weight: 243 },
  { z: 96, symbol: "Cm", weight: 247 },
  { z: 97, symbol: "Bk", weight: 247 },
  { z: 98, symbol: "Cf", weight: 251 },
  { z: 99, symbol: "Es", weight: 252 },
  { z: 100, symbol: "Fm", weight: 257 },
  { z: 101, symbol: "Md", weight: 258 },
  { z: 102, symbol: "No", weight: 259 },
  { z: 103, symbol: "Lr", weight: 266 },
  { z: 104, symbol: "Rf", weight: 267 },
  { z: 105, symbol: "Db", weight: 268 },
  { z: 106, symbol: "Sg", weight: 269 },
  { z: 107, symbol: "Bh", weight: 270 },
  { z: 108, symbol: "Hs", weight: 277 },
  { z: 109, symbol: "Mt", weight: 278 },
  { z: 110, symbol: "Ds", weight: 281 },
  { z: 111, symbol: "Rg", weight: 282 },
  { z: 112, symbol: "Cn", weight: 285 },
  { z: 113, symbol: "Nh", weight: 286 },
  { z: 114, symbol: "Fl", weight: 289 },
  { z: 115, symbol: "Mc", weight: 290 },
  { z: 116, symbol: "Lv", weight: 293 },
  { z: 117, symbol: "Ts", weight: 294 },
  { z: 118, symbol: "Og", weight: 294 },
];

// 周期表クラス
class PeriodicTable {
  constructor() {
    this.symbolToNo = this.symbolToNo.bind(this);
    this.getElementData = this.getElementData.bind(this);
    this.getSymbol = this.getSymbol.bind(this);
    this.getWeight = this.getWeight.bind(this);
    this.table = table;
  }

  symbolToNo(symbol) {
    for(let i = 0; i < this.table.length; i++){
      if(this.table[i].symbol === symbol){
        return i + 1;
      }
    }
    return -1;
  }

  getElementData(atomNo) {
    if(atomNo >= this.table.length){
      return { z: -1, symbol: undefined, weight: -1 };
    }
    else{
      return this.table[atomNo - 1];
    }
  }

  getSymbol(atomNo) {
    const tmp = this.getElementData(atomNo);
    return tmp.symbol;
  }

  getWeight(atomNo) {
    const tmp = this.getElementData(atomNo);
    return tmp.weight;
  }
}

module.exports.periodicTable = new PeriodicTable(table);
