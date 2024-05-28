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
    localStorage.removeItem(keyValue);
    setItems((prevItems) =>
      prevItems.filter((item) => item.keyValue !== keyValue)
    );
    toast({
      title: "Deleted task successfully.",
      description: items.find((item) => item.keyValue === keyValue)?.task,
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 h-[30rem] p-1 scrollbar-hide overflow-y-scroll">
      {items.length > 0 ? (
        items.map((item, index) => (
          <Item
            key={index}
            props={item}
            onDelete={() => handleDelete(item.keyValue)}
          />
        ))
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-primary text-center text-sm">No Tasks to do.</p>
        </div>
      )}
    </div>
  );
};

export default TaskItems;
