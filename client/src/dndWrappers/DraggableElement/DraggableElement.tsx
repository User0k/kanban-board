import { Draggable } from '@hello-pangea/dnd';
import { ReactElement } from 'react';

interface IDragaableProps {
  id: string;
  index: number;
  className?: string;
  children: ReactElement | ReactElement[] | false;
}

function DraggableElement({ id, index, className, children }: IDragaableProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={className}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {children}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableElement;
