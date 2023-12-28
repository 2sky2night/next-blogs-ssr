import mitt from "mitt";

export const emitter = mitt<Record<"main-is-scroll-bottom", undefined>>();
