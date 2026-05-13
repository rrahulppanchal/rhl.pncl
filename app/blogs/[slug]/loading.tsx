import { TerminalLoader } from '@/components/terminal-loader';

export default function Loading() {
  return (
    <TerminalLoader
      pageName="BLOG POST"
      bootLines={[
        '$ fetch --resource=blog',
        '> resolving slug....................OK',
        '> loading markdown..................OK',
        '> parsing syntax tree...............OK',
        '> hydrating content.................OK',
      ]}
    />
  );
}
