import { ItemProps } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Item: React.FC<{ props: ItemProps; onDelete: () => void }> = ({
  props,
  onDelete,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(props.task.isClicked);
  const { toast } = useToast();

  useEffect(() => {
    const savedState = localStorage.getItem(props.keyValue);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setIsClicked(parsedState.isClicked);
    }
  }, [props.keyValue]);

  useEffect(() => {
    const taskState = {
      task_name: props.task.task_name,
      isClicked: isClicked,
    };
    localStorage.setItem(props.keyValue, JSON.stringify(taskState));
  }, [isClicked, props.keyValue, props.task.task_name]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleDelete = () => {
    localStorage.removeItem(props.keyValue);
    onDelete();
    toast({
      title: "Deleted task successfully.",
      description: props.task.task_name,
    });
  };

  return (
    <div className="flex justify-between items-center rounded-md gap-2 w-full hover:cursor-pointer px-4 hover:outline hover:outline-primary bg-secondary">
      <div
        onClick={handleClick}
        className="flex items-center gap-3 h-full w-full py-4"
      >
        <Checkbox checked={isClicked} onChange={handleClick} />
        <p
          className={`text-sm text-secondary-foreground ${
            isClicked ? "line-through text-muted-foreground" : ""
          }`}
        >
          {props.task.task_name}
        </p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleDelete}
              variant={"outline"}
              className="px-2 hover:bg-primary hover:text-primary-foreground h-auto text-secondary-foreground"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.33 16.5H13.66"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 12.5H14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete task</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Item;
