import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { STYLING_DEFAULTS, getHeadStyle } from './styling-utils';
import { headHandleKeyPress } from './cells/handle-key-press';
import { handleHeadCellFocus } from './cells/handle-cell-focus';

const useStyles = makeStyles({
  head: {
    color: ({ color }) => color,
    fontSize: ({ fontSize }) => fontSize,
    padding: ({ padding }) => padding,
    height: STYLING_DEFAULTS.HEIGHT,
    lineHeight: STYLING_DEFAULTS.HEAD_LINE_HEIGHT,
    '&&:focus': {
      boxShadow: STYLING_DEFAULTS.FOCUS_OUTLINE,
    },
  },
});

export default function TableHeadWrapper({
  rootElement,
  tableData,
  theme,
  layout,
  changeSortOrder,
  constraints,
  selectionsAPI,
  focusedCellCoord,
}) {
  const classes = useStyles(getHeadStyle(layout, theme));

  return (
    <TableHead>
      <TableRow className="sn-table-row">
        {tableData.columns.map((column, columnIndex) => {
          const tabIndex = columnIndex === 0 ? '0' : '-1';
          return (
            <TableCell
              key={column.id}
              align={column.align}
              className={`${classes.head} sn-table-head-cell sn-table-cell`}
              tabIndex={tabIndex}
              onKeyDown={(e) =>
                headHandleKeyPress(
                  e,
                  rootElement,
                  [0, columnIndex],
                  focusedCellCoord,
                  changeSortOrder,
                  layout,
                  column.isDim,
                  !constraints.active
                )
              }
              onMouseDown={() => handleHeadCellFocus(columnIndex, focusedCellCoord, rootElement)}
            >
              <TableSortLabel
                active={layout.qHyperCube.qEffectiveInterColumnSortOrder[0] === columnIndex}
                direction={column.sortDirection}
                onClick={() =>
                  // when cells are selected or in edit mode, it should not be able to do the sorting
                  !selectionsAPI.isModal() && !constraints.active && changeSortOrder(layout, column.isDim, columnIndex)
                }
                tabIndex={-1}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

TableHeadWrapper.propTypes = {
  rootElement: PropTypes.object.isRequired,
  tableData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  changeSortOrder: PropTypes.func.isRequired,
  constraints: PropTypes.object.isRequired,
  focusedCellCoord: PropTypes.object.isRequired,
  selectionsAPI: PropTypes.object.isRequired,
};
