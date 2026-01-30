import React from 'react';
import { Field } from '../types.ts';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus, Calendar, Clock, Link as LinkIcon, Globe } from 'lucide-react';

interface SortableItemProps {
  field: Field;
  onRemove: (id: string) => void;
  onUpdate: (id: string, key: keyof Field, value: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ field, onRemove, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2 bg-white p-3 rounded-md border border-gray-200 shadow-sm mb-2 group">
      <div {...attributes} {...listeners} className="mt-3 cursor-grab text-gray-400 hover:text-gray-600">
        <GripVertical size={16} />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div>
           <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Label</label>
           <input 
             value={field.label}
             onChange={(e) => onUpdate(field.id, 'label', e.target.value)}
             className="w-full text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
             placeholder="e.g. Job Title"
           />
        </div>
        <div>
           <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Shortcode</label>
           <input 
             value={field.shortcode}
             onChange={(e) => onUpdate(field.id, 'shortcode', e.target.value)}
             className="w-full text-sm border border-gray-300 rounded px-2 py-1 bg-gray-50 text-gray-900 placeholder-gray-500 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
             placeholder='[field id="your_id_here"]'
           />
        </div>
      </div>
      <button 
        onClick={() => onRemove(field.id)}
        className="mt-3 text-red-400 hover:text-red-600 transition-colors"
        title="Remove Field"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

interface FieldManagerProps {
  fields: Field[];
  setFields: (fields: Field[]) => void;
}

export const FieldManager: React.FC<FieldManagerProps> = ({ fields, setFields }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over?.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  const addField = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setFields([...fields, { id: newId, label: 'New Field', shortcode: '' }]);
  };

  const addMetaField = (label: string, shortcode: string) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setFields([...fields, { id: newId, label, shortcode }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, key: keyof Field, value: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  return (
    <div className="space-y-4">
      
      {/* Quick Add Meta Fields */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Add Meta Fields</div>
         <div className="grid grid-cols-2 gap-2">
            <button onClick={() => addMetaField('Date', '[date]')} className="flex items-center gap-2 text-xs bg-white border border-gray-200 px-2 py-1.5 rounded hover:border-blue-400 hover:text-blue-600 transition-all text-gray-700">
               <Calendar size={12} /> Submission Date
            </button>
            <button onClick={() => addMetaField('Time', '[time]')} className="flex items-center gap-2 text-xs bg-white border border-gray-200 px-2 py-1.5 rounded hover:border-blue-400 hover:text-blue-600 transition-all text-gray-700">
               <Clock size={12} /> Time
            </button>
            <button onClick={() => addMetaField('Page URL', '[page_url]')} className="flex items-center gap-2 text-xs bg-white border border-gray-200 px-2 py-1.5 rounded hover:border-blue-400 hover:text-blue-600 transition-all text-gray-700">
               <LinkIcon size={12} /> Page URL
            </button>
            <button onClick={() => addMetaField('User IP', '[remote_ip]')} className="flex items-center gap-2 text-xs bg-white border border-gray-200 px-2 py-1.5 rounded hover:border-blue-400 hover:text-blue-600 transition-all text-gray-700">
               <Globe size={12} /> Remote IP
            </button>
         </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Form Fields</h3>
        <button 
          onClick={addField}
          className="flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 transition-colors"
        >
          <Plus size={14} /> Add Field
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          <div>
            {fields.map(field => (
              <SortableItem key={field.id} field={field} onRemove={removeField} onUpdate={updateField} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      {fields.length === 0 && (
         <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
            No fields added. Click "Add Field" to start.
         </div>
      )}
    </div>
  );
};