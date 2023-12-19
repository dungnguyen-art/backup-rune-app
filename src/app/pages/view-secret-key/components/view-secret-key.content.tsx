import { styled } from 'leather-styles/jsx';
import i18n from '@app/i18n'
export function ViewSecretKeyContent(): React.JSX.Element {
  return (
    <>
      <styled.h1
        textStyle={['heading.03', 'heading.03', 'heading.03', 'display.02']}
        mt="space.00"
        mb="space.06"
      >
          {i18n.formatString(i18n.common.yourSecretKey, {
              htmlTag: <br/>
          })}
      </styled.h1>
      <styled.p textStyle={['label.01', 'heading.05']}>
          {i18n.common.viewSecretKeyContent}
      </styled.p>

      <br />
      <styled.p textStyle={['label.01', 'heading.05']} mb="space.06">
          {i18n.common.loseTheseWords}
      </styled.p>
    </>
  );
}
