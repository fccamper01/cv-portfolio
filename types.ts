
export interface PortfolioItemData {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  isExternal?: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon?: React.ReactNode; // Optional: for SVG icons
}

// Icon components for social links
export interface IconProps {
  className?: string;
}
