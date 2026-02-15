import './Introduction.css';

const skills = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C', 'Go', 'Haskell', 'Racket', 'Java'] },
  { category: 'Frontend', items: ['React', 'HTML/CSS', 'Three.js', 'GSAP'] },
  { category: 'Backend & Data', items: ['Flask', 'PostgreSQL', 'Docker', 'FHIR', 'DICOM', 'iSyntax', 'OpenJPEG', 'J2K', 'FASTA'] },
  { category: 'AI / ML', items: ['PyTorch', 'NLP', 'Computer Vision', 'LLMs', 'TensorFlow', 'Multivariable Calculus'] },
];

function Introduction() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-bio">
          <h2 className="about-heading">About me</h2>
          <p className="about-text">
            I'm Yael, a developer working at the intersection of healthcare and
            technology. I build full-stack applications, AI pipelines, and data
            tools that help clinicians and researchers do their work better.
          </p>
          <p className="about-text">
            From clinical intake platforms with FHIR integration to surgical
            video analysis and radiology NLP, I like turning messy real-world
            problems into clean, reliable software.
          </p>
        </div>
        <div className="about-skills">
          {skills.map((group) => (
            <div className="skill-group" key={group.category}>
              <h3 className="skill-category">{group.category}</h3>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span className="skill-tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Introduction;
