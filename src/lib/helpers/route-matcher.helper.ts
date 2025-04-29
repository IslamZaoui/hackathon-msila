import { NextRequest } from "next/server";

export default function createRouteMatcher(paths: string[]) {
  return (request: NextRequest): boolean => {
    for (const path of paths) {
      const escapedPath = path
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace("\\*", ".*");
      const regex = new RegExp(`^${escapedPath}`);
      if (regex.test(request.url)) {
        return true;
      }
    }
    return false;
  };
}
