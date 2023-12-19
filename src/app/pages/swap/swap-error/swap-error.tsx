import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from 'leather-styles/jsx';
import get from 'lodash.get';

import { RouteUrls } from '@shared/route-urls';

import { GenericError, GenericErrorListItem } from '@app/components/generic-error/generic-error';
import i18n from "@app/i18n";

const helpTextList = [
  <GenericErrorListItem
    key={1}
    text={<styled.span textStyle="label.02">{i18n.errorMessages["swap-broadcastError.report"]}</styled.span>}
  />,
];

export function SwapError() {
  const location = useLocation();
  const navigate = useNavigate();
  const message = get(location.state, 'message') as string;
  const title = get(location.state, 'title') as string;

  return (
    <GenericError
      body={message}
      helpTextList={helpTextList}
      mb="space.06"
      onClose={() => navigate(RouteUrls.Home)}
      title={title}
    />
  );
}
