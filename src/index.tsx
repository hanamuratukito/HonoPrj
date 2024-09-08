import { Hono } from "hono";
import { renderToString } from "react-dom/server";

const app = new Hono();

interface SchoolItem {
  school_code: string;
  school_name: string;
  school_locate_at: string;
  school_type_code: string;
  school_type: string;
  zip_code: string;
  pref_code: string;
  pref: string;
  school_status_code: string;
  school_status: string;
  school_founder_code: string;
  school_founder: string;
  obsolete_school_code: string;
  school_code_unique: string;
  updated_at: string;
}

interface School {
  schools: {
    data: SchoolItem[];
    first_page_url: string;
    next_page_url: string;
    last_page_url: string;
    path: string;
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
  };
}

export interface ResItem {
  data: SchoolItem[];
  current_page: number;
  total: number;
  per_page: number;
}

app.get("/api/getSchool", async (c) => {
  const queryParams = c.req.query() as Record<string, string>;
  const queryString = new URLSearchParams(queryParams).toString();

  const res = await fetch(
    `https://api.edu-data.jp/api/v1/school?${queryString}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer 329|u61XszkVYP8xiqjFXUCG6xRJNC5v22S0syOypgv2",
        Accept: "application/json",
      },
    }
  );

  const data = (await res.json()) as School;

  return c.json({
    data: data.schools.data,
    current_page: data.schools.current_page,
    total: data.schools.total,
    per_page: data.schools.per_page,
  } as ResItem);
});

app.get("*", (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          {import.meta.env.PROD ? (
            <>
              <link href="/src/style.css" rel="stylesheet"></link>
              {/* <script type="module" src="/src/client.js"></script> */}
            </>
          ) : (
            <>
              <link href="/public/static/style.css" rel="stylesheet"></link>
              {/* <script type="module" src="/src/client.tsx"></script> */}
            </>
          )}
        </head>
        <body>
          <div
            id="root"
            className="md:mx-auto md:px-4 md:max-w-[1152px] pb-[calc(151px_+_env(safe-area-inset-bottom))]"
          ></div>
        </body>
      </html>
    )
  );
});

export default app;
