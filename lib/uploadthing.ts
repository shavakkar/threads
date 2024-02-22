// import { generateReactHelpers } from "@uploadthing/react/hooks";
// import type { ourFileReader } from "@/app/api/uploadthing/core";

// export const { useUploadThing, uploadFiles } = generateReactHelpers<ourFileReader>();

import {
    generateReactHelpers
  } from "@uploadthing/react/hooks";
   
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
   
  export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

// import { generateComponents } from "@uploadthing/react";
 
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
 
// export const { UploadButton, UploadDropzone } =
//   generateComponents<OurFileRouter>();