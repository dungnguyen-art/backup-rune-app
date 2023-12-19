import { useLocation } from 'react-router-dom';

import get from 'lodash.get';
import i18n from '@app/i18n'
import { GenericError, GenericErrorListItem } from '@app/components/generic-error/generic-error';

const helpTextList = [
  <GenericErrorListItem key={1} text={i18n.common.reportIssue} />,
];

function useRequestErrorState() {
  const location = useLocation();
  const message = get(location.state, 'message') as string;
  const title = get(location.state, 'title') as string;

  return { message, title };
}

export function RequestError() {
  const { message, title } = useRequestErrorState();

  return <GenericError body={message} helpTextList={helpTextList} title={title} />;
}
