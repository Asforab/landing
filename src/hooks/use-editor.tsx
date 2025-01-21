import { createContext, useContext, useReducer } from 'react';
import { DeviceType, EditorElement } from '@/types/editor';

type EditorState = {
  editor: {
    elements: EditorElement[];
    selectedElement: EditorElement | null;
    device: DeviceType;
    previewMode: boolean;
    liveMode: boolean;
  };
};

type EditorAction = {
  type: 'ADD_ELEMENT' | 'DELETE_ELEMENT' | 'CHANGE_CLICKED_ELEMENT' | 'CHANGE_DEVICE' | 'TOGGLE_PREVIEW_MODE' | 'TOGGLE_LIVE_MODE';
  payload?: any;
};

const initialState: EditorState = {
  editor: {
    elements: [],
    selectedElement: null,
    device: 'Desktop',
    previewMode: false,
    liveMode: false,
  },
};

const EditorContext = createContext<{
  editor: EditorState['editor'];
  dispatch: React.Dispatch<EditorAction>;
}>({
  editor: initialState.editor,
  dispatch: () => null,
});

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: [...state.editor.elements, action.payload as EditorElement],
        },
      };
    case 'DELETE_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: state.editor.elements.filter((el) => el.id !== action.payload),
        },
      };
    case 'CHANGE_CLICKED_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload as EditorElement || null,
        },
      };
    case 'CHANGE_DEVICE':
      return {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload as DeviceType,
        },
      };
    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
    case 'TOGGLE_LIVE_MODE':
      return {
        ...state,
        editor: {
          ...state.editor,
          liveMode: !state.editor.liveMode,
        },
      };
    default:
      return state;
  }
};

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ editor: state.editor, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): {
  editor: EditorState['editor'];
  dispatch: React.Dispatch<EditorAction>;
} => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
