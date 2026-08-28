import { rmSync } from "node:fs";

// `next typegen` writes production types but does not remove route declarations
// left by `next dev`; including both can collapse App Router generics to never.
rmSync(".next/dev/types", { recursive: true, force: true });
