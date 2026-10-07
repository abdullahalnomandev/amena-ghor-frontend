import type { OrderInput } from "@/types";
// Replace body with fetch("/api/orders") later; UI stays unchanged.
export async function submitOrder(o:OrderInput){await new Promise(r=>setTimeout(r,600));console.info("order",o);return {ok:true}}
