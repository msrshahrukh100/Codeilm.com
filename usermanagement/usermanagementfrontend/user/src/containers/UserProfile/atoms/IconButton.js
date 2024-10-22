import React from 'react';
import clsx from 'clsx';
import MuiIconButton from '@material-ui/core/IconButton';
import { ICON_BUTTON } from '../core';

const IconButton = ({ className, shaded, noPad, narrowPad, separated, linkInverted, ...props }) => (
  <MuiIconButton
    className={clsx(
      ICON_BUTTON.root,
      className,
      shaded && ICON_BUTTON.shaded,
      noPad && ICON_BUTTON.noPad,
      narrowPad && ICON_BUTTON.narrowPad,
      separated && ICON_BUTTON.separated,
      linkInverted && ICON_BUTTON.linkInverted,
    )}
    {...props}
  />
);

export default IconButton;
