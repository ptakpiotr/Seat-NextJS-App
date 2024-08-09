import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import { PanelBottomCloseIcon } from "lucide-react";

const handleFormSubmit = async (formData: FormData) => {
  "use server";
  console.log(formData.get("title"));
};

function AddNews() {
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
          <form action={handleFormSubmit}>
            <Input style={{margin : "0.5rem"}} type="text" name="title" placeholder="Title" />
            <Input style={{margin : "0.5rem"}} type="url" name="image" placeholder="Image" />
            <Button type="submit">Add</Button>
          </form>
        </DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  );
}

export default AddNews;
