import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';

const sections: Record<string, { title: string; content: JSX.Element }> = {
  'about-mec': {
    title: 'About MEC',
    content: (
      <div className="space-y-4">
        <p>Mewat Engineering College Wakf (MECW) is a premier engineering institution located in Palla, District Nuh, Haryana. Approved by AICTE, the college is committed to providing quality technical education to students from all sections of society.</p>
        <p>The institution offers undergraduate programs in various branches of engineering and technology, equipped with modern laboratories, well-stocked library, and experienced faculty members dedicated to nurturing future engineers.</p>
        <p>MECW focuses on holistic development of students through academic excellence, practical training, industry interaction, and co-curricular activities, preparing them to meet the challenges of the modern world.</p>
      </div>
    ),
  },
  'vision': {
    title: 'Our Vision',
    content: <p className="text-lg leading-relaxed">To be a premier institution of engineering education and research, fostering innovation, ethical values, and leadership to serve society and the nation with distinction. We aspire to create an environment where every student can realize their full potential and contribute meaningfully to technological advancement.</p>,
  },
  'mission': {
    title: 'Our Mission',
    content: (
      <ul className="space-y-3 list-disc list-inside">
        <li>To provide quality technical education accessible to all sections of society</li>
        <li>To develop competent engineers with strong ethical foundation</li>
        <li>To promote research, innovation, and entrepreneurship</li>
        <li>To foster industry-academia collaboration</li>
        <li>To contribute to the socio-economic development of the region</li>
        <li>To inculcate leadership qualities and social responsibility among students</li>
      </ul>
    ),
  },
  'core-values': {
    title: 'Core Values',
    content: (
      <div className="grid md:grid-cols-2 gap-6">
        {['Excellence in Education', 'Integrity & Ethics', 'Innovation & Creativity', 'Inclusivity & Diversity', 'Social Responsibility', 'Continuous Improvement'].map(v => (
          <div key={v} className="p-4 bg-secondary rounded-lg"><h3 className="font-heading text-lg text-primary mb-2">{v}</h3><p className="text-sm text-muted-foreground">We are committed to upholding {v.toLowerCase()} in all aspects of our institution.</p></div>
        ))}
      </div>
    ),
  },
  'administrator-message': {
    title: "Administrator's Message",
    content: <div><p className="text-lg italic text-muted-foreground mb-4">"Education is the most powerful weapon which you can use to change the world."</p><p>It gives me immense pleasure to welcome you to Mewat Engineering College Wakf. Our institution stands as a beacon of hope and opportunity for aspiring engineers. We are committed to providing an environment that nurtures talent and builds character.</p></div>,
  },
  'ceo-message': {
    title: "CEO's Message",
    content: <div><p className="text-lg italic text-muted-foreground mb-4">"Building tomorrow's leaders through quality education."</p><p>At MECW, we believe in the transformative power of education. Our focus is on creating well-rounded engineers who are not just technically proficient but also socially conscious. We invite you to be part of our growing family.</p></div>,
  },
  'director-message': {
    title: "Director's Message",
    content: <div><p className="text-lg italic text-muted-foreground mb-4">"Innovation distinguishes between a leader and a follower."</p><p>Welcome to Mewat Engineering College Wakf. As Director, I am proud of our institution's commitment to academic excellence and holistic student development. Our dedicated faculty and state-of-the-art facilities ensure that our students receive the best possible education and training.</p></div>,
  },
  'achievements': {
    title: 'Achievements',
    content: (
      <div className="space-y-4">
        <p>Mewat Engineering College Wakf has achieved several milestones since its establishment:</p>
        <ul className="space-y-2 list-disc list-inside">
          <li>AICTE Approved Institution</li>
          <li>Consistently improving placement records</li>
          <li>Students placed in top MNCs</li>
          <li>Active research and paper publications</li>
          <li>Strong industry collaboration</li>
          <li>Regular conferences and technical workshops</li>
        </ul>
      </div>
    ),
  },
};

const AboutPage = () => {
  const { section } = useParams();
  const current = sections[section || 'about-mec'] || sections['about-mec'];
  return (
    <Layout>
      <PageBanner title={current.title} subtitle="About Us" />
      <div className="container py-12 max-w-4xl">{current.content}</div>
    </Layout>
  );
};

export default AboutPage;
