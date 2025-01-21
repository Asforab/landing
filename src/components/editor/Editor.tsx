'use client';

import React from 'react';
import { EyeOff, Plus, Smartphone, Monitor, Tablet } from 'lucide-react';
import EditorRecursive from './EditorRecursive';
import { useEditor } from '@/hooks/use-editor';

const Editor = () => {
  const { editor, dispatch } = useEditor();

  const handleClickElement = () => {
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: null,
    });
  };

  const handlePreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
  };

  const handleAddElement = () => {
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        id: Date.now().toString(),
        type: 'Container',
        content: 'New Element',
        children: [],
        styles: {},
      },
    });
  };

  const handleDeviceChange = (device: 'Desktop' | 'Tablet' | 'Mobile') => {
    dispatch({
      type: 'CHANGE_DEVICE',
      payload: device,
    });
  };

  return (
    <div className="flex h-screen">
      {/* Editor Area */}
      <div
        className={`flex-1 bg-gray-100 overflow-y-auto ${
          editor.device === 'Tablet' ? 'max-w-[768px] mx-auto' : 
          editor.device === 'Mobile' ? 'max-w-[390px] mx-auto' : ''
        }`}
        onClick={handleClickElement}
      >
        {editor.previewMode && (
          <button
            className="fixed top-4 left-4 p-2 bg-white rounded-md shadow-md"
            onClick={handlePreview}
          >
            <EyeOff className="w-5 h-5" />
          </button>
        )}

        <div className="p-4">
          {editor.elements.map((element) => (
            <EditorRecursive key={element.id} element={element} />
          ))}
        </div>
      </div>

      {/* Toolbar */}
      {!editor.previewMode && (
        <div className="w-64 bg-white border-l p-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <button
                className={`p-2 ${
                  editor.device === 'Desktop' ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleDeviceChange('Desktop')}
              >
                <Monitor className="w-5 h-5" />
              </button>
              <button
                className={`p-2 ${
                  editor.device === 'Tablet' ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleDeviceChange('Tablet')}
              >
                <Tablet className="w-5 h-5" />
              </button>
              <button
                className={`p-2 ${
                  editor.device === 'Mobile' ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleDeviceChange('Mobile')}
              >
                <Smartphone className="w-5 h-5" />
              </button>
            </div>

            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md flex items-center justify-center gap-2"
              onClick={handleAddElement}
            >
              <Plus className="w-4 h-4" />
              Add Element
            </button>

            <button
              className="w-full p-2 bg-gray-100 rounded-md"
              onClick={handlePreview}
            >
              Preview Mode
            </button>

            {editor.selectedElement && (
              <div className="mt-4">
                <h3 className="font-medium">Selected Element</h3>
                <p className="text-sm text-gray-500">
                  Type: {editor.selectedElement.type}
                </p>
                <button
                  className="mt-2 w-full p-2 bg-red-100 text-red-600 rounded-md"
                  onClick={() =>
                    dispatch({
                      type: 'DELETE_ELEMENT',
                      payload: editor.selectedElement.id,
                    })
                  }
                >
                  Delete Element
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
