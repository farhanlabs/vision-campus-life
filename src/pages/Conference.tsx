import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


const Conference: React.FC = () => {
  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f8" }}>

      {/* ✅ Imported Navbar */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          4th ONLINE INTERNATIONAL CONFERENCE
        </h1>

        <h2 style={subtitleStyle}>
          On Recent Trends in Renewable Energy and Advancement in Engineering & Technology (RTREAET-2025)
        </h2>

        {/* 📄 MULTIPLE PDF LINKS */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <a href="/RTREAET-2025.pdf" target="_blank" style={pdfLink}>📄 RTREAET 2025</a>
          <a href="/RTREAET-2023.pdf" target="_blank" style={pdfLink}>📄 RTREAET 2023</a>
          <a href="/RTREAET-2021.pdf" target="_blank" style={pdfLink}>📄 RTREAET 2021</a>
          <a href="/RTREAET-2020.pdf" target="_blank" style={pdfLink}>📄 RTREAET 2020</a>
        </div>

        {/* SAME CONTENT */}
        <Section title="ABOUT RTREAT-2025">
          Recent Trends in Renewable Energy and Advancement in Engineering& Technology (RTREAT-2025) aims to bring together leading academicians, scientists, researchers, research scholars, and industry personnel to exchange and share their experiences and research results about all aspects of renewable energy sources, engineering and technology. It also provides the premier interdisciplinary forum for scientists, engineers, and practitioners to present their latest research results, ideas, developments, and applications in the area of science and technology.

          <br /><br />

          RTREAET-2025 plays a significant role in inspiring breakthrough innovations from fundamentals to technological challenges and applications that are shaping the era of Industry 4.0. The conference will provide a unique platform to the participants to evolve their ideas and cogitation as they listen to a well-crafted panel discussion along with thought-provoking speaker sessions.
        </Section>

        <Section title="OBJECTIVES">
          • Bring together professionals from around the globe with the purpose of encouraging innovative ideas and sharing diversified knowledge and international experiences.<br />
          • Provide indispensable exposure to the audience promoting the highest utilization of research knowledge.<br />
          • Provide a key platform for Renowned Academicians, Research Scholars, and Industry Experts to disseminate knowledge and present ongoing research through scholarly publications.<br />
          • Facilitate career development of all participants and provide opportunities to network and build connections with professionals with shared interests.
        </Section>

        <Section title="CALL FOR PAPERS">
          Original and unpublished research papers are invited related to the following sub-themes of the conference, but not limited to:
          <br /><br /><b>Renewable Energy</b><br />
          • Biomass Conversion<br />
          • Photovoltaic Technology Conversion<br />
          • Solar Thermal Applications<br />
          • Wind Energy Technology<br />
          • Desalination<br />
          • Solar and Low Energy Architecture<br />
          • Climatology and Meteorology<br />
          • Geothermal Technology<br />
          • Wave, Tide and Ocean Thermal Energies<br />
          • Hydro Power<br />
          • Hydrogen Production Technology and Fuel Cells<br />
          • Socio-economic and Policy Issues
        </Section>

        <Section title="IMPORTANT DATES">
          Last date of Full Paper Submission: 28.02.2025<br />
          Acceptance Notification: 13.03.2025<br />
          Camera Ready Paper Submission: 14.03.2025<br />
          Registration Date: 17.03.2025<br />
          Conference Date: 19-20 Mar 2025
        </Section>

        <Section title="Conference Brochure">
          • <a href="/RTREAET-2025.pdf" target="_blank">RTREAET 2025 (19-20 March, 2025)</a>
        </Section>

        <Section title="Previous Conferences">
          • <a href="/RTREAET-2023.pdf" target="_blank">RTREAET 2023</a><br />
          • <a href="/RTREAET-2021.pdf" target="_blank">RTREAET 2021</a><br />
          • <a href="/RTREAET-2020.pdf" target="_blank">RTREAET 2020</a>
        </Section>

        <Section title="CONTACT US">
          Mewat Engineering College(Waqf)<br />
          Palla, District Nuh, Mewat<br />
          Haryana-122107<br />
          https://www.mecw.ac.in/<br /><br />

          Dr. Adnan Akhlaq<br />
          Adnanakhlaq87@gmail.com, +91-9897342786<br /><br />

          Dr. Shaheen Khan<br />
          shaheen.khan.2@gmail.com, +91-9588356609<br /><br />

          Dr. Gaurav<br />
          gaurav.citm@gmail.com, +91-8920876988
        </Section>
      </div>

      {/* ✅ Imported Footer */}
      <Footer />
    </div>
  );
};

const Section = ({ title, children }: any) => (
  <div style={sectionStyle}>
    <h3 style={{ color: "#0d47a1" }}>{title}</h3>
    <p>{children}</p>
  </div>
);

/* STYLES */
const containerStyle = {
  maxWidth: "1000px",
  margin: "auto",
  padding: "20px",
};

const titleStyle = {
  textAlign: "center" as const,
  color: "#1a237e",
};

const subtitleStyle = {
  textAlign: "center" as const,
  color: "#3949ab",
};

const pdfLink = {
  margin: "0 10px",
  color: "#d32f2f",
  fontWeight: "bold",
  textDecoration: "none",
};

const sectionStyle = {
  marginBottom: "25px",
  padding: "15px",
  borderRadius: "10px",
  background: "#ffffff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default Conference;