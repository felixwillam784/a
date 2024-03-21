export const tableRowClassName = ({
  rowIndex,
}: {
  rowIndex: number
}) => {
  if (rowIndex % 2 === 1) {
    return 'warning-row'
  } else {
    return 'success-row'
  }
}