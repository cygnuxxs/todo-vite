import React, { useEffect, useState } from "react";
import { ItemProps, getItems } from "@/lib/utils";
import Item from "@/components/Item";
import { useToast } from "@/components/ui/use-toast";

const TaskItems: React.FC = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setItems(getItems());
  }, []);

  const handleDelete = (keyValue: string) => {
    const updatedItems = items.filter((item) => item.keyValue !== keyValue);
    setItems(updatedItems);
    localStorage.removeItem(keyValue);

    const deletedItem = items.find((item) => item.keyValue === keyValue);
    if (deletedItem) {
      toast({
        title: "Deleted task successfully.",
        description: deletedItem.task.task_name,
      });
    }
  };

  return items.length > 0 ? (
    <div className="w-full flex flex-col gap-2 p-1">
      {items.map((item) => (
        <Item key={item.keyValue} props={item} onDelete={() => handleDelete(item.keyValue)} />
      ))}
    </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-primary text-center text-sm">No Tasks to do.</p>
    </div>
  );
};

export default TaskItems;
