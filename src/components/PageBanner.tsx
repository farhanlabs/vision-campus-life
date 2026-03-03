interface PageBannerProps {
  title: string;
  subtitle?: string;
}

const PageBanner = ({ title, subtitle }: PageBannerProps) => (
  <section className="bg-primary text-cream py-12 md:py-16">
    <div className="container">
      <h1 className="font-heading text-3xl md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-cream/70 text-lg">{subtitle}</p>}
    </div>
  </section>
);

export default PageBanner;
