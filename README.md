# found some errors on uploadThing...

I Tried with the official Document... But it didn't worked.

So,
the below is Original code from docs

<code>
        import {
            generateUploadButton,
            generateUploadDropzone,
        } from "@uploadthing/react";
        import type { OurFileRouter } from "~/app/api/uploadthing/core";
 
        export const UploadButton = generateUploadButton<OurFileRouter>();
        export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
</code>

Modified code...

<code>
        import {
            generateReactHelpers
        } from "@uploadthing/react/hooks"; 
        import type { OurFileRouter } from "@/app/api/uploadthing/core";
   
        export const UploadButton = generateReactHelpers<OurFileRouter>();
</code>  

Also

<code>
        import {
        generateReactHelpers
        } from "@uploadthing/react/hooks";
</code>

"/hooks" was added to remove errors

Original code;

<code>
        import { createRouteHandler } from "uploadthing/next";
        import { ourFileRouter } from "./core";

        // Export routes for Next App Router
        export const { GET, POST } = createRouteHandler({
          router: ourFileRouter,
          config: { ... },
        });
</code>

Modified code...

<code>
        import { createNextRouteHandler } from "uploadthing/next";
        import { ourFileRouter } from "./core";
    
        // Export routes for Next App Router
        export const { GET, POST } = createNextRouteHandler({
          router: ourFileRouter,
          // config: { ... },
        });
</code>

Original code...

<code>
        import { createUploadthing, type FileRouter } from "uploadthing/next";
        import { UploadThingError } from "uploadthing/server";

        const f = createUploadthing();

        const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

        // FileRouter for your app, can contain multiple FileRoutes
        export const ourFileRouter = {
          // Define as many FileRoutes as you like, each with a unique routeSlug
          imageUploader: f({ image: { maxFileSize: "4MB" } })
            // Set permissions and file types for this FileRoute
            .middleware(async ({ req }) => {
              // This code runs on your server before upload
              const user = await auth(req);

              // If you throw, the user will not be able to upload
              if (!user) throw new UploadThingError("Unauthorized");

              // Whatever is returned here is accessible in onUploadComplete as `metadata`
              return { userId: user.id };
            })
            .onUploadComplete(async ({ metadata, file }) => {
              // This code RUNS ON YOUR SERVER after upload
              console.log("Upload complete for userId:", metadata.userId);

              console.log("file url", file.url);

              // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
              return { uploadedBy: metadata.userId };
            }),
        } satisfies FileRouter;

        export type OurFileRouter = typeof ourFileRouter;
</code>

modified code;

<code>
        import { createUploadthing, type FileRouter } from "uploadthing/next";
        // import { UploadThingError } from "uploadthing/next";

        const f = createUploadthing();

        const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

        // FileRouter for your app, can contain multiple FileRoutes
        export const ourFileRouter = {
          // Define as many FileRoutes as you like, each with a unique routeSlug
          imageUploader: f({ image: { maxFileSize: "4MB" } })
            // Set permissions and file types for this FileRoute
            .middleware(async ({ req }) => {
              // This code runs on your server before upload
              const user = await auth(req);

              // If you throw, the user will not be able to upload
              if (!user) throw new Error("Unauthorized");

              // Whatever is returned here is accessible in onUploadComplete as `metadata`
              return { userId: user.id };
            })
            .onUploadComplete(async ({ metadata, file }) => {
              // This code RUNS ON YOUR SERVER after upload
              console.log("Upload complete for userId:", metadata.userId);

              console.log("file url", file.url);

              // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
              // return { uploadedBy: metadata.userId };
            }),
        } satisfies FileRouter;

        export type OurFileRouter = typeof ourFileRouter;
</code>

So, follwed with this changes... to bring out functionality... I used these above codes as template and modified little...

Error 2:

In AccountProfile.tsx file...

At line 83...

<code>
        if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }
</code>

here... ".fileUrl" function is Deprecated, So to achieve the function we use ".url" as shown below...

<code>
      if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }
<code>