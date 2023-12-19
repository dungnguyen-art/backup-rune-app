import { styled } from 'leather-styles/jsx';
import i18n from '@app/i18n'
export function ChooseFeeSubtitle({ isSendingMax }: { isSendingMax: boolean }) {
  const subtitle = isSendingMax ? (
    i18n.screen["sendAsset-chooseFee.brief"]
  ) : (
    <>
      {i18n.formatString(i18n.screen["sendAsset-chooseFee"], {
        htmlTag: <br/>
      })}
    </>
  );

  return (
    <styled.span color="accent.text-subdued" textAlign="center" textStyle="caption.02">
      {subtitle}
    </styled.span>
  );
}

