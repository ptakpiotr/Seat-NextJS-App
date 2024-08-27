import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleNewsFormSubmit } from "@/misc/serverActions";
import { PanelBottomCloseIcon } from "lucide-react";

interface IProps {
  closeDrawer: () => void;
}

function AddNews({ closeDrawer }: IProps) {
  return (
    <DrawerContent>
      <DrawerHeader className="sm:text-center">
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DrawerTitle style={{ flex: 1, marginLeft: "3.5rem" }}>
            Add new post
          </DrawerTitle>
          <DrawerClose>
            <Button variant="ghost">
              <PanelBottomCloseIcon />
            </Button>
          </DrawerClose>
        </div>
        <DrawerDescription>
          <form action={handleNewsFormSubmit}>
            <Input
              style={{ margin: "0.5rem" }}
              type="text"
              name="title"
              placeholder="Title"
            />
            <Input
              style={{ margin: "0.5rem" }}
              type="file"
              name="image"
              placeholder="Image"
            />
            <Textarea
              style={{ margin: "0.5rem" }}
              name="description"
              placeholder="Description"
            />
             <Textarea
              style={{ margin: "0.5rem" }}
              name="tags"
              placeholder="Tags (separated with ,)"
            />
            <Button type="submit" onClick={closeDrawer}>
              Add
            </Button>
          </form>
        </DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  );
}

export default AddNews;
