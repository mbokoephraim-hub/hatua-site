interface ImportMetaEnv {
  readonly PUBLIC_FORM_PROVIDER?: 'formspree' | 'netlify';
  readonly PUBLIC_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
