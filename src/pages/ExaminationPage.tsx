import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';

const ExaminationPage = () => {
  const { section } = useParams();
  const [examChair, setExamChair] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);

  // ✅ YOUR ORIGINAL DATA (UNCHANGED)
  const staticExamData = {
    controller: {
      name: "Mr. Nazim Ali Khan",
      designation: "Controller of Examination",
      college: "Mewat Engineering College",
      phone: "+91-9013461834",
      email: "nakhan@mecw.ac.in",
      imageUrl: "",
      about: "The Controller of Examination ensures smooth and fair conduct of exams while maintaining transparency and discipline.",
      message: "We are committed to maintaining integrity and excellence in the examination system for all students."
    },
    members: [
      {
        name: "Mr. Adil Zaidi",
        designation: "Deputy Controller",
        college: "Mewat Engineering College",
        phone: "+91-8826319440",
        email: "er.adilzaidi@gmail.com",
        imageUrl: ""
      },
      {
        name: "Mr. Mohammad Nafees",
        designation: "Examination Clerk",
        college: "Mewat Engineering College",
        phone: "+91-801012475",
        email: "mecwexam@gmail.com",
        imageUrl: ""
      }
    ]
  };

  useEffect(() => {
    const unsubs = [
      subscribeToData('examChair', setExamChair),
      subscribeToData('oldPapers', setPapers),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  return (
    <Layout>
      <PageBanner 
        title={section === 'papers' ? 'Old Question Papers' : 'Examination Cell'} 
        subtitle="Examination" 
      />

      <div className="container py-12 max-w-6xl">

        {/* ================= PAPERS ================= */}
        {section === 'papers' ? (
          papers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-cream">
                    <th className="p-3">Subject</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">Semester</th>
                    <th className="p-3">Year</th>
                    <th className="p-3">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map((p, i) => (
                    <tr key={p.id} className={i % 2 === 0 ? 'bg-secondary' : 'bg-card'}>
                      <td className="p-3">{p.subject}</td>
                      <td className="p-3">{p.branch}</td>
                      <td className="p-3">{p.semester}</td>
                      <td className="p-3">{p.year}</td>
                      <td className="p-3">
                        <a href={p.link} target="_blank" className="text-gold hover:underline">
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Old question papers will appear once added by admin.
            </p>
          )
        ) : (
          <>
            {/* 🔴 HERO SECTION */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-10 rounded-3xl mb-12 text-center shadow-xl">
              <h1 className="text-3xl font-bold mb-3">Examination Cell</h1>
              <p className="text-sm max-w-2xl mx-auto">
                Ensuring transparency, fairness, and efficiency in examinations with a strong commitment to academic excellence.
              </p>

              {/* STATS */}
              <div className="grid md:grid-cols-4 gap-4 mt-8">
                {["100% Transparency","On-Time Results","24/7 Support","Zero Error"].map((s,i)=>(
                  <div key={i} className="bg-white/10 p-4 rounded-xl">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* 👤 CONTROLLER */}
            <div className="bg-white p-8 rounded-2xl shadow mb-12 text-center border border-red-100">
              <div className="w-28 h-28 rounded-full mx-auto bg-red-100 flex items-center justify-center text-red-600 text-3xl font-bold mb-4">
                {staticExamData.controller.name[0]}
              </div>

              <h2 className="text-xl font-bold text-red-600">
                {staticExamData.controller.name}
              </h2>
              <p>{staticExamData.controller.designation}</p>
              <p className="text-sm mb-3">{staticExamData.controller.college}</p>

              <p className="italic text-sm mb-3">
                "{staticExamData.controller.about}"
              </p>

              <div className="bg-red-50 p-3 rounded-lg mb-3">
                {staticExamData.controller.message}
              </div>

              <p>📞 {staticExamData.controller.phone}</p>
              <p>📧 {staticExamData.controller.email}</p>
            </div>

            {/* 👥 MEMBERS */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {staticExamData.members.map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow text-center border border-red-100 hover:shadow-xl transition">
                  <div className="w-20 h-20 rounded-full mx-auto bg-red-100 flex items-center justify-center text-red-600 font-bold mb-3">
                    {m.name[0]}
                  </div>
                  <h3 className="text-red-600 font-semibold">{m.name}</h3>
                  <p>{m.designation}</p>
                  <p className="text-xs">{m.college}</p>
                  <p className="text-xs">📞 {m.phone}</p>
                  <p className="text-xs">📧 {m.email}</p>
                </div>
              ))}
            </div>

            {/* ✨ EXTRA SECTION */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                "Fair Evaluation",
                "Timely Results",
                "Student Support"
              ].map((item,i)=>(
                <div key={i} className="bg-white p-6 rounded-xl shadow border border-red-100 text-center">
                  <h4 className="text-red-600 font-semibold">{item}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Dedicated system ensuring academic quality and student satisfaction.
                  </p>
                </div>
              ))}
            </div>

            {/* ⚡ BACKEND (UNCHANGED) */}
            {examChair.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {examChair.map(e => (
                  <div key={e.id} className="bg-secondary rounded-lg p-4 text-center">
                    {e.imageUrl ? (
                      <img src={e.imageUrl} className="w-20 h-20 rounded-full mx-auto mb-3" />
                    ) : (
                      <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                        {e.name?.[0]}
                      </div>
                    )}
                    <h3 className="text-primary font-semibold">{e.name}</h3>
                    <p className="text-sm">{e.designation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Exam chair information will appear once added by admin.
              </p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ExaminationPage;