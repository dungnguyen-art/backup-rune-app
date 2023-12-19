import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';
import toast from 'react-hot-toast';
import i18n from '@app/i18n'
import {
  clearBrowserStorageLogs,
  copyLogsToClipboard,
  getLogSizeInBytes,
} from '@shared/logger-storage';
import { isNumber } from '@shared/utils';

import { Divider } from '@app/components/layout/divider';
import { Caption } from '@app/ui/components/typography/caption';

import { SettingsMenuItem as MenuItem } from './settings-menu-item';

const isAnEmptyLogsArrayByteThreshold = 7;

function isSmallEnoughToBeConsiderdEmptyCache(logSizeInBytes?: number) {
  if (!isNumber(logSizeInBytes)) return true;
  return logSizeInBytes < isAnEmptyLogsArrayByteThreshold;
}

interface AdvancedMenuItemsProps {
  closeHandler(fn: () => void): () => void;
  settingsShown: boolean;
}
export function AdvancedMenuItems({ closeHandler, settingsShown }: AdvancedMenuItemsProps) {
  const { result: logSizeInBytes } = useAsync(async () => getLogSizeInBytes(), [settingsShown]);

  const diagnosticLogText = useMemo(() => {
    const noLogInfoMsg = `There are no logs cached`;
    if (!isNumber(logSizeInBytes)) return noLogInfoMsg;
    const logSizeInKiloBytes = logSizeInBytes / 1024;
    return isSmallEnoughToBeConsiderdEmptyCache(logSizeInBytes)
      ? noLogInfoMsg
      : `Delete ${logSizeInKiloBytes.toPrecision(2)}kB of diagnostic logs`;
  }, [logSizeInBytes]);

  return (
    <>
      <MenuItem
        onClick={closeHandler(async () => {
          await copyLogsToClipboard();
          toast.success(i18n.notification.copiedToClipboard);
        })}
      >
          {i18n.common.copyDiagnostics}
        <Caption mt="space.04" fontSize="12px !important">
            {i18n.common.copyDiagnosticsCaption}
        </Caption>
      </MenuItem>
      <MenuItem
        onClick={closeHandler(async () => {
          await clearBrowserStorageLogs();
          toast.success(i18n.common.clearDiagnosticMsg);
        })}
      >
          {i18n.common.clearDiagnostic}
        <Caption mt="space.04" fontSize="12px !important">
          {diagnosticLogText}
        </Caption>
      </MenuItem>
      <Divider />
    </>
  );
}
