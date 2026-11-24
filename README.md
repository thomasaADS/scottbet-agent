# scottbet landing page

עמוד נחיתה ל-scottbet (אתר בלי סוכנים), עם סקשן של שישה משחקי דמו.

## הרצה

```bash
npm install
npm run dev
```

## בנייה

```bash
npm run build
```

## לידים

טופס ההרשמה שולח ל-`/api/leads` (פונקציה ב-`api/leads.js`). כדי לקבל את הלידים מגדירים ב-Vercel משתני סביבה:

- `LEADS_WEBHOOK_URL`: כתובת HTTPS שמקבלת את הליד כ-JSON (CRM, Zapier, Make וכו').
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`: שליחת כל ליד לצ'אט טלגרם.

בלי אף יעד מוגדר הטופס מחזיר שגיאה, כדי שלידים לא ייאבדו בשקט.

## קישור לאתר

`src/site-config.ts` מחזיק את כתובת האתר שאליה עוברים אחרי ההרשמה.

משחקי הדמו פועלים עם מטבעות דמו בלבד, ללא כסף אמיתי.
