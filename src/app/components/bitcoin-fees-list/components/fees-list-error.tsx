import { useNavigate } from 'react-router-dom';

import { Box } from 'leather-styles/jsx';

import { RouteUrls } from '@shared/route-urls';

import { GenericError, GenericErrorListItem } from '@app/components/generic-error/generic-error';
import i18n from '@app/i18n'

const body = i18n.errorMessages.body;
const helpTextList = [<GenericErrorListItem key={1} text= {i18n.errorMessages.helpTextList} />];
const title = i18n.errorMessages.title;

export function FeesListError() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" px={['unset', 'space.05']} py="space.04" width="100%">
      <GenericError
        body={body}
        helpTextList={helpTextList}
        onClose={() => navigate(RouteUrls.SendCryptoAsset)}
        title={title}
      />
    </Box>
  );
}
