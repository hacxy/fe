import { useStdout } from 'ink';
import { useCallback, useEffect, useState } from 'react';

function useScreenSize() {
  const { stdout } = useStdout();
  const getSize = useCallback(
    () => ({
      height: stdout.rows,
      width: stdout.columns,
    }),
    [stdout],
  );
  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const onResize = () => setSize(getSize());
    process.stdout.on('resize', onResize);
    return () => {
      stdout.off('resize', onResize);
    };
  }, [stdout, getSize]);

  return size;
}

export default useScreenSize;
