import { captureException as sentryCaptureException } from "@sentry/browser";

export default function captureException(error: any) {
  console.error(error);
  sentryCaptureException(error);
}
