# Google Sheets enrollment setup

The enrollment form sends a server-side request to an Apps Script web app. The Sheet and shared secret are never sent to the browser. The form writes one row with payment status `Pending` before showing the payment QR step.

1. Create a Google Sheet for enrollment requests.
2. In the Sheet, choose **Extensions → Apps Script** and replace the editor contents with `Code.gs` from this folder.
3. In Apps Script, open **Project Settings → Script properties** and add:
   - `SPREADSHEET_ID`: the value between `/d/` and `/edit` in the Sheet URL.
   - `SHARED_SECRET`: a new long random string. Keep it private.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to your account and grant access to **Anyone** so the LMS server can call it. The script checks the shared secret before writing.
5. Copy the deployed web app URL ending in `/exec`.
6. Add these values to `.env.local` (and the production host’s environment variables):

   ```env
   GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/your-deployment-id/exec
   GOOGLE_SHEETS_SHARED_SECRET=the-same-long-random-string
   ```

7. Restart or redeploy the LMS. A successful form submission creates an `Enrollment Requests` tab and appends the application with payment status `Pending`.

Google documents the [web app deployment and `doPost` request format](https://developers.google.com/apps-script/guides/web) and the [`SpreadsheetApp.openById` API](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app).
