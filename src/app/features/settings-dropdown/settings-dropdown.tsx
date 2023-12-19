import {useCallback, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {SettingsSelectors} from '@tests/selectors/settings.selectors';
import {Box, Flex, HStack} from 'leather-styles/jsx';

import {RouteUrls} from '@shared/route-urls';

import {useAnalytics} from '@app/common/hooks/analytics/use-analytics';
import {useDrawers} from '@app/common/hooks/use-drawers';
import {useKeyActions} from '@app/common/hooks/use-key-actions';
import {useModifierKey} from '@app/common/hooks/use-modifier-key';
import {useOnClickOutside} from '@app/common/hooks/use-onclickoutside';
import {useWalletType} from '@app/common/use-wallet-type';
import {whenPageMode} from '@app/common/utils';
import {openInNewTab, openIndexPageInNewTab} from '@app/common/utils/open-in-new-tab';
import {Divider} from '@app/components/layout/divider';
import {useCurrentStacksAccount} from '@app/store/accounts/blockchain/stacks/stacks-account.hooks';
import {useHasLedgerKeys, useLedgerDeviceTargetId} from '@app/store/ledger/ledger.selectors';
import {useCurrentNetworkId} from '@app/store/networks/networks.selectors';
import {ExternalLinkIcon} from '@app/ui/components/icons/external-link-icon';
import {Caption} from '@app/ui/components/typography/caption';

import {openFeedbackDialog} from '../feedback-button/feedback-button';
import {extractDeviceNameFromKnownTargetIds} from '../ledger/utils/generic-ledger-utils';
import {AdvancedMenuItems} from './components/advanced-menu-items';
import {LedgerDeviceItemRow} from './components/ledger-item-row';
import {SettingsMenuItem as MenuItem} from './components/settings-menu-item';
import {MenuWrapper} from './components/settings-menu-wrapper';
import i18n from '@app/i18n'

export function SettingsDropdown() {
    const ref = useRef<HTMLDivElement | null>(null);
    const hasGeneratedWallet = !!useCurrentStacksAccount();
    const {lockWallet} = useKeyActions();

    const {isShowingSettings, setIsShowingSettings} = useDrawers();
    const currentNetworkId = useCurrentNetworkId();
    const navigate = useNavigate();
    const analytics = useAnalytics();
    const {walletType} = useWalletType();
    const targetId = useLedgerDeviceTargetId();

    const {isPressed: showAdvancedMenuOptions} = useModifierKey('alt', 120);
    const location = useLocation();

    const handleClose = useCallback(() => setIsShowingSettings(false), [setIsShowingSettings]);

    const wrappedCloseCallback = useCallback(
        (callback: () => void) => () => {
            callback();
            handleClose();
        },
        [handleClose]
    );

    const isLedger = useHasLedgerKeys();

    useOnClickOutside(ref, isShowingSettings ? handleClose : null);

    // RouteUrls.Activity is nested off / so we need to use a link relative to the route
    const linkRelativeType =
        location.pathname === `${RouteUrls.Home}${RouteUrls.Activity}` ? 'route' : 'path';

    return (
        <MenuWrapper isShowing={isShowingSettings} ref={ref}>
            {isLedger && targetId && (
                <LedgerDeviceItemRow deviceType={extractDeviceNameFromKnownTargetIds(targetId)}/>
            )}
            {hasGeneratedWallet && walletType === 'software' && (
                <>
                    <MenuItem
                        data-testid={SettingsSelectors.ViewSecretKeyListItem}
                        onClick={wrappedCloseCallback(() => {
                            navigate(RouteUrls.ViewSecretKey);
                        })}
                    >
                        {i18n.dropdown.settingsViewSecretKey}
                    </MenuItem>
                </>
            )}
            <MenuItem
                data-testid={SettingsSelectors.ToggleTheme}
                onClick={wrappedCloseCallback(() => {
                    void analytics.track('click_change_theme_menu_item');
                    navigate(RouteUrls.ChangeTheme, {
                        relative: linkRelativeType,
                        state: {backgroundLocation: location},
                    });
                })}
            >
                {i18n.dropdown.settingsChangeTheme}
            </MenuItem>
            {whenPageMode({
                full: null,
                popup: (
                    <MenuItem
                        data-testid={SettingsSelectors.OpenWalletInNewTab}
                        onClick={() => {
                            void analytics.track('click_open_in_new_tab_menu_item');
                            openIndexPageInNewTab(location.pathname);
                        }}
                    >
                        <HStack>
                            <Box>{i18n.common.openInNewTab}</Box>
                            <ExternalLinkIcon/>
                        </HStack>
                    </MenuItem>
                ),
            })}
            <MenuItem
                data-testid={SettingsSelectors.GetSupportMenuItem}
                onClick={wrappedCloseCallback(() => {
                    openInNewTab('https://leather.gitbook.io/guides/installing/contact-support');
                })}
            >
                <HStack>
                    <Box>{i18n.dropdown.settingsGetSupport}</Box>
                    <ExternalLinkIcon/>
                </HStack>
            </MenuItem>
            <MenuItem onClick={wrappedCloseCallback(() => openFeedbackDialog())}>{i18n.button.feedback}</MenuItem>
            {hasGeneratedWallet ? <Divider/> : null}
            <MenuItem
                data-testid={SettingsSelectors.ChangeNetworkAction}
                onClick={wrappedCloseCallback(() => {
                    void analytics.track('click_change_network_menu_item');
                    navigate(RouteUrls.SelectNetwork, {
                        relative: linkRelativeType,
                        state: {backgroundLocation: location},
                    });
                })}
            >
                <Flex width="100%" alignItems="center" justifyContent="space-between">
                    <Box>{i18n.common.changeNetwork}</Box>
                    <Caption data-testid={SettingsSelectors.CurrentNetwork}>{currentNetworkId}</Caption>
                </Flex>
            </MenuItem>

            <Divider/>

            {showAdvancedMenuOptions && (
                <AdvancedMenuItems closeHandler={wrappedCloseCallback} settingsShown={isShowingSettings}/>
            )}
            {hasGeneratedWallet && walletType === 'software' && (
                <MenuItem
                    onClick={wrappedCloseCallback(() => {
                        void analytics.track('lock_session');
                        void lockWallet();
                        navigate(RouteUrls.Unlock);
                    })}
                    data-testid="settings-lock"
                >
                    {i18n.dropdown.settingsLock}
                </MenuItem>
            )}
            <MenuItem
                color="error.label"
                onClick={wrappedCloseCallback(() =>
                    navigate(RouteUrls.SignOutConfirm, {
                        relative: linkRelativeType,
                        state: {backgroundLocation: location},
                    })
                )}
                data-testid={SettingsSelectors.SignOutListItem}
            >
                {i18n.dropdown.settingsSignOut}
            </MenuItem>
        </MenuWrapper>
    );
}
