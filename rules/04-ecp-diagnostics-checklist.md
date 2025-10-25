# Supabase/Next Diagnostics Checklist (Local Dev)

1) UI Wiring
   - Add `console.log('[click] schools')` before the fetcher.
   - Verify a Network entry appears on click.

2) Server Probe
   - Add `/api/db-check`:
     - HEAD `${NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`.
     - If pass → SELECT `schools` (head:true, count:exact).
     - Return `{ ok, kind: 'connectivity' | 'rls' | 'env', ... }`.

3) Quick Workaround (keeps shipping)
   - Add `/api/schools|groups|students` thin proxies.
   - Toggle `USE_DIRECT_SUPABASE=false` in UI and fetch `/api/...`.

4) CORS & Browser
   - Supabase → Project Settings → API → Allowed Origins:
     - `http://localhost:3000` (+ your LAN URL if used).
   - Test in private window with extensions off.

5) Node-Only Failures (undici)
   - Temporarily disable VPN/AV HTTPS interception.
   - If behind proxy, set `HTTPS_PROXY`/`HTTP_PROXY`.
   - Try alternate DNS (1.1.1.1 / 8.8.8.8).
   - Sanity test: `node -e "require('https').get('https://<host>',r=>console.log(r.statusCode)).on('error',e=>console.error(e.message))"`.
