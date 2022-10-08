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
      <title>{title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://meetmeinthemiddle.vercel.app/" />
      <meta property="og:image" content="/meetmeinthemiddlebanner.png" />
      <meta property="twitter:image" content="/meetmeinthemiddlebanner.png" />
      <meta property="og:description" content={description} />
      <meta name="theme-color" content="#EF5D60" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
