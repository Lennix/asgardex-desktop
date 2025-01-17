import React from 'react'

import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import * as appRoutes from '../routes/app'
import * as playgroundRoutes from '../routes/playground'
import * as poolsRoutes from '../routes/pools'
import * as lendingRoutes from '../routes/pools/lending'
import * as saversRoutes from '../routes/pools/savers'
import * as portfolioRoutes from '../routes/portfolio'
import * as walletRoutes from '../routes/wallet'
import { AppSettings } from './app/AppSettings'
import { DepositView } from './deposit/DepositView'
import { LoansView } from './loans/LoansView'
import { NoContentView } from './NoContentView'
import { PlaygroundView } from './playground/PlaygroundView'
import { PoolsOverview } from './pools/PoolsOverview'
import { SaversView } from './savers/SaversView'
import { SwapView } from './swap/SwapView'
import { AssetDetailsView } from './wallet/AssetDetailsView'
import { AssetsView } from './wallet/AssetsView'
import { BondsView } from './wallet/BondsView'
import { CreateView } from './wallet/CreateView'
import { WalletHistoryView } from './wallet/history'
import { ImportsView } from './wallet/importsView'
import { InteractView } from './wallet/Interact'
import { NoWalletView } from './wallet/NoWalletView'
import { PoolShareView } from './wallet/PoolShareView'
import { PortfolioView } from './wallet/PortfolioView/PortfolioView'
import { RunepoolView } from './wallet/RunepoolView'
import { SaversDetailsView } from './wallet/SaversTableView'
import { SendView } from './wallet/send'
import { TradeAssetsView } from './wallet/TradeAssetsView'
import { UnlockView } from './wallet/UnlockView'
import { WalletAuth } from './wallet/WalletAuth'

export const ViewRoutes: React.FC<{}> = (): JSX.Element => {
  const location = useLocation()
  return (
    <Routes>
      {/* home */}
      <Route path={appRoutes.base.template} element={<Navigate to={walletRoutes.assets.template} />} />
      {/* pool routes */}
      <Route path={poolsRoutes.base.template} element={<PoolsOverview />} />
      <Route path={poolsRoutes.active.template} element={<PoolsOverview />} />
      <Route path={poolsRoutes.pending.template} element={<PoolsOverview />} />
      <Route path={poolsRoutes.savers.template} element={<PoolsOverview />} />
      <Route path={poolsRoutes.lending.template} element={<PoolsOverview />} />

      <Route path={poolsRoutes.swap.template} element={<SwapView />} />
      <Route
        path={saversRoutes.earn.template}
        element={
          <WalletAuth>
            <SaversView />
          </WalletAuth>
        }
      />
      <Route
        path={lendingRoutes.borrow.template}
        element={
          <WalletAuth>
            <LoansView />
          </WalletAuth>
        }
      />
      <Route
        path={lendingRoutes.repay.template}
        element={
          <WalletAuth>
            <LoansView />
          </WalletAuth>
        }
      />
      <Route path={saversRoutes.withdraw.template} element={<SaversView />} />
      <Route
        path={poolsRoutes.deposit.template}
        element={
          <WalletAuth>
            <DepositView />
          </WalletAuth>
        }
      />
      {/* portfolio routes */}
      <Route
        path={portfolioRoutes.base.template}
        element={
          <WalletAuth>
            <PortfolioView />
          </WalletAuth>
        }
      />
      {/* wallet routes */}
      <Route path={walletRoutes.noWallet.template} element={<NoWalletView />} />
      <Route path={`${walletRoutes.create.base.template}/*`} element={<CreateView />} />
      <Route path={walletRoutes.locked.template} element={<UnlockView />} />
      <Route path={`${walletRoutes.imports.base.template}/*`} element={<ImportsView />} />
      <Route
        path={walletRoutes.base.template}
        element={<Navigate to={{ pathname: walletRoutes.assets.path(), search: location.search }} />}
      />
      <Route
        path={walletRoutes.assets.template}
        element={
          <WalletAuth>
            <AssetsView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.tradeAssets.template}
        element={
          <WalletAuth>
            <TradeAssetsView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.poolShares.template}
        element={
          <WalletAuth>
            <PoolShareView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.savers.template}
        element={
          <WalletAuth>
            <SaversDetailsView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.runepool.template}
        element={
          <WalletAuth>
            <RunepoolView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.interact.template}
        element={
          <WalletAuth>
            <InteractView />
          </WalletAuth>
        }
      />

      <Route
        path={walletRoutes.bonds.template}
        element={
          <WalletAuth>
            <BondsView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.send.template}
        element={
          <WalletAuth>
            <SendView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.assetDetail.template}
        element={
          <WalletAuth>
            <AssetDetailsView />
          </WalletAuth>
        }
      />
      <Route
        path={walletRoutes.history.template}
        element={
          <WalletAuth>
            <WalletHistoryView />
          </WalletAuth>
        }
      />

      <Route path={appRoutes.settings.template} element={<AppSettings />} />
      {/* playground - DEV only */}
      <Route path={playgroundRoutes.base.template} element={<PlaygroundView />} />
      {/* 404 */}
      <Route path="*" element={<NoContentView />} />
    </Routes>
  )
}
