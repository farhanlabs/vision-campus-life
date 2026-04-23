import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageBanner from '@/components/PageBanner';
import { subscribeToData } from '@/lib/firebase';

const ExaminationPage = () => {
  const { section } = useParams();
  const [examChair, setExamChair] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);

  // 🔥 STATIC FRONTEND DATA ONLY
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

      <div className="container py-12 max-w-5xl">

        {/* ✅ PAPERS SECTION (100% UNCHANGED) */}
        {section === 'papers' ? (
          papers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-cream">
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Branch</th>
                    <th className="p-3 text-left">Semester</th>
                    <th className="p-3 text-left">Year</th>
                    <th className="p-3 text-left">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map((p, i) => (
                    <tr key={p.id} className={i % 2 === 0 ? 'bg-secondary' : 'bg-card'}>
                      <td className="p-3 text-sm">{p.subject}</td>
                      <td className="p-3 text-sm">{p.branch}</td>
                      <td className="p-3 text-sm">{p.semester}</td>
                      <td className="p-3 text-sm">{p.year}</td>
                      <td className="p-3">
                        <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-gold hover:underline">
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
            {/* 🔥 FRONTEND STATIC DESIGN (NEW) */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 shadow-xl mb-12 text-center hover:shadow-2xl transition">
              
              <div className="w-28 h-28 rounded-full mx-auto mb-4 bg-gold/20 flex items-center justify-center text-3xl text-gold">
                {staticExamData.controller.name[0]}
              </div>

              <h2 className="text-2xl font-bold text-primary">
                {staticExamData.controller.name}
              </h2>
              <p className="text-muted-foreground">
                {staticExamData.controller.designation}
              </p>
              <p className="text-sm mb-4">
                {staticExamData.controller.college}
              </p>

              <p className="italic text-sm mb-4">
                "{staticExamData.controller.about}"
              </p>

              <div className="bg-white/60 p-4 rounded-lg mb-4">
                {staticExamData.controller.message}
              </div>

              <p className="text-sm">📞 {staticExamData.controller.phone}</p>
              <p className="text-sm">📧 {staticExamData.controller.email}</p>
            </div>

            {/* MEMBERS */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {staticExamData.members.map((e, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 text-center shadow hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gold/20 flex items-center justify-center text-gold">
                    {e.name[0]}
                  </div>
                  <h3 className="font-semibold text-primary">{e.name}</h3>
                  <p className="text-sm text-muted-foreground">{e.designation}</p>
                  <p className="text-xs">{e.college}</p>
                  <p className="text-xs">📞 {e.phone}</p>
                  <p className="text-xs">📧 {e.email}</p>
                </div>
              ))}
            </div>

            {/* ✅ BACKEND DATA (UNCHANGED) */}
            {examChair.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {examChair.map(e => (
                  <div key={e.id} className="bg-secondary rounded-lg p-4 text-center">
                    {e.imageUrl ? (
                      <img src={e.imageUrl} alt={e.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gold/20 flex items-center justify-center font-heading text-2xl text-gold">
                        {e.name?.[0]}
                      </div>
                    )}
                    <h3 className="font-semibold text-primary">{e.name}</h3>
                    <p className="text-sm text-muted-foreground">{e.designation}</p>
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