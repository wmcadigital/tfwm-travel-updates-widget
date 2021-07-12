export type CreateContextProps<InitialStateProps, ActionProps> = [
  InitialStateProps,
  React.Dispatch<ActionProps>
];

export interface ContextProviderProps {
  children: React.ReactNode;
}
