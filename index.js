import './style.css';
import { data } from './data.js';

const container = document.getElementById('table');
// declare handontable
const hot = new Handsontable(container, {
  data: data,
  width: '99%',
  height: 'auto',
  rowHeights: 40,
  stretchH: 'all',
  rowHeaders: false,
  colHeaders: true,
  colHeaders: ['Name', 'T2', 'T3', 'T4', 'T5'],
  columns: [
    {
      data: 0,
      type: 'text',
      readOnly: true,
      className: 'htMiddle staffName hoverHightlight',
    },
    {
      type: 'dropdown',
      source: ['OFF', 'C1', 'C2', 'C3'],
      className: 'htCenter htMiddle  hoverHightlight',
    },
    {
      type: 'dropdown',
      source: ['OFF', 'C1', 'C2', 'C3'],
      className: 'htCenter htMiddle  hoverHightlight',
    },
    {
      type: 'dropdown',
      source: ['OFF', 'C1', 'C2', 'C3'],
      className: 'htCenter htMiddle  hoverHightlight',
    },
    {
      type: 'dropdown',
      source: ['OFF', 'C1', 'C2', 'C3'],
      className: 'htCenter htMiddle  hoverHightlight',
    },
  ],
  outsideClickDeselects: false,
  filters: true,
  dropdownMenu: true,
  multiColumnSorting: true,
  ontextMenu: true,
  selectionMode: 'multiple',
  autoColumnSize: true,
  licenseKey: 'non-commercial-and-evaluation', // for non-commercial use only
});

// handle change shift
const changeShift = document.querySelector('#changeShift');
changeShift.addEventListener('change', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const selected = hot.getSelected() || [];
  const target = event.target.id;

  hot.suspendRender();

  for (let index = 0; index < selected.length; index += 1) {
    const [row1, column1, row2, column2] = selected[index];
    const startRow = Math.max(Math.min(row1, row2), 0);
    const endRow = Math.max(row1, row2);
    const startCol = Math.max(Math.min(column1, column2), 0);
    const endCol = Math.max(column1, column2);

    for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
      for (
        let columnIndex = startCol;
        columnIndex <= endCol;
        columnIndex += 1
      ) {
        hot.setDataAtCell(rowIndex, columnIndex, e.currentTarget.value);
        hot.setCellMeta(
          rowIndex,
          columnIndex,
          'className',
          'shift-changed htCenter htMiddle hoverHightlight'
        );
      }
    }
  }
  changeShift.value = 'Select shift';
  hot.render();
  hot.resumeRender();
});
