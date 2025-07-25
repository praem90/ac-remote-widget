import { ChevronDown, ChevronsDown, ChevronUp, Fan, Power, Snowflake, Waves } from "lucide-react";
import type { Route } from "./+types/home";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
    const [state, setState] = useState({power: true, mode: 1, temp: 16, fan: 1});
    return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full flex-grow flex items-center">
          <div className="w-full flex flex-col">
              <div className="flex items-center justify-center mb-4 text-7xl font-thin text-blue-300">
                  <span className="border rounded-full size-50 flex items-center justify-center">{state.temp}<sup>&deg;</sup>c</span>
              </div>
              <Progress value={(state.temp - 16) * 100/20} />
          </div>
      </div>
      <div className="w-full flex flex-col flex-grow justify-around">
          <div className="flex justify-between">
              <Button size="lg" variant="secondary" onClick={() => setState({...state, power: !state.power})} className={`${state.power ? 'bg-green-500 text-light-500 text-white' : 'text-blue-500'} hover:bg-blue-500/90 shadow-xl`}>
                  <Power />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setState({...state, mode: 1})} disabled={!state.power} className={`text-blue-500 ${state.mode === 1 ? 'bg-blue-500 text-white hover:bg-blue-500/90': ''} shadow-xl`}>
                  <Snowflake />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setState({...state, mode: 2})} disabled={!state.power} className={`text-blue-500 ${state.mode === 2 ? 'bg-blue-500 text-white hover:bg-blue-500/90': ''} shadow-xl`}>
                  <Waves />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setState({...state, mode: 3})} disabled={!state.power} className={`text-blue-500 ${state.mode === 3 ? 'bg-blue-500 text-white hover:bg-blue-500/90': ''} shadow-xl`}>
                  <Fan />
              </Button>
          </div>
          <div className="flex justify-around">
              <Button size="lg" variant="outline" onClick={() => setState({...state, temp: --state.temp})} disabled={state.temp === 16} className="shadow-xl">
                  <ChevronDown />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setState({...state, temp: ++state.temp})} disabled={state.temp === 36} className="shadow-xl">
                  <ChevronUp />
              </Button>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
          </div>
      </div>
    </div>
    )
}
