import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SelectContent, SelectItem, SelectRoot, SelectTrigger } from '@radix-ui/themes';
import { ChainID } from '@stacks/transactions';
import { NetworkSelectors } from '@tests/selectors/network.selectors';
import { Formik, useFormik } from 'formik';
import { css } from 'leather-styles/css';
import { Stack, styled } from 'leather-styles/jsx';

import { BitcoinNetworkModes, DefaultNetworkConfigurations } from '@shared/constants';
import { RouteUrls } from '@shared/route-urls';
import { isValidUrl } from '@shared/utils/validate-url';

import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { removeTrailingSlash } from '@app/common/url-join';
import { CenteredPageContainer } from '@app/components/centered-page-container';
import { ErrorLabel } from '@app/components/error-label';
import { Header } from '@app/components/header';
import {
  useCurrentStacksNetworkState,
  useNetworksActions,
} from '@app/store/networks/networks.hooks';
import { LeatherButton } from '@app/ui/components/button';
import { Input } from '@app/ui/components/input';
import { Title } from '@app/ui/components/typography/title';
import i18n from '@app/i18n'

/**
 * The **peer** network ID.
 * Not used in signing, but needed to determine the parent of a subnet.
 */
enum PeerNetworkID {
  Mainnet = 0x17000000,
  Testnet = 0xff000000,
}

interface AddNetworkFormValues {
  key: string;
  name: string;
  stacksUrl: string;
  bitcoinUrl: string;
}
const addNetworkFormValues: AddNetworkFormValues = {
  key: '',
  name: '',
  stacksUrl: '',
  bitcoinUrl: '',
};

