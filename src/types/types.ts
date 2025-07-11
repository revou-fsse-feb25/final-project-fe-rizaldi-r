export interface ItfModuleItem {
  id: string;
  label: string;
  completed: boolean;
  type?: "assignment" | "quiz" ;
}

export interface ItfSection {
  id: string;
  title: string;
  modules: ItfModuleItem[];
  isExpanded?: boolean;
}