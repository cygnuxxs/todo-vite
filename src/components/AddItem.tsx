import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AddItem: React.FC<{ onFormSubmit: () => void }> = ({ onFormSubmit }) => {
  const [task, setTask] = useState<string>("");
  const { toast } = useToast();

  const addItem = (task: string) => {
    const taskData = {
      task_name: task,
      isClicked: false,
    };
    localStorage.setItem(String(localStorage.length), JSON.stringify(taskData));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (task.trim()) {
      addItem(task);
      toast({
        title: "Added task.",
        description: task,
      });
      setTask("");
      onFormSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <Input
        value={task}
        onChange={handleChange}
        name="task"
        placeholder="Add your task"
        required
        className="text-secondary-foreground"
        autoComplete="off"
      />
      <Button type="submit" className="px-4">
        Add
      </Button>
    </form>
  );
};

export default AddItem;
