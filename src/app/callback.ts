export interface Callback<T> {
    onPreExecute: () => void;
    onSuccess: (result: T) => void;
    onError: (e: any) => void;
    onEmpty?: () => void;
    onPostExecute: () => void;
}
