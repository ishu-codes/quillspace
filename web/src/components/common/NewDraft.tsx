import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateDraft } from "@/fetchers/drafts";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  className?: string;
  iconClassName?: string;
}

export default function NewDraft({ title = "Write", className = "px-5", iconClassName = "w-4 h-4" }: Props) {
  const navigate = useNavigate();
  const { mutateAsync: createDraft } = useCreateDraft();
  const [newDraftData, setNewDraftData] = useState<{
    title: string;
    desc: string;
  }>({ title: "", desc: "" });

  const handleCreateNewDraft = async () => {
    console.log(newDraftData);
    if (newDraftData.title.trim() === "") {
      toast.warning("Title cannot be empty!");
      return;
    }

    try {
      const createdDraft = await createDraft({
        title: newDraftData.title,
        desc: newDraftData.desc,
      });

      navigate(`/drafts/${createdDraft.id}`);
    } catch (err: any) {
      toast.error("Failed to create new draft!", {
        description: err.message,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={"default"} className={cn("rounded-full gap-2 font-bold shadow-sm", className)}>
          <PlusIcon className={iconClassName} />
          <span className="hidden md:inline-block">{title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-serif">A new story begins</DialogTitle>
          <DialogDescription className="text-lg">
            Capture your thoughts in a minimal, focused environment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="new-draft-title"
              className="text-sm font-bold uppercase tracking-widest text-muted-foreground"
            >
              Title
            </Label>
            <Input
              id="new-draft-title"
              className="h-12 text-xl font-serif border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
              value={newDraftData.title}
              onChange={(e) =>
                setNewDraftData((state) => ({
                  ...state,
                  title: e.target.value,
                }))
              }
              placeholder="The title of your piece..."
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="new-draft-desc"
              className="text-sm font-bold uppercase tracking-widest text-muted-foreground"
            >
              Short description
            </Label>
            <Input
              id="new-draft-desc"
              className="h-12 border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
              value={newDraftData.desc}
              onChange={(e) =>
                setNewDraftData((state) => ({
                  ...state,
                  desc: e.target.value,
                }))
              }
              placeholder="What is this story about?"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateNewDraft} className="w-full h-12 rounded-full font-bold text-lg">
            Create Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
