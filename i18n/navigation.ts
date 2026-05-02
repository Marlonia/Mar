import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers de Next.js Link/redirect/usePathname/useRouter con conocimiento de locale
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
