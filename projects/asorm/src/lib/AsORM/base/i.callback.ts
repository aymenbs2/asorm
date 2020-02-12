export interface ICallback {
  onPreExecute?: () => void;
  onSuccess: (result) => void;
  onError: (e: any) => void;
  onEmpty?: () => void;
  onPostExecute?: () => void;
}
