import React, { useState } from "react";
import { ModeToggle } from "@/components/toggleMode";
import AddItem from "@/components/AddItem";
import { Separator } from "@/components/ui/separator";
import TaskItems from "@/components/TaskItems";

const App : React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false)
  const handleRefresh = () => {
    setRefresh(prevState => !prevState)
  }

  return (
    <div className="w-screen h-screen flex items-center bg-secondary justify-center">
      <div className="w-[25rem] rounded-xl h-[90%] bg-background p-4 shadow-2xl">
        <div className="h-[10%] w-full text-center flex justify-between text-foreground ">
          <p className="font-bold text-2xl">Todo List</p>
          <ModeToggle />
        </div>
        <div className="w-full h-[90%] scrollbar-hide">
          <AddItem onFormSubmit = {handleRefresh} />
          <Separator className="my-4" />
          <div className="h-[87%] overflow-y-scroll">
          <TaskItems key = {refresh ? 'refresh' : 'no-refresh'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
