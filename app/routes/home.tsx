import { ChevronDown, ChevronsDown, ChevronUp, Fan, Power, Snowflake, Waves } from "lucide-react";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AC Remote control" },
    { name: "description", content: "Remote control widget for AC" },
  ];
}

export default function Home() {
    const [state, setState] = useState({power: true, mode: 1, temp: 16, fan: 1});
    useEffect( () => {
        fetch("http://192.168.1.8/state", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        });
    }, [state]);
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
              <Button size="lg" variant="secondary" onClick={() => setState({...state, power: !state.power})} className={`${state.power ? 'bg-green-500 text-light-500 text-white' : 'text-blue-500'} hover:bg-blue-500/90 shadow-xl has-[>svg]:p-5 h-auto`}>
                  <Power className="size-6" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setState({...state, mode: 1})} disabled={!state.power} className={`text-blue-500 ${state.mode === 1 ? 'bg-blue-500 text-white hover:bg-blue-500/90': ''} shadow-xl has-[>svg]:p-5 h-auto`}>
                  <Snowflake className="size-6" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setState({...state, mode: 2})} disabled={!state.power} className={`text-blue-500 ${state.mode === 2 ? 'bg-blue-500 text-white hover:bg-blue-500/90': ''} shadow-xl has-[>svg]:p-5 h-auto`}>
                  <Waves className="size-6" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setState({...state, mode: 3})} disabled={!state.power} className={`text-blue-500 ${state.mode === 3 ? 'bg-blue-500 text-white hover:bg-blue-500/90': ''} shadow-xl has-[>svg]:p-5 h-auto`}>
                  <Fan className="size-6" />
              </Button>
          </div>
          <div className="flex justify-around">
              <Button size="lg" variant="outline" onClick={() => setState({...state, temp: --state.temp})} disabled={state.temp === 16} className="shadow-xl has-[>svg]:p-5 h-auto">
                  <ChevronDown className="size-10"/>
              </Button>
              <Button size="lg" variant="outline" onClick={() => setState({...state, temp: ++state.temp})} disabled={state.temp === 36} className="shadow-xl has-[>svg]:p-5 h-auto">
                  <ChevronUp className="size-10" />
              </Button>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
          </div>
      </div>
    </div>
    )
}
