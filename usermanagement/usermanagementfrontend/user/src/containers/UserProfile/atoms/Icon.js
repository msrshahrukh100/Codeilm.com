import React from 'react';
import clsx from 'clsx';
import MuiIcon from '@material-ui/core/Icon';
import { ICON } from '../core';

const Icon = ({
  className,
  left,
  right,
  front,
  frontFlipped,
  caret,
  link,
  linkInverted,
  contained,
  white,
  purple,
  ...props
}) => (
  <MuiIcon
    className={clsx(
      ICON.root,
      className,
      left && ICON.left,
      right && ICON.right,
      front && ICON.front,
      link && ICON.link,
      frontFlipped && ICON.frontFlipped,
      linkInverted && ICON.linkInverted,
      caret && ICON.caret,
      contained && ICON.contained,
      white && ICON.white,
      purple && ICON.purple,
    )}
    {...props}
  />
);

export default Icon;
