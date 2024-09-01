"use client";
import { Circle, Layer, Rect, Stage, Transformer } from "react-konva";
import { Button } from "@/components/ui/button";
import { SaveIcon, Trash2Icon } from "lucide-react";
import {
  createContext,
  ElementRef,
  Fragment,
  Suspense,
  useCallback,
  useEffect,
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
import { Event } from "@prisma/client";
import LoadingSpinner from "./LoadingSpinner";

export const SeatObjectsContext = createContext<ISeatObjectsContext>({});

interface IProps {
  isEditable: boolean;
  eventsToChoose: Event[];
  userId?: string | null;
}

function SeatWrapper({ isEditable, eventsToChoose, userId }: IProps) {
  const [objects, setObjects] = useState<IObject[]>([]);
  const [chosenEvent, setChosenEvent] = useState<Event | null>(null);
  const transformerRef = useRef<ElementRef<typeof Transformer>>(null);
  const editingShapeRef = useRef<IObject | null>();

  const { toast } = useToast();

  useEffect(() => {
    if (chosenEvent) {
      fetch(`/api/objects?event_id=${chosenEvent.id}`)
        .then((resp) => resp.json())
        .then((dt) => {
          if (dt) {
            const objects = dt as IObject[];
            console.log(objects);
            setObjects(objects);
          }
        });
    } else {
      setObjects([]);
    }
  }, [chosenEvent]);

  const setSelectorObjectValues = useCallback((newObjects: IObject[]) => {
    setObjects(newObjects);
  }, []);

  const setEvent = useCallback((newEvent: Event) => {
    setChosenEvent(newEvent);
  }, []);

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

  const applyEditableChanges = (
    e: KonvaEventObject<any>,
    o: IObject | null | undefined
  ) => {
    if (o) {
      const prevX = o.coords.x;
      const prevY = o.coords.y;

      o.coords = {
        x: e.target.x(),
        y: e.target.y(),
      };
      o.rotation = e.target.rotation();

      switch (o.type) {
        case ObjectMode.RECT:
          o.dimensions = {
            height: Math.floor(Math.abs(o.coords.y - prevY)),
            width: Math.floor(Math.abs(o.coords.x - prevX)),
          } satisfies IRectDimensions;
          break;
        case ObjectMode.CIRCLE:
          o.dimensions = {
            radius: Math.floor(
              Math.sqrt(
                Math.pow(prevX - o.coords.x, 2) +
                  Math.pow(prevY - o.coords.y, 2)
              )
            ),
          } satisfies ICircleDimensions;
          break;
      }
      console.log(o);
      setObjects((prev) => {
        const otherObjects = prev.filter((obj) => obj.id !== o.id);
        return [...otherObjects, o];
      });
    }
  };

  const onNotEditableClickHandler = (object: IObject) => {
    const editedObject = objects?.find((o) => o.id === object.id);

    if (editedObject) {
      editedObject.reservation = {
        isReserved: !editedObject.reservation?.isReserved,
        by: editedObject.reservation?.by ? "" : "TODO: useSession",
      };

      setObjects((prev) => {
        const otherObjects = prev.filter((o) => o.id !== object.id);
        //TODO: set object sizes

        return [...otherObjects, editedObject];
      });
    }
  };

  const onClickOutHandler = async () => {
    transformerRef.current?.nodes([]);
    editingShapeRef.current = null;

    if (chosenEvent) {
      await fetch(`/api/objects?event_id=${chosenEvent.id}`, {
        method: "POST",
        body: JSON.stringify(objects),
        credentials: "include",
      });
    }
  };

  const clearContents = async () => {
    setObjects([]);
    onClickOutHandler();

    toast({
      title: "Content has been cleared",
      description: "The planner contents have been cleared",
    });

    if (chosenEvent) {
      await fetch(`/api/objects?event_id=${chosenEvent.id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }
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
            <Fragment>
              <SeatConfigSelector events={eventsToChoose} setEvent={setEvent} />
            </Fragment>

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
              <></>
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
                  <Transformer
                    ref={transformerRef}
                    flipEnabled={false}
                    onTransformEnd={(e) => {
                      applyEditableChanges(e, editingShapeRef.current);
                    }}
                  />
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

export default (props: IProps) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SeatWrapper {...props} />
    </Suspense>
  );
};
