import "server-only";
import {getSdk } from "@/sdk";
import { type Locales, type MegaMenuItemFragment, type MenuItemFragment } from "@gql/graphql"
import { Utils } from "@remkoj/optimizely-cms-react";
import { getServerContext } from "@remkoj/optimizely-cms-react/rsc";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";

import Header from "./_header";

type HeaderWrapperProps = {
  locale?: string;
};

export default async function SiteHeader({ locale }: HeaderWrapperProps) {
  const sdk = getSdk()
  const { locale: currentLocale } = getServerContext()
  const headerLocale = currentLocale ?? locale ?? 'en'
  const config = await sdk.getHeader({
    locale: localeToGraphLocale(headerLocale) as Locales
  });

  const menuItems = config.menuItems?.items?.at(0)?.headerNavigation?.filter(Utils.isNotNullOrUndefined) as Array<MegaMenuItemFragment> | undefined;
  const utilityItems = config.menuItems?.items?.at(0)?.UtilityNavigationContentArea?.filter(Utils.isNotNullOrUndefined) as Array<MenuItemFragment> | undefined;
  const logo = config.menuItems?.items?.at(0)?.logo ?? undefined;

  return <Header menuItems={ menuItems ?? [] } utilityItems={ utilityItems ?? [] } logo={ logo } />;
}
