import { defaultSdk, sdkStorageKey, sdks } from "@/lib/sdks";

/**
 * Sets `<html data-sdk>` before the first paint, so a page opens on the reader's SDK with no flash
 * — as the theme script does for `.dark`. An SDK's own page (/docs/sdks/<id>/…) decides, then
 * `?sdk=<id>` (a shared link), then the stored choice; the first two are remembered. Runs inline in
 * the root layout's head (the CSP allows inline scripts).
 */
export const sdkScript = `(function(){try{var ids=${JSON.stringify(
  sdks.map((sdk) => sdk.id),
)};var ok=function(v){return ids.indexOf(v)>-1};var k=${JSON.stringify(
  sdkStorageKey,
)};var m=/^\\/docs\\/sdks\\/([^/]+)/.exec(location.pathname);var p=m&&ok(m[1])?m[1]:null;var q=new URLSearchParams(location.search).get("sdk");q=ok(q)?q:null;var s=null;try{s=localStorage.getItem(k)}catch(e){}var v=p||q||(ok(s)?s:${JSON.stringify(
  defaultSdk,
)});if(p||q){try{localStorage.setItem(k,v)}catch(e){}}document.documentElement.dataset.sdk=v}catch(e){}})();`;
