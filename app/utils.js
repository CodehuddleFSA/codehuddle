
export const parseToMarker = (rangeObj) => {
  return {
    startRow: rangeObj.start.row,
    startCol: rangeObj.start.column,
    endRow: rangeObj.end.row,
    endCol: rangeObj.end.column,
    className: 'editor-highlight',
    type: 'background',
    inFront: false
  }
}
