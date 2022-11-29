import Head from "next/head";

export default function MetaTags({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://meetmeinthemiddle.vercel.app/" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/meetmeinthemiddlebanner.png" />
      <meta property="twitter:image" content="/meetmeinthemiddlebanner.png" />
      <meta name="theme-color" content="#EF5D60" />
      <meta name="twitter:card" content="summary_large_image" />

      <meta
        name="google-site-verification"
        content="nr7ZnuU4iupK8E4luXEplMZTIvPnEHVqEva1MVRVa8k"
      />
    </Head>
  );
}
