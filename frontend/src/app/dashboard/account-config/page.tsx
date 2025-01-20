"use client";

import { Button } from "@/components/ui/Button";
import { FaFloppyDisk } from "react-icons/fa6";
import { PROJECTIONS, optionsRounding, optionsRisk } from "./constants";
import { useAccountConfig } from "./hooks/useAccountCongig";
import { AccountSummary } from "./components/AccountSummary";
import { RoundingRules } from "./components/RoundingRules";
import { InvestmentProfile } from "./components/InvestmentProfile";
import { Visualization } from "./components/Visualization";

export default function AccountConfigPage() {
  const {
    account,
    configAccount,
    handleFields,
    handleSubmit,
    roundedSimulate,
  } = useAccountConfig();

  return (
    <div className="flex flex-col relative h-[calc(100vh-120px)]">
      <h1 className="py-9 text-4xl font-medium flex-1 max-h-[112px]">
        Inversiones
      </h1>

      <section className="bg-white rounded-base w-full pt-8">
        <AccountSummary
          automaticRoundingEnabled={configAccount.automaticRoundingEnabled}
          onRoundingChange={(checked) =>
            handleFields("automaticRoundingEnabled", checked)
          }
          roundingAccumulatedBalance={account?.roundingAccumulatedBalance ?? 0}
          investmentThreshold={configAccount.investmentThreshold}
        />

        <div className="flex flex-row gap-2 flex-wrap max-w-5xl mx-auto mt-10">
          <RoundingRules
            config={configAccount}
            onConfigChange={handleFields}
            roundingOptions={optionsRounding}
          />
          <InvestmentProfile
            config={configAccount}
            onConfigChange={handleFields}
            riskOptions={optionsRisk}
          />
        </div>

        <div className="w-full flex items-center justify-center mt-5">
          <Button variant="default" onClick={handleSubmit}>
            <FaFloppyDisk className="mr-2" size={15} color="white" />
            Guardar informacion
          </Button>
        </div>

        <Visualization
          roundSimulation={
            roundedSimulate ?? {
              originalAmount: 0,
              roundingAmount: 0,
              totalAmount: 0,
            }
          }
          projections={PROJECTIONS}
        />
      </section>
    </div>
  );
}
