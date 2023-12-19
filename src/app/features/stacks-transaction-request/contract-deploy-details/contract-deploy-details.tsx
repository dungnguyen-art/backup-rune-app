import { useState } from 'react';

import { HStack, HTMLStyledProps, Stack, styled } from 'leather-styles/jsx';

import { Prism } from '@app/common/clarity-prism';
import { AttachmentRow } from '@app/features/stacks-transaction-request/attachment-row';
import { ContractPreviewLayout } from '@app/features/stacks-transaction-request/contract-preview';
import { Row } from '@app/features/stacks-transaction-request/row';
import {
  useCurrentAccountStxAddressState,
  useCurrentStacksAccount,
} from '@app/store/accounts/blockchain/stacks/stacks-account.hooks';
import { useTransactionRequestState } from '@app/store/transactions/requests.hooks';
import { CodeBlock } from '@app/ui/components/codeblock';
import { Title } from '@app/ui/components/typography/title';
import i18n from '@app/i18n'

function ContractCodeSection() {
  const transactionRequest = useTransactionRequestState();

  const currentAccount = useCurrentStacksAccount();
  const currentAccountStxAddress = useCurrentAccountStxAddressState();

  if (
    !transactionRequest ||
    transactionRequest.txType !== 'smart_contract' ||
    !currentAccount ||
    !currentAccountStxAddress
  ) {
    return null;
  }

  return (
    <CodeBlock
      border="default"
      code={transactionRequest.codeBody}
      maxWidth="100vw"
      prism={Prism as any}
    />
  );
}

interface TabButtonProps extends HTMLStyledProps<'button'> {
  isActive: boolean;
}

function TabButton(props: TabButtonProps) {
  const { isActive, ...rest } = props;

  return (
    <styled.button
      bg={isActive ? 'accent.component-background-hover' : 'transparent'}
      borderRadius="xs"
      color={isActive ? 'accent.text-primary' : 'accent.text-subdued'}
      px="space.04"
      py="space.03"
      textStyle="label.01"
      type="button"
      {...rest}
    />
  );
}

export function ContractDeployDetails() {
  const transactionRequest = useTransactionRequestState();
  const currentAccount = useCurrentStacksAccount();
  const currentAccountStxAddress = useCurrentAccountStxAddressState();
  const [tab, setTab] = useState<'details' | 'code'>('details');

  if (
    !transactionRequest ||
    transactionRequest.txType !== 'smart_contract' ||
    !currentAccount ||
    !currentAccountStxAddress
  ) {
    return null;
  }

  return (
    <Stack mb="space.05" gap="space.05" width="100%">
      <HStack gap="0">
        <TabButton onClick={() => setTab('details')} isActive={tab === 'details'}>
          {i18n.button.details}
        </TabButton>
        <TabButton onClick={() => setTab('code')} isActive={tab === 'code'}>
          {i18n.button.code}
        </TabButton>
      </HStack>
      {tab === 'details' ? (
        <Stack
          gap="space.05"
          border="4px solid"
          borderColor="accent.border-default"
          borderRadius="md"
          py="space.06"
          px="space.04"
        >
          <Title>{i18n.common.contractDeployDetails}</Title>
          <ContractPreviewLayout
            contractAddress={currentAccountStxAddress}
            contractName={transactionRequest.contractName}
          />
          <Stack gap="space.04">
            {currentAccountStxAddress && (
              <Row name={i18n.common.contractAddress} value={currentAccountStxAddress} type="Principal" />
            )}
            <Row name={i18n.common.contractName} value={transactionRequest.contractName} type="String" />
            {transactionRequest.attachment && <AttachmentRow />}
          </Stack>
        </Stack>
      ) : (
        <ContractCodeSection />
      )}
    </Stack>
  );
}
