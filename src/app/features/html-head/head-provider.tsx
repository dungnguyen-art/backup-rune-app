import { Link, HeadProvider as ReastHeadProvider, Title } from 'react-head';

import { useNewBrandApprover } from '@app/store/settings/settings.selectors';
import i18n from '@app/i18n'

export function HeadProvider() {
  const { hasApprovedNewBrand } = useNewBrandApprover();
  return (
    <ReastHeadProvider>
      {hasApprovedNewBrand ? <LeatherMetaTags /> : <HiroMetaTags />}
    </ReastHeadProvider>
  );
}

function LeatherMetaTags() {
  const suffix = process.env.WALLET_ENVIRONMENT === 'development' ? '-dev' : '';
  return (
    <>
      <Title>{i18n.common.leather}</Title>
      <Link rel="icon" href={`/assets/icons/leather-icon-128${suffix}.png`} />
    </>
  );
}

function HiroMetaTags() {
  return (
    <>
      <Title>{i18n.common.hiroWallet}</Title>
      <Link rel="icon" href="/assets/icons/leather-icon-128.png" />
    </>
  );
}
