import React, { useMemo } from 'react'

import { Network } from '@xchainjs/xchain-client'
import { AnyAsset, baseAmount, baseToAsset, Chain, formatAssetAmountCurrency, formatBN } from '@xchainjs/xchain-util'
import { Grid, Row } from 'antd'
import { ColumnsType, ColumnType } from 'antd/lib/table'
import * as FP from 'fp-ts/lib/function'
import { useIntl } from 'react-intl'

import { Dex } from '../../../shared/api/types'
import * as PoolHelpers from '../../helpers/poolHelper'
import { MimirHalt } from '../../services/thorchain/types'
import { AssetLabel } from '../uielements/assets/assetLabel'
import { Tooltip } from '../uielements/common/Common.styles'
import { Label } from '../uielements/label'
import * as Styled from './PoolShares.styles'
import { PoolShareTableRowData, PoolShareTableData } from './PoolShares.types'

export type Props = {
  data: PoolShareTableData
  loading: boolean
  priceAsset: AnyAsset | undefined
  network: Network
  openShareInfo: FP.Lazy<void>
  haltedChains: Chain[]
  mimirHalt: MimirHalt
  dex: Dex
}

export const PoolShares: React.FC<Props> = ({
  data,
  priceAsset,
  openShareInfo,
  loading,
  network,
  haltedChains,
  mimirHalt,
  dex
}) => {
  const intl = useIntl()

  const isDesktopView = Grid.useBreakpoint()?.lg ?? false

  const iconColumn: ColumnType<PoolShareTableRowData> = useMemo(
    () => ({
      title: '',
      width: 90,
      render: ({ asset, type }: PoolShareTableRowData) => {
        const titleId = type === 'asym' ? 'poolshares.single.info' : 'poolshares.both.info'

        return (
          <Row justify="center" align="middle">
            <Tooltip title={intl.formatMessage({ id: titleId }, { asset: asset.ticker, rune: dex.asset.ticker })}>
              {/* div needed for tooltip */}
              <div>
                <Styled.AssetIcon asset={asset} size="normal" network={network} />
                {type === 'asym' && <Styled.AssetIconLabel>{type}</Styled.AssetIconLabel>}
              </div>
            </Tooltip>
          </Row>
        )
      }
    }),
    [dex, intl, network]
  )

  const poolColumn: ColumnType<PoolShareTableRowData> = useMemo(
    () => ({
      title: intl.formatMessage({ id: 'common.pool' }),
      align: 'left',
      responsive: ['md'],
      render: ({ asset }: PoolShareTableRowData) => <AssetLabel asset={asset} />
    }),
    [intl]
  )

  const ownershipColumn: ColumnType<PoolShareTableRowData> = useMemo(
    () => ({
      title: intl.formatMessage({ id: 'poolshares.ownership' }),
      align: 'center',
      render: ({ sharePercent }: PoolShareTableRowData) => (
        <Tooltip title={`${sharePercent} %`}>
          {/* div needed for tooltip */}
          <div>
            <Styled.OwnershipLabel align="center">{formatBN(sharePercent, 2)}%</Styled.OwnershipLabel>
          </div>
        </Tooltip>
      )
    }),
    [intl]
  )

  const valueColumn: ColumnType<PoolShareTableRowData> = useMemo(
    () => ({
      title: intl.formatMessage({ id: 'common.value' }),
      align: isDesktopView ? 'right' : 'center',
      render: ({ assetDepositPrice, runeDepositPrice }: PoolShareTableRowData) => {
        const totalPrice = baseAmount(runeDepositPrice.amount().plus(assetDepositPrice.amount()))
        return (
          <Label align={isDesktopView ? 'right' : 'center'}>
            {formatAssetAmountCurrency({ amount: baseToAsset(totalPrice), asset: priceAsset, decimal: 2 })}
          </Label>
        )
      }
    }),
    [intl, priceAsset, isDesktopView]
  )

  const assetColumn: ColumnType<PoolShareTableRowData> = useMemo(
    () => ({
      title: intl.formatMessage({ id: 'common.asset' }),
      align: 'right',
      render: ({ asset, assetShare }: PoolShareTableRowData) => (
        <Label align="right">
          {formatAssetAmountCurrency({
            amount: baseToAsset(assetShare),
            asset,
            decimal: 2
          })}
        </Label>
      )
    }),
    [intl]
  )

  const runeColumn: ColumnType<PoolShareTableRowData> = useMemo(
    () => ({
      title: dex.asset.symbol,
      align: 'right',
      render: ({ runeShare }: PoolShareTableRowData) => (
        <Label align="right">
          {formatAssetAmountCurrency({
            amount: baseToAsset(runeShare),
            asset: dex.asset,
            decimal: 2
          })}
        </Label>
      )
    }),
    [dex]
  )

  const manageColumn: ColumnType<PoolShareTableRowData> = useMemo(
    () => ({
      title: '',
      align: 'right',
      render: ({ asset, type }: PoolShareTableRowData) => {
        const disablePool = PoolHelpers.disableAllActions({ chain: asset.chain, haltedChains, mimirHalt })
        return (
          <Styled.ManageButton
            disabled={disablePool || type === 'asym'}
            asset={asset}
            variant="manage"
            useBorderButton={false}
            isTextView={isDesktopView}
            title={intl.formatMessage(
              { id: 'poolshares.single.notsupported' },
              { asset: asset.ticker, rune: dex.asset.ticker }
            )}
          />
        )
      }
    }),
    [haltedChains, mimirHalt, isDesktopView, intl, dex]
  )

  const desktopColumns: ColumnsType<PoolShareTableRowData> = useMemo(
    () => [iconColumn, poolColumn, ownershipColumn, assetColumn, runeColumn, valueColumn, manageColumn],
    [iconColumn, poolColumn, ownershipColumn, assetColumn, runeColumn, valueColumn, manageColumn]
  )

  const mobileColumns: ColumnsType<PoolShareTableRowData> = useMemo(
    () => [iconColumn, valueColumn, manageColumn],
    [iconColumn, valueColumn, manageColumn]
  )
  const website = dex.url
  const renderAnalyticsInfo = useMemo(() => {
    return network !== Network.Testnet ? (
      <>
        <Styled.InfoButton onClick={openShareInfo}>
          <Styled.TextLabel>{intl.formatMessage({ id: 'common.analytics' })}</Styled.TextLabel> <Styled.InfoArrow />
        </Styled.InfoButton>
        <Styled.InfoDescription>{website}</Styled.InfoDescription>
      </>
    ) : (
      <></>
    )
  }, [network, openShareInfo, intl, website])

  return (
    <Styled.Container>
      <Styled.Table
        loading={loading}
        columns={isDesktopView ? desktopColumns : mobileColumns}
        dataSource={data}
        rowKey={({ asset }) => asset.symbol}
      />
      {renderAnalyticsInfo}
    </Styled.Container>
  )
}
