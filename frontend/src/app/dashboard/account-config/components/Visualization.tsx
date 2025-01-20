import { memo, useState } from "react";
import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { FaChartColumn, FaArrowTrendUp } from "react-icons/fa6";
import { COLOR } from "@/lib/config/constants";
import { RoundSimulateResponse } from "@/types/bank";
import { Projection } from "../constants";

interface VisualizationProps {
  roundSimulation?: RoundSimulateResponse;
  projections?: Projection[];
}

export const Visualization = memo(
  ({ roundSimulation, projections }: VisualizationProps) => {
    const [showSimulation, setShowSimulation] = useState(true);

    return (
      <Card className="flex flex-col gap-2 pt-6 mt-10 max-w-5xl mx-auto bg-neutral-light">
        <header className="flex flex-row gap-3 items-center pl-6">
          <IconBubble
            className="w-11 h-11 !bg-white"
            icon={<FaChartColumn size={22} color="black" />}
          />
          <h3 className="text-2xl font-medium">Visualización</h3>
        </header>

        <Card className="w-full h-max p-5 bg-white flex flex-col">
          <Card className="h-12 mx-3 p-1 flex flex-row w-full bg-neutral-light">
            <Card
              onClick={() => setShowSimulation(true)}
              className={`
                ${
                  showSimulation
                    ? "bg-white border border-neutral-light"
                    : "bg-neutral-light"
                }
                rounded-r-none h-10 flex-1 
                text-center flex items-center justify-center
                cursor-pointer transition-colors
              `}
            >
              Simulador de Ahorro
            </Card>
            <Card
              onClick={() => setShowSimulation(false)}
              className={`
                ${
                  !showSimulation
                    ? "bg-white border border-neutral-light"
                    : "bg-neutral-light"
                }
                rounded-l-none h-10 flex-1 
                text-center flex items-center justify-center
                cursor-pointer transition-colors
              `}
            >
              Proyección
            </Card>
          </Card>

          {showSimulation ? (
            <SimulationView simulation={roundSimulation} />
          ) : (
            <ProjectionView projections={projections} />
          )}
        </Card>
      </Card>
    );
  }
);

const SimulationView = memo(
  ({ simulation }: { simulation?: RoundSimulateResponse }) => (
    <Card className="!rounded-none bg-neutral-light m-5 py-4 px-5 w-full flex flex-col">
      <h3 className="font-medium">Simulacion de Redondeo</h3>
      <div className="flex-1 w-full flex justify-between items-center">
        <p className="text-sm">Compra original:</p>
        <p className="text-sm">${simulation?.originalAmount}</p>
      </div>
      <div className="flex-1 w-full flex justify-between items-end">
        <p className="text-sm">Redondeo:</p>
        <p className="text-success text-sm">+${simulation?.roundingAmount}</p>
      </div>
      <hr className="mt-3" />
      <div className="flex-1 w-full flex justify-between items-end">
        <p>Total:</p>
        <p>${simulation?.totalAmount}</p>
      </div>
    </Card>
  )
);

const ProjectionView = memo(
  ({ projections }: { projections?: Projection[] }) => (
    <div className="flex-1 flex flex-row gap-1 flex-wrap mx-8 my-4">
      {projections?.map((projection, index) => (
        <Card
          key={`${index}-projection`}
          className="bg-white border-2 border border-neutral-light flex-1 p-6 flex flex-col"
        >
          <span className="font-medium text-neutral-gray">
            {projection.period}
          </span>
          <h2 className="font-bold text-2xl">
            ${projection.amount.toLocaleString()}
          </h2>
          <span className="text-success text-sm">
            <FaArrowTrendUp
              className="inline mr-1"
              size={15}
              color={COLOR.SUCCESS}
            />
            {projection.increasePercentage}
          </span>
        </Card>
      ))}
    </div>
  )
);

Visualization.displayName = "Visualization";
SimulationView.displayName = "SimulationView";
ProjectionView.displayName = "ProjectionView";
