import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';

const sections: Record<string, { title: string; content: JSX.Element }> = {

  // ================= TRAINING =================
  training: {
  title: 'Training & Activities',
  content: (
    <div className="space-y-12">

      {/* Top Heading */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-green-700">Training & Activities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A structured training ecosystem designed to transform students into industry-ready professionals.
        </p>
      </div>

      {/* Hero Card */}
      <div className="p-7 rounded-3xl bg-gradient-to-r from-green-100 via-white to-green-50 border shadow-lg">
        Training activities at MEC provide a platform to understand real-world business environments.
        Students gain hands-on experience, practical exposure and develop confidence to face real challenges.
      </div>

      {/* Images */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          "https://images.unsplash.com/photo-1581091012184-5c3c3a7c8d44",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
          "https://images.unsplash.com/photo-1584697964192-4b1c9f3a8b8b",
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
          "https://images.unsplash.com/photo-1552664730-d307ca884978"
        ].map((img,i)=>(
          <img key={i} src={img} className="rounded-xl h-44 object-cover hover:scale-110 transition"/>
        ))}
      </div>

      {/* Modules */}
      <div className="grid md:grid-cols-2 gap-5">
        {[
          "Aptitude & Reasoning Training",
          "Soft Skills & Personality Development",
          "Technical Workshops & Coding",
          "Mock Interviews & Group Discussions",
          "Resume & Email Writing",
          "Industry Expert Sessions"
        ].map((item,i)=>(
          <div key={i} className="p-5 bg-white border rounded-xl shadow hover:shadow-xl transition">
            ✔ {item}
          </div>
        ))}
      </div>

      {/* Extra Content */}
      <div className="grid md:grid-cols-3 gap-5 text-center">
        {[
          ["1000+","Students Trained"],
          ["50+","Workshops Conducted"],
          ["100%","Placement Assistance"]
        ].map((x,i)=>(
          <div key={i} className="p-6 bg-green-50 rounded-xl border">
            <h3 className="text-xl font-bold text-green-700">{x[0]}</h3>
            <p className="text-sm text-gray-600">{x[1]}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="p-6 bg-green-600 text-white rounded-2xl text-center shadow-lg">
        <h3 className="text-lg font-semibold">Training & Placement Office</h3>
        <p className="text-sm mt-2">
          <strong>Mr. Naseem Ahmed</strong><br/>
          📞 +91-8569803605<br/>
          📧 tpo@mecw.ac.in
        </p>
      </div>

    </div>
  )
},

  // ================= JOB FAIR =================
  "job-fair": {
  title: 'Job Fair',
  content: (
    <div className="space-y-12">

      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700">Job Fair</h2>
        <p className="text-gray-600">Connecting students with industry leaders</p>
      </div>

      <div className="p-6 bg-gradient-to-r from-green-100 to-white rounded-2xl shadow">
        Regular job fairs provide direct interaction with top recruiters and industry experts.
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          "https://images.unsplash.com/photo-1552664730-d307ca884978",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
          "https://images.unsplash.com/photo-1581091012184-5c3c3a7c8d44",
          "https://images.unsplash.com/photo-1584697964192-4b1c9f3a8b8b",
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6"
        ].map((img,i)=>(
          <img key={i} src={img} className="rounded-xl h-44 object-cover hover:scale-110"/>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-center">
        {["Live Hiring","Networking","Career Growth"].map((x,i)=>(
          <div key={i} className="p-4 bg-green-50 border rounded-xl">{x}</div>
        ))}
      </div>

    </div>
  )
},

  // ================= CALENDAR =================
  calendar: {
  title: 'Placement Calendar',
  content: (
    <div className="space-y-10">

      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700">Placement Calendar</h2>
        <p className="text-gray-600">Yearly recruitment timeline</p>
      </div>

      <div className="space-y-4">
        {[
          "Jan–Feb: Training Phase",
          "Mar–Apr: Mock Interviews",
          "May–July: Internship Drive",
          "Aug–Sept: Placement Drive",
          "Oct–Dec: Final Hiring"
        ].map((item,i)=>(
          <div key={i} className="p-4 bg-white border rounded-xl shadow hover:shadow-lg">
            📅 {item}
          </div>
        ))}
      </div>

    </div>
  )
},

  // ================= POLICIES =================
  policies: {
  title: 'Placement Policies',
  content: (
    <div className="space-y-10">

      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700">Placement Policies</h2>
      </div>

      <div className="p-6 bg-white border rounded-xl shadow">
        We follow a strict One Student One Job policy ensuring fair opportunities.
      </div>

      <ul className="space-y-3">
        {[
          "Minimum 60% required",
          "Training mandatory",
          "Professional behavior required",
          "Offer letter submission compulsory"
        ].map((x,i)=>(
          <li key={i} className="p-3 bg-green-50 rounded-lg border">✔ {x}</li>
        ))}
      </ul>

    </div>
  )
},

  // ================= RECRUITERS =================
  recruiters: {
  title: 'Our Recruiters',
  content: (
    <div className="space-y-10 text-center">

      <h2 className="text-3xl font-bold text-green-700">Our Recruiters</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {["TCS","Infosys","Wipro","HCL","IBM","Accenture","Capgemini","L&T","Reliance","Tech Mahindra"]
        .map((c,i)=>(
          <div key={i} className="p-5 bg-white border rounded-xl shadow hover:shadow-2xl hover:scale-105">
            {c}
          </div>
        ))}
      </div>

    </div>
  )
},

  // ================= CONFERENCES =================
  conferences: {
  title: 'Conferences & Seminars',
  content: (
    <div className="space-y-10 text-center">

      <h2 className="text-3xl font-bold text-green-700">Conferences & Seminars</h2>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
          "https://images.unsplash.com/photo-1581091012184-5c3c3a7c8d44",
          "https://images.unsplash.com/photo-1584697964192-4b1c9f3a8b8b",
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
          "https://images.unsplash.com/photo-1552664730-d307ca884978"
        ].map((img,i)=>(
          <img key={i} src={img} className="rounded-xl h-44 object-cover hover:scale-110"/>
        ))}
      </div>

    </div>
  )
},
  // ================= ALUMNI =================
  alumni: {
  title: 'Alumni Testimonials',
  content: (
    <div className="space-y-10">

      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-700">Alumni Testimonials</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          "Placed at TCS",
          "Infosys Developer",
          "L&T Engineer",
          "Wipro Developer",
          "Reliance Manager",
          "Accenture Consultant",
          "IBM Engineer",
          "Capgemini Lead",
          "Startup Founder",
          "Govt Engineer"
        ].map((a,i)=>(
          <div key={i} className="p-6 bg-white border rounded-xl shadow hover:shadow-2xl">
            “{a} - MEC Alumni”
          </div>
        ))}
      </div>

    </div>
  )
}

};

const PlacementsPage = () => {
  const { section } = useParams();
  const current = sections[section || 'training'] || sections.training;

  return (
    <Layout>
      <PageBanner title={current.title} subtitle="Placements" />
      <div className="container py-12 max-w-5xl mx-auto">
        {current.content}
      </div>
    </Layout>
  );
};

export default PlacementsPage;