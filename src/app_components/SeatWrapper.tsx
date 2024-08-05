"use client";
import { Circle, Layer, Rect, Stage, Transformer } from "react-konva";
import { Button } from "@/components/ui/button";
import { SaveIcon, Trash2Icon } from "lucide-react";
import {
  createContext,
  ElementRef,
  Fragment,
  useCallback,
  useRef,
  useState,
} from "react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import SeatContextMenu from "./SeatContextMenu";
import {
  type ICircleDimensions,
  type IObject,
  type IRectDimensions,
  type ISeatObjectsContext,
  ObjectMode,
} from "../../Types";
import { Drawer } from "@/components/ui/drawer";
import SeatManageShape from "./SeatManageShape";
import { KonvaEventObject } from "konva/lib/Node";
import { uuid } from "uuidv4";
import { useToast } from "@/components/ui/use-toast";
import SeatConfigSelector from "./SeatConfigSelector";

export const SeatObjectsContext = createContext<ISeatObjectsContext>({});

interface IProps {
  isEditable: boolean;
}

function SeatWrapper({ isEditable }: IProps) {
  const [objects, setObjects] = useState<IObject[]>(
    JSON.parse(localStorage.getItem("planner-contents") ?? "[]") as IObject[]
  );
  const transformerRef = useRef<ElementRef<typeof Transformer>>(null);
  const editingShapeRef = useRef<IObject | null>();

  const { toast } = useToast();

  const setSelectorObjectValues = useCallback((newObjects: IObject[]) => {
    setObjects(newObjects);
  },
  []);

  const addObject = useCallback((object: IObject) => {
    const objectToBeAdded = {
      ...object,
      id: uuid(),
    };
    setObjects((prev) => [...prev, objectToBeAdded]);
  }, []);

  const onEditableClickHandler = (
    e: KonvaEventObject<MouseEvent>,
    o: IObject
  ) => {
    transformerRef.current?.nodes([e.target]);
    transformerRef.current?.getLayer()?.batchDraw();

    editingShapeRef.current = o;
  };

  const onNotEditableClickHandler = (object: IObject) => {
    const editedObject = objects?.find((o) => o.id === object.id);

    if (editedObject) {
      editedObject.reservation = {
        isReserved: !editedObject.reservation.isReserved,
        by: editedObject.reservation.by ? "" : "TODO: useSession",
      };

      setObjects((prev) => {
        const otherObjects = prev.filter((o) => o.id !== object.id);
        //TODO: set object sizes

        return [...otherObjects, editedObject];
      });
    }
  };

  const onClickOutHandler = () => {
    transformerRef.current?.nodes([]);
    editingShapeRef.current = null;

    localStorage.setItem("planner-contents", JSON.stringify(objects));
  };

  const clearContents = () => {
    setObjects([]);
    onClickOutHandler();

    toast({
      title: "Content has been cleared",
      description: "The planner contents have been cleared",
    });
  };

  const onDragEventHandler = (
    e: KonvaEventObject<DragEvent>,
    object: IObject
  ) => {
    const editedObject = objects?.find((o) => o.id === object.id);

    if (editedObject) {
      editedObject.coords = {
        x: e.target.x(),
        y: e.target.y(),
      };
      editedObject.rotation = e.target.rotation();

      setObjects((prev) => {
        const otherObjects = prev.filter((o) => o.id !== object.id);
        //TODO: set object sizes

        return [...otherObjects, editedObject];
      });
    }
  };

  const colorRenderer = useCallback((object: IObject) => {
    if (isEditable) {
      return "#6E7F8A";
    } else if (object.reservation?.isReserved) {
      return "#7D98A1";
    } else {
      return "#4D5E61";
    }
  }, []);

  const rectRenderer = useCallback((object: IObject) => {
    const dimensions = object.dimensions as IRectDimensions;

    const objectProps = isEditable
      ? {
          onClick: (e: KonvaEventObject<MouseEvent>) =>
            onEditableClickHandler(e, object),
          draggable: true,
          onDragEnd: (e: KonvaEventObject<DragEvent>) =>
            onDragEventHandler(e, object),
        }
      : {
          onClick: () => onNotEditableClickHandler(object),
        };

    const color = colorRenderer(object);

    return (
      <Rect
        key={object.id}
        id={object.id}
        x={object.coords.x}
        y={object.coords.y}
        rotation={object.rotation}
        width={dimensions.width}
        height={dimensions.height}
        {...objectProps}
        fill={color}
      />
    );
  }, []);

  const circleRenderer = useCallback((object: IObject) => {
    const dimensions = object.dimensions as ICircleDimensions;

    const objectProps = isEditable
      ? {
          onClick: (e: KonvaEventObject<MouseEvent>) =>
            onEditableClickHandler(e, object),
          draggable: true,
          onDragEnd: (e: KonvaEventObject<DragEvent>) =>
            onDragEventHandler(e, object),
        }
      : {
          onClick: () => onNotEditableClickHandler(object),
        };

    const color = colorRenderer(object);

    return (
      <Circle
        key={object.id}
        id={object.id}
        x={object.coords.x}
        y={object.coords.y}
        rotation={object.rotation}
        radius={dimensions.radius}
        {...objectProps}
        fill={color}
      />
    );
  }, []);

  const renderer = useCallback((object: IObject) => {
    switch (object.type) {
      case ObjectMode.RECT:
        return rectRenderer(object);
      case ObjectMode.CIRCLE:
        return circleRenderer(object);
      default:
        return;
    }
  }, []);

  return (
    <SeatObjectsContext.Provider
      value={{
        objects,
        addObject,
      }}
    >
      <div>
        <ContextMenu>
          <Drawer>
            {isEditable ? (
              <Fragment>
                <Button
                  variant={"default"}
                  className="p-3"
                  onClick={onClickOutHandler}
                >
                  Save <SaveIcon />
                </Button>
                <Button
                  variant={"destructive"}
                  className="p-3"
                  onClick={clearContents}
                >
                  Clear <Trash2Icon />
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <SeatConfigSelector />
              </Fragment>
            )}
            <ContextMenuTrigger>
              <Stage
                width={window.innerWidth}
                height={window.innerHeight - 200}
                style={{
                  border: "1px solid #555",
                }}
              >
                <Layer>
                  {objects?.map((obj) => renderer(obj))}
                  <Transformer ref={transformerRef} flipEnabled={false} />
                </Layer>
              </Stage>
            </ContextMenuTrigger>
            {isEditable ? (
              <SeatContextMenu
                options={[
                  {
                    label: "Save",
                    icon: <SaveIcon />,
                    onClick: onClickOutHandler,
                  },
                  {
                    label: "Clear",
                    icon: <Trash2Icon />,
                    onClick: clearContents,
                  },
                ]}
              />
            ) : (
              <Fragment />
            )}
            <SeatManageShape />
          </Drawer>
        </ContextMenu>
      </div>
    </SeatObjectsContext.Provider>
  );
}

export default SeatWrapper;
