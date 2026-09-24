# Deployment
1. Put `frontend/` on GitHub Pages.
2. Deploy each backend directory as its own Render web service.
3. Set the public service URLs in `frontend/app.js` under `CONFIG`.
4. Keep secrets in Render environment variables, never in frontend code.
5. Expect free services to sleep/cold-start. Keep health endpoints tiny.
