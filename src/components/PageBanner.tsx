interface PageBannerProps {
  title: string;
  subtitle?: string;
}

const PageBanner = ({ title, subtitle }: PageBannerProps) => (
  <section className="bg-primary text-cream py-14 md:py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/30 to-transparent" />
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 -translate-y-1/2 translate-x-1/2" />
    <div className="container relative z-10">
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-2">{title}</h1>
      {subtitle && <p className="text-cream/60 text-lg">{subtitle}</p>}
      <div className="section-divider mt-4" />
    </div>
  </section>
);

export default PageBanner;
