import type { PropsWithChildren } from 'react';
import { Box, useApp, useInput, useStdout } from 'ink';
import React, { useEffect, useMemo } from 'react';

import useScreenSize from './useScreen.js';

const Screen: React.FC<PropsWithChildren> = ({ children }) => {
  const { height, width } = useScreenSize();
  const { stdout } = useStdout();
  const { exit } = useApp();
  useMemo(() => stdout.write('\x1B[?1049h'), [stdout]);

  useEffect(() => {
    return () => {
      stdout.write('\x1B[?1049l');
    };
  }, [stdout]);

  useInput((_, key) => {
    if (key.escape) {
      exit();
    }
  });

  return (
    <Box height={height} width={width}>
      {children}
    </Box>
  );
};

export default Screen;
