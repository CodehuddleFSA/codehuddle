
export const parseToMarker = (rangeObj) => {
  return {
    startRow: rangeObj.start.row,
    startCol: rangeObj.start.column,
    endRow: rangeObj.end.row,
    endCol: rangeObj.end.column,
    className: 'error-marker',
    type: 'background',
    inFront: false
  }
}
