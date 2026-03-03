import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';

const FeePayment = () => (
  <Layout>
    <PageBanner title="Fee Payment" subtitle="Online Payment Portal" />
    <div className="container py-12 max-w-lg mx-auto text-center">
      <div className="bg-secondary rounded-lg p-8">
        <h2 className="font-heading text-2xl text-primary mb-4">Pay Your Fees Online</h2>
        <p className="text-muted-foreground mb-6">For fee payment, please visit the college accounts section or contact the administration office for online payment details.</p>
        <p className="font-semibold text-primary">📞 +91-9588356609</p>
        <p className="text-sm text-muted-foreground mt-2">📧 accounts@mecw.ac.in</p>
      </div>
    </div>
  </Layout>
);

export default FeePayment;
