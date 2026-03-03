interface PageBannerProps {
  title: string;
  subtitle?: string;
}

const PageBanner = ({ title, subtitle }: PageBannerProps) => (
  <section className="bg-primary text-primary-foreground py-14 md:py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 -translate-y-1/2 translate-x-1/2" />
    <div className="container relative z-10">
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-2">{title}</h1>
      {subtitle && <p className="text-primary-foreground/55 text-lg">{subtitle}</p>}
      <div className="w-12 h-0.5 bg-accent rounded-full mt-4" />
    </div>
  </section>
);

export default PageBanner;
