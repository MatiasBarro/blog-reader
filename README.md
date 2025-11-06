# Blog Reader - By Matias Barro

This repository is an experiment to test n8n automation.

## Push notification

Firebase must be set up to enable push notifications, both in frontend application and in the SW.

### Service worker

Service worker code is in `lib/sw.ts`. The script `sw-build.ts` located in scripts folder bundles sw code into a javascript file and places it in public folder using `esbuild`.
Run the following command to execute the script

```
deno run sw-build
```

Note: it will be automatically run when running `deno run build`