import { useMemo, useState } from 'react';
import { spreadGlyphsToKeys, validateInput } from '../utils/helpers';

export const useGlyphInput = () => {
  const [rawVal, setRawVal] = useState('');

  const parsed = useMemo(() => validateInput(rawVal), [rawVal]);

  const keys = useMemo(() => {
    if (!parsed.value) {
      return [];
    }
    return spreadGlyphsToKeys(parsed.value);
  }, [parsed.value]);

  const canRender = Boolean(parsed.value) && keys.length > 0;

  return {
    rawVal,
    setRawVal,
    parsed,
    keys,
    canRender,
  };
};
