export interface EditorElement {
  id: string;
  type: string;
  content?: string;
  children?: EditorElement[];
  styles?: {
    backgroundColor?: string;
    color?: string;
    [key: string]: string | undefined;
  };
}

export type DeviceType = 'Desktop' | 'Tablet' | 'Mobile';