export function AddNetwork() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const network = useCurrentStacksNetworkState();
  const networksActions = useNetworksActions();
  const [bitcoinApi, setBitcoinApi] = useState<BitcoinNetworkModes>('mainnet');

  const formikProps = useFormik({
    initialValues: addNetworkFormValues,
    onSubmit: () => {},
  });

  const { setFieldValue } = formikProps;

  useRouteHeader(<Header title={i18n.button.addaNetwork} onClose={() => navigate(RouteUrls.Home)} />);

  const handleApiChange = (newValue: BitcoinNetworkModes) => {
    setBitcoinApi(newValue);
  };

  const setStacksUrl = useCallback(
    (value: string) => {
      setFieldValue('stacksUrl', value);
    },
    [setFieldValue]
  );

  const setBitcoinUrl = useCallback(
    (value: string) => {
      setFieldValue('bitcoinUrl', value);
    },
    [setFieldValue]
  );

  useEffect(() => {
    switch (bitcoinApi) {
      case 'mainnet':
        setStacksUrl('https://api.hiro.so');
        setBitcoinUrl('https://blockstream.info/api');
        break;
      case 'testnet':
        setStacksUrl('https://api.testnet.hiro.so');
        setBitcoinUrl('https://blockstream.info/testnet/api');
        break;
      case 'signet':
        setStacksUrl('https://api.testnet.hiro.so');
        setBitcoinUrl('https://mempool.space/signet/api');
        break;
      case 'regtest':
        setStacksUrl('https://api.testnet.hiro.so');
        setBitcoinUrl('https://mempool.space/testnet/api');
        break;
    }
  }, [bitcoinApi, setStacksUrl, setBitcoinUrl]);

  return (
    <CenteredPageContainer>
      <Formik
        initialValues={addNetworkFormValues}
        onSubmit={async () => {
          const { name, stacksUrl, bitcoinUrl, key } = formikProps.values;

          if (!isValidUrl(stacksUrl)) {
            setError('Enter a valid Stacks API URL');
            return;
          }

          if (!isValidUrl(bitcoinUrl)) {
            setError('Enter a valid Bitcoin API URL');
            return;
          }

          if (!key) {
            setError('Enter a unique key');
            return;
          }

          setLoading(true);
          setError('');

          const stacksPath = removeTrailingSlash(new URL(formikProps.values.stacksUrl).href);
          const bitcoinPath = removeTrailingSlash(new URL(formikProps.values.bitcoinUrl).href);

          try {
            const bitcoinResponse = await network.fetchFn(`${bitcoinPath}/mempool/recent`);
            if (!bitcoinResponse.ok) throw new Error('Unable to fetch mempool from bitcoin node');
            const bitcoinMempool = await bitcoinResponse.json();
            if (!Array.isArray(bitcoinMempool))
              throw new Error('Unable to fetch mempool from bitcoin node');
          } catch (error) {
            setError('Unable to fetch mempool from bitcoin node');
            setLoading(false);
            return;
          }

          let stacksChainInfo: any;
          try {
            const stacksResponse = await network.fetchFn(`${stacksPath}/v2/info`);
            stacksChainInfo = await stacksResponse.json();
            if (!stacksChainInfo) throw new Error('Unable to fetch info from stacks node');
          } catch (error) {
            setError('Unable to fetch info from stacks node');
            setLoading(false);
            return;
          }

          // Attention:
          // For mainnet/testnet the v2/info response `.network_id` refers to the chain ID
          // For subnets the v2/info response `.network_id` refers to the network ID and the chain ID (they are the same for subnets)
          // The `.parent_network_id` refers to the actual peer network ID in both cases
          const { network_id: chainId, parent_network_id: parentNetworkId } = stacksChainInfo;

          const isSubnet = typeof stacksChainInfo.l1_subnet_governing_contract === 'string';
          const isFirstLevelSubnet =
            isSubnet &&
            (parentNetworkId === PeerNetworkID.Mainnet ||
              parentNetworkId === PeerNetworkID.Testnet);

          // Currently, only subnets of mainnet and testnet are supported in the wallet
          if (isFirstLevelSubnet) {
            const parentChainId =
              parentNetworkId === PeerNetworkID.Mainnet ? ChainID.Mainnet : ChainID.Testnet;
            networksActions.addNetwork({
              id: key as DefaultNetworkConfigurations,
              name: name,
              chainId: parentChainId, // Used for differentiating control flow in the wallet
              subnetChainId: chainId, // Used for signing transactions (via the network object, not to be confused with the NetworkConfigurations)
              url: stacksPath,
              bitcoinNetwork: bitcoinApi,
              bitcoinUrl: bitcoinPath,
            });
            navigate(RouteUrls.Home);
          } else if (chainId === ChainID.Mainnet || chainId === ChainID.Testnet) {
            networksActions.addNetwork({
              id: key as DefaultNetworkConfigurations,
              name: name,
              chainId: chainId,
              url: stacksPath,
              bitcoinNetwork: bitcoinApi,
              bitcoinUrl: bitcoinPath,
            });
            navigate(RouteUrls.Home);
          } else {
            setError('Unable to determine chainID from node.');
          }
          setLoading(false);
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack
              gap="space.05"
              maxWidth="centeredPageFullWidth"
              px={['space.05', 'space.04']}
              textAlign={['left', 'center']}
            >
              <styled.span textStyle="body.02">
                Use this form to add a new instance of the{' '}
                <a
                  href="https://github.com/blockstack/stacks-blockchain-api"
                  target="_blank"
                  rel="noreferrer"
                >
                  Stacks Blockchain API
                </a>{' '}
                or{' '}
                <a href="https://github.com/Blockstream/esplora" target="_blank" rel="noreferrer">
                  Bitcoin Blockchain API
                </a>
                . Make sure you review and trust the host before you add it.
              </styled.span>
              <Input
                autoFocus
                borderRadius="sm"
                height="64px"
                onChange={formikProps.handleChange}
                name="name"
                placeholder="Name"
                value={formikProps.values.name}
                width="100%"
                data-testid={NetworkSelectors.NetworkName}
              />
              <Title>Bitcoin API</Title>
              <SelectRoot onValueChange={handleApiChange} defaultValue="mainnet">
                <SelectTrigger
                  className={css({
                    backgroundColor: 'accent.background-primary',
                    borderRadius: '6px',
                    border: '1px solid accent.border-primary',
                  })}
                ></SelectTrigger>
                <SelectContent
                  className={css({
                    backgroundColor: 'accent.background-primary',
                    borderRadius: '6px',
                    border: '1px solid accent.border-primary',
                    dropShadow: 'lg',
                  })}
                >
                  <SelectItem key="mainnet" value="mainnet">
                    Mainnet
                  </SelectItem>
                  <SelectItem key="testnet" value="testnet">
                    Testnet
                  </SelectItem>
                  <SelectItem key="signet" value="signet">
                    Signet
                  </SelectItem>
                  <SelectItem key="regtest" value="regtest">
                    Regtest
                  </SelectItem>
                </SelectContent>
              </SelectRoot>
              <Title>Stacks API URL</Title>
              <Input
                borderRadius="sm"
                height="64px"
                onChange={formikProps.handleChange}
                name="stacksUrl"
                placeholder="Stacks Address"
                value={formikProps.values.stacksUrl}
                width="100%"
                data-testid={NetworkSelectors.NetworkStacksAddress}
              />
              <Title>{i18n.common.bitcoinAPIURL}</Title>
              <Input
                borderRadius="sm"
                height="64px"
                onChange={formikProps.handleChange}
                name="bitcoinUrl"
                placeholder="Bitcoin Address"
                value={formikProps.values.bitcoinUrl}
                width="100%"
                data-testid={NetworkSelectors.NetworkBitcoinAddress}
              />
              <Input
                borderRadius="sm"
                height="64px"
                onChange={formikProps.handleChange}
                name="key"
                placeholder="Key"
                value={formikProps.values.key}
                width="100%"
                data-testid={NetworkSelectors.NetworkKey}
              />
              {error ? (
                <ErrorLabel data-testid={NetworkSelectors.ErrorText}>{error}</ErrorLabel>
              ) : null}
              <LeatherButton
                disabled={loading}
                aria-busy={loading}
                data-testid={NetworkSelectors.BtnAddNetwork}
                type="submit"
              >
                {i18n.button.addNetwork}
              </LeatherButton>
            </Stack>
          </form>
        )}
      </Formik>
    </CenteredPageContainer>
  );
}
