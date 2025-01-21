import React from 'react';
import { useEditor } from '@/hooks/use-editor';
import { EditorElement } from '@/types/editor';

interface EditorRecursiveProps {
  element: EditorElement;
}

const EditorRecursive: React.FC<EditorRecursiveProps> = ({ element }) => {
  const { editor, dispatch } = useEditor();
  const isSelected = editor.selectedElement?.id === element.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editor.previewMode && !editor.liveMode) {
      dispatch({
        type: 'CHANGE_CLICKED_ELEMENT',
        payload: element,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative p-4 border-2 min-h-[100px] ${
        isSelected ? 'border-blue-500' : 'border-dashed border-gray-300'
      }`}
      style={{
        backgroundColor: element.styles?.backgroundColor || 'white',
        color: element.styles?.color || 'black',
      }}
    >
      <div className="absolute top-0 left-0 bg-gray-100 px-2 text-xs">
        {element.type}
      </div>
      {element.content || 'Empty Element'}
      {element.children?.map((child) => (
        <EditorRecursive key={child.id} element={child} />
      ))}
    </div>
  );
};

export default EditorRecursive;
