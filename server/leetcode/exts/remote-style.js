export async function RemoteStyleExtension(generator) {
  const urls = generator.config.sheets;

  const externals = [];
  if (Array.isArray(urls)) {
    externals.push(
      ...urls.map(async (url) => {
        const cached = await generator.cache?.match(url);
        if (cached) {
          return cached.text();
        }

        const data = await fetch(url)
          .then(async (res) =>
            res.ok ? `/* ${url} */ ${await res.text()}` : `/* ${url} ${await res.text()} */`,
          )
          .catch((err) => `/* ${url} ${err} */`);

        generator.cache?.put(url, new Response(data));
        return data;
      }),
    );
  }

  return async function RemoteStyle(generator, data, body, styles) {
    for (const css of externals) {
      styles.push(await css);
    }
  };
}
