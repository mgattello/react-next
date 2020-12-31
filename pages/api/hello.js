// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * Do Not Fetch an API Route from getStaticProps or getStaticPaths.
 */

export default function handler (req, res) {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
