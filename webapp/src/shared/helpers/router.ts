import { useParams } from "react-router-dom";

export function useRequireParams(name: string): string {
  const value = useParams()[name];

  if (value === undefined) {
    throw new Error(`Отсутствует параметр маршрута ${name}`);
  }

  return value;
}
