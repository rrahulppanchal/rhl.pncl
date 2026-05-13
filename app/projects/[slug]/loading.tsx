import { TerminalLoader } from '@/components/terminal-loader';

export default function Loading() {
  return (
    <TerminalLoader
      pageName="PROJECT"
      bootLines={[
        '$ fetch --resource=project',
        '> resolving slug....................OK',
        '> loading case study................OK',
        '> compiling tech stack..............OK',
        '> hydrating content.................OK',
      ]}
    />
  );
}
